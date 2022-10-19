import { Bank, PlatformAccess, PlatformParams } from '@appjusto/types';
import { documentsAs } from '../../common/core';
import {
  getBanksCollection,
  getPlatformAccessDoc,
  getPlatformParamsDoc,
} from '../../common/core/refs/firestore';

export default class PlatformApi {
  async fetchPlatformParams() {
    const snapshot = await getPlatformParamsDoc().get();
    return snapshot.data() as PlatformParams;
  }

  async fetchPlatformAccess() {
    const snapshot = await getPlatformAccessDoc().get();
    return snapshot.data() as PlatformAccess;
  }

  async fetchBanks() {
    const snapshot = await getBanksCollection().orderBy('order', 'asc').get();
    return documentsAs<Bank>(snapshot.docs);
  }
}
