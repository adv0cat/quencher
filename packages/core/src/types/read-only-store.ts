import type { AnyTag, isReadOnly, ReadableTag } from "./tag";
import type { StoreID } from "../utils/id";
import type { Freeze } from "./freeze";
import type { AnyStoreName } from "./name";

export interface ReadOnlyStore<State, TagType extends AnyTag = ReadableTag> {
  id: StoreID;
  get(): Freeze<State>;
  name(): AnyStoreName;
  off(): void;
  isReadOnly: isReadOnly<TagType>;
  tag: TagType;
}
