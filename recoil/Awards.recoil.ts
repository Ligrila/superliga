import { atom, selector } from "recoil";
import Api from '../api/Api';

export const awardsSelector = selector({
    key: 'AwardsSelector',
    get: async (
        // If need another atom
         { get }
    ) => {
        // Force Update
        get(awardsAtom)
        const api = new Api();
        let response = await api.getAwards();
        let awards = [] as any
        if (response.success) {
            awards = [
                ...response.data
            ]
        }
        return awards;
    }
});


export const awardsAtom = atom({
    key: 'AwardsAtom',
    default: null
});
