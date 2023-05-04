import type { StoreID } from "../interfaces/id";
import type { AnyStore, InnerStore, ReadOnlyStore } from "../interfaces/store";

let addActionInfo = false;
const setAddActionInfo = (value: boolean) => (addActionInfo = value);

const stores: Record<string, AnyStore> = {};
const add = <SomeStore extends ReadOnlyStore<any> | InnerStore<any>>(
  store: SomeStore
): SomeStore => (stores[store.id()] = store) as SomeStore;
const storeById = (storeID: StoreID): AnyStore | undefined => stores[storeID];
const storeList = () => Object.keys(stores).map((key) => stores[key]);

export const StoreInnerAPI = { add, addActionInfo };
export const StoreAPI = {
  storeById,
  storeList,
  setAddActionInfo,
};
