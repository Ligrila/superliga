import { atom } from "recoil";
import { getRecoilExternalLoadable, setRecoilExternalState } from "../components/Recoil/RecoilExternalStatePortal";

export const chatMessagesAtom = atom<any>({
    key: 'ChatMesagesAtom',
    default: []
});



// Chat messages
export const setChatMessages = async (value) => {
    await setRecoilExternalState(chatMessagesAtom, value)

}

export const getChatMessages = async () => {
    const value = await getRecoilExternalLoadable(chatMessagesAtom).contents
    return value
}
// No