import { atom, selector, selectorFamily } from "recoil";
import Api from '../api/Api';

const defaultValue = {
    hasData: 0,
    data: undefined
}

export const championshipSelector = selector({
    key: 'ChampionshipSelector',
    get: async () => {
        const api = new Api()
        const dates = { ...defaultValue }
        let response = await api.championshipList();
        dates.hasData = response.success;
        dates.data = response.data;
        return dates;
    },
});


export const championshipAtom = atom<any>({
    key: 'ChampionshipAtom',
    default: null
});
