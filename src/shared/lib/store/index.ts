import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

export type UpdateFieldPayload<T> = {
  field: keyof T,
  value: T[keyof T]
}

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;