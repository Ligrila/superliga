import { atom, selector } from "recoil";
import Api from '../api/Api';

const defaultValue = {
    hasData: 0,
    data: undefined
}

export const datesSelector = selector({
    key: 'DatesSelector',
    get: async () => {
        const api = new Api()
        const dates = {...defaultValue}
        let response = await api.GET('/dates/index?recent');
        console.log('response', response)
        dates.hasData = response.success;
        dates.data = response.data;
        return dates;
    },
});


export const datesAtom = atom<any>({
    key: 'DatesAtom',
    default: null
});


