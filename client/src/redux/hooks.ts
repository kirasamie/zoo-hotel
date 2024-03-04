import type { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState } from './store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DispatchFunc = () => ThunkDispatch<RootState, any, AnyAction>;

export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
