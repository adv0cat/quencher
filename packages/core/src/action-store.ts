import type { ToReadOnly, WritableTag } from "./types/tag";
import type { ReadOnlyStore } from "./types/read-only-store";
import type { Validator } from "./types/validator";
import type { Freeze } from "./types/freeze";
import type { ActionStore } from "./types/action-store";
import { getSetInfo } from "./api/action-api";
import { isStateChanged } from "./utils/is";
import type { Config } from "./types/config";
import { allStates, setNewState } from "./api/new-state-api";

export const actionStore = <State, TagType extends WritableTag>(
  readOnly: ReadOnlyStore<State, ToReadOnly<TagType>>,
  config: Config,
): ActionStore<State, TagType> => {
  const { stateCheck } = config;

  const validators = [] as Validator<State>[];
  const isValid: ActionStore<State, TagType>["isValid"] = (
    oldState,
    newState,
  ) => validators.every((fn) => fn(oldState, newState));

  const { id } = readOnly;
  const set: ActionStore<State, TagType>["set"] = (
    returned,
    info = getSetInfo(),
  ) => {
    const state = allStates[id];
    if (!readOnly.isOff) {
      if (
        (!stateCheck || isStateChanged(state, returned)) &&
        isValid(state, returned as Freeze<State>)
      ) {
        return setNewState(id, returned as Freeze<State>, info);
      }
    }

    return false;
  };

  return {
    ...readOnly,
    tag: ("w" + readOnly.tag.slice(1)) as TagType,
    set,
    isValid,
    readOnly,
    validator: (fn) => {
      validators.push(fn);
      return () => {
        validators.splice(validators.indexOf(fn), 1);
      };
    },
  };
};
