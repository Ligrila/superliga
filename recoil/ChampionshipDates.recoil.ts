import { atom, selector } from "recoil";
import Api from '../api/Api';

const defaultValue = {
    hasData: false,
    data: undefined
}

export const championshipDatesSelector = selector({
    key: 'ChampionshipDatesSelector',
    get: async ({ get }) => {
        get(championshipDatesAtom);
        const api = new Api()
        const dates = { ...defaultValue }
        let response = await api.GET('/championship-dates/index?recent');
        dates.hasData = response.success;
        dates.data = response.data;
        return dates;
    },
});


export const championshipDatesAtom = atom<any>({
    key: 'ChampionshipDatesAtom',
    default: defaultValue
});


