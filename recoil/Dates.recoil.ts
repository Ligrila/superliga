import { atom, selector } from "recoil";
import Api from '../api/Api';

const defaultValue = {
    hasData: false,
    data: undefined
}

export const datesSelector = selector({
    key: 'DatesSelector',
    get: async ({ get }) => {
         get(datesAtom);
        const api = new Api()
        const dates = {...defaultValue}
        let response = await api.GET('/dates/index?recent');
        dates.hasData = response.success;
        dates.data = response.data;
        return dates;
    },
});


export const datesAtom = atom<any>({
    key: 'DatesAtom',
    default: defaultValue
});


