import { Bank, PlatformAccess, PlatformParams } from '@appjusto/types';
import { getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { documentsAs } from '../../common/core';
import {
  getBanksCollection,
  getPlatformAccessDoc,
  getPlatformParamsDoc,
} from '../../common/core/refs/firestore';

export default class PlatformApi {
  async fetchPlatformParams() {
    const snapshot = await getDoc(getPlatformParamsDoc());
    return snapshot.data() as PlatformParams;
  }

  async fetchPlatformAccess() {
    const snapshot = await getDoc(getPlatformAccessDoc());
    return snapshot.data() as PlatformAccess;
  }

  async fetchBanks() {
    const querySnapshot = await getDocs(query(getBanksCollection(), orderBy('order', 'asc')));
    return documentsAs<Bank>(querySnapshot.docs);
  }
}
