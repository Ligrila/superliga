import { atom } from "recoil";
import { getRecoilExternalLoadable, setRecoilExternalState } from "../components/Recoil/RecoilExternalStatePortal";


export const connectedUserAtom = atom<string>({
    key: 'ConnectedUserAtom',
    default: '0'
});

export const setConnectedUser = async (value) => {
    await setRecoilExternalState(connectedUserAtom, value)

}

export const getConnectedUser = async () => {
    const value = await getRecoilExternalLoadable(connectedUserAtom).contents
    return value
}
