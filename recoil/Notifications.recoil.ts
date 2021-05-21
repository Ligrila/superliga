import { atom, selector } from "recoil";
import Api from '../api/Api';


const defaultValue = {
    hasData: false,
    data: undefined
}

export const notificationsSelector = selector({
    key: 'notificationsAtom',
    get: async (
        // If need another atom
        { get }
    ) => {
        get(notificationsAtom)
        const api = new Api()
        let response = await api.notificationsList();
        const notificationsResponse = {
            hasData: false,
            data: []
        }
        if (response && response.success) {
            notificationsResponse.data = response.data;
        }
        
        notificationsResponse.hasData  = true;

        return notificationsResponse;
    },
});

export const notificationsAtom = atom<any>({
    key: 'NotificationsAtom',
    default: defaultValue
});