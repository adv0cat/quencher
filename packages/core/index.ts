export { store } from "./src/store";
export { adapter } from "./src/adapter";

export { watch } from "./src/fn/watch";
export { action, actions } from "./src/fn/actions";
export { cleaner } from "./src/fn/cleaner";
export { tx } from "./src/utils/tx";

export { mainConfig } from "./src/main-config";

export { batch } from "./src/api/batch-api";
export { StoreAPI } from "./src/api/store-api";
export { ActionAPI } from "./src/api/action-api";

export { isActionStore, isAnyStore } from "./src/utils/is";

export type { AnyStore } from "./src/types/any-store";
export type { ReadOnlyStore } from "./src/types/read-only-store";
export type { ActionStore } from "./src/types/action-store";
export type { Store } from "./src/types/store";
export type { AdapterStore } from "./src/types/adapter";
// TODO: export JoinStore after update join store

export type { Unsubscribe } from "./src/types/core";
export type { Freeze } from "./src/types/freeze";
export type { Off } from "./src/types/off";

export type {
  ToReadOnly,
  // TODO: export JoinTag after update join store
  StoreTag,
  AdapterTag,
  AnyTag,
  ReadableTag,
  WritableTag,
  Tag,
} from "./src/types/tag";
