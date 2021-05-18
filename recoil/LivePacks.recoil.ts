import { atom, selector } from "recoil";
import Api from '../api/Api';


const defaultValue = {
    hasData: false,
    data: []
}

export const livesPackSelector = selector({
    key: 'CalendarSelector',
    get: async (
        // If need another atom
        { get }
    ) => {
        get(livePacksAtom)
        const api = new Api();
        let response = await api.getLivePacks()

        return {
            hasData: true,
            data: response.data
        }
    }
});

export const livePacksAtom = atom<any>({
    key: 'LivePacksAtom',
    default: defaultValue
});

