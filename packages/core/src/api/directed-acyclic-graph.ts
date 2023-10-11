import type { StoreID } from "../types/id";

const adjacencyList: StoreID[][] = [];
const deepAdjacencyList: StoreID[][] = new Array(50);

export const createAdjacency = (id: StoreID) =>
  (adjacencyList[id] = deepAdjacencyList[id] = []);

const isNotUndefined = (v?: StoreID): v is StoreID => v !== undefined;

export const addAdjacency = (primaryId: StoreID, dependsOn: StoreID[]) => {
  for (const storeId of dependsOn) {
    adjacencyList[storeId].push(primaryId);
  }

  const listLength = primaryId + 1;
  for (let id = adjacencyList.length - 1; id >= 0; id--) {
    const list = new Array<StoreID | undefined>(listLength);

    const deepAdjacency = (adjacencyId: StoreID): void => {
      if (!(adjacencyId in list)) {
        list[adjacencyId] = adjacencyId;
        for (const item of adjacencyList[adjacencyId]) {
          deepAdjacency(item);
        }
      }
    };
    deepAdjacency(id);

    list[id] = undefined;
    deepAdjacencyList[id] = list.filter(isNotUndefined);
  }
};

export const getDeepAdjacencyList = (id: StoreID) => deepAdjacencyList[id];
