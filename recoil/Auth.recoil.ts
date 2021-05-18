import {
    atom, selector
} from 'recoil';
import { getRecoilExternalLoadable, setRecoilExternalState } from '../components/Recoil/RecoilExternalStatePortal';
import UserUtility from '../utilities/User/User.utility';

export const authUserSelector = selector({
    key: 'AuthUserSelector',
    get: async (
        // If need another atom
        { get }
    ) => {
        get(authUserAtom)
        const authUserUpdate = await UserUtility.getUpdateUserInformation();
        return authUserUpdate;
    },
});
// Auth User
export const authUserAtom = atom<any>({
    key: 'Auth.User',
    default: null
});
// Auth User Lives
export const authUserLivesAtom = atom<number>({
    key: 'Auth.Lives',
    default: 0
});

export const authUserWithoutLivesAtom = atom<any | null>({
    key: 'Auth.WithouLives',
    default: null
});


export const setAuthUser = async (value) => {
    await setRecoilExternalState(authUserAtom, value)

}

export const getAuthUser = async () => {
    const value = await getRecoilExternalLoadable(authUserAtom).contents
    return value
}
// Without Lives
export const setAuthUserWithoutLives = async (value) => {
    await setRecoilExternalState(authUserWithoutLivesAtom, value)

}

export const getAuthUserWithoutLives = async () => {
    const value = await getRecoilExternalLoadable(authUserWithoutLivesAtom).contents
    return value
}


