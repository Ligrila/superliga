import { atom } from "recoil";
import { getRecoilExternalLoadable, setRecoilExternalState } from "../components/Recoil/RecoilExternalStatePortal";

export const navigationAtom = atom<any>({
    key: 'NavigationAtom',
    default: null
});

export const navigationAtomState = atom<any>({
    key: 'NavigationAtomState',
    default: null
});


export const setNavigation = async (value) => {
    await setRecoilExternalState(navigationAtomState, value)

}

export const getNavigation = async () => {
    const value = await getRecoilExternalLoadable(navigationAtomState).contents
    return value
}

