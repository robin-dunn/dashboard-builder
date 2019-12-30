import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CentralStoreService {

  centralStore: {
    [groupId: string] : {
      [storeId: string] : Object
    }
  } = {};

  constructor() { }

  public registerStore(groupId: string, storeId: string, store: Object) {
    if (!this.centralStore.hasOwnProperty(groupId)) {
      this.centralStore[groupId] = {};
    };
    this.centralStore[groupId][storeId] = store;
  }
}
