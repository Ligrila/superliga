import { atom } from "recoil";
import { AppStateStatus } from "react-native";

export const appStateAtom = atom<AppStateStatus>({
    key: 'AppStateAtom',
    default: 'unknown'
});