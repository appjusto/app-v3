import { ConsumerProfile, CourierProfile, UserProfile, WithId } from '@appjusto/types';
import {
  doc,
  GeoPoint,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
  Unsubscribe,
} from 'firebase/firestore';
import { hash } from 'geokit';
import { Platform } from 'react-native';
import * as Sentry from 'sentry-expo';
import { getFlavor } from '../../common/config';
import { getNativeAndManifestVersion } from '../../common/config/version';
import { documentAs } from '../../common/core';
import { getInstallationId } from '../../common/security/getInstallationId';
import AuthApi from '../auth/AuthApi';
import { fetchPublicIP } from '../externals/ipify';

export default class ProfileApi {
  constructor(private auth: AuthApi) {}

  private getProfileCollectionName() {
    if (getFlavor() === 'consumer') return 'consumers';
    if (getFlavor() === 'courier') return 'couriers';
    if (getFlavor() === 'business') return 'managers';
    throw new Error('Flavor inválido');
  }

  // private helpers
  private getProfileRef(id: string) {
    return doc(getFirestore(), this.getProfileCollectionName(), id);
  }
  private async createProfile(id: string) {
    await setDoc(
      this.getProfileRef(id),
      {
        situation: 'pending',
        email: this.auth.getEmail() ?? null,
        phone: this.auth.getPhoneNumber(true) ?? null,
        createdOn: serverTimestamp(),
      } as UserProfile,
      { merge: true }
    );
  }

  // firestore
  // observe profile changes
  observeProfile<T extends UserProfile>(
    id: string,
    resultHandler: (profile: WithId<T>) => void
  ): Unsubscribe {
    return onSnapshot(
      this.getProfileRef(id),
      (snapshot) => {
        if (!snapshot.exists()) {
          this.createProfile(id)
            .then(() => {
              const unsub = onSnapshot(
                this.getProfileRef(id),
                { includeMetadataChanges: true },
                (snapshotWithMetadata) => {
                  if (!snapshotWithMetadata.metadata.hasPendingWrites) {
                    resultHandler(documentAs<T>(snapshotWithMetadata));
                    unsub();
                  }
                }
              );
            })
            .catch((e) => {
              console.warn(e);
            });
        } else resultHandler(documentAs<T>(snapshot));
      },
      (error) => {
        console.log('error');
        Sentry.Native.captureException(error);
      }
    );
  }

  // update profile
  async updateProfile(
    id: string,
    changes: Partial<CourierProfile> | Partial<ConsumerProfile>,
    retry = 5
  ) {
    return new Promise<void>((resolve) => {
      void (async () => {
        try {
          console.log('Atualizando o profile...');
          const appVersion = getNativeAndManifestVersion();
          const appInstallationId = await getInstallationId();
          const appIp = getFlavor() === 'consumer' ? await fetchPublicIP() : null;
          const update: Partial<UserProfile> = {
            ...changes,
            appVersion,
            appInstallationId,
            appIp,
            platform: Platform.OS,
            updatedOn: serverTimestamp(),
          };
          await setDoc(this.getProfileRef(id), update, { merge: true });
          resolve();
        } catch (error) {
          if (retry > 0) {
            setTimeout(() => resolve(this.updateProfile(id, changes, retry - 1)), 2000);
          } else {
            console.error(error);
            // Sentry.Native.captureException(error);
            resolve();
          }
        }
      })();
    });
  }

  async updateLocation(id: string, location: GeoPoint) {
    const update: Partial<UserProfile> = {
      coordinates: location,
      g: {
        geopoint: location,
        geohash: hash({
          lat: location.latitude,
          lng: location.longitude,
        }),
      },
      updatedOn: serverTimestamp(),
    };
    console.log(id, update);
    await this.updateProfile(id, update);
  }
}
