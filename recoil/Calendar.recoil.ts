import { atom, selector } from "recoil";
import Api from '../api/Api';
import DateTimeHelper from "../helpers/DateTimeHelper";

export const calendarSelector = selector({
    key: 'CalendarSelector',
    get: async (
        // If need another atom
        // { get }
    ) => {
        // Response
        const calendar = {
            hasData: true,
            data: undefined
        }
        // Api
        const api = new Api();
        let response = await api.calendar();
        let data = [] as any;
        if (response.success) {
            for (var i = 0; i < response.data.length; i++) {
                let hasTrivia = false;
                for (var j = 0; j < response.data[i].trivias.length; j++) {
                    hasTrivia = true;
                    response.data[i].trivias[j].start_datetime_local = await DateTimeHelper.datetime(response.data[i].trivias[j].start_datetime);
                    response.data[i].trivias[j].start_datetime_local_string = await DateTimeHelper.format(response.data[i].trivias[j].start_datetime);
                }
                if (hasTrivia) {
                    data.push(response.data[i]);
                }
            }
        }
        calendar.data = data;
        calendar.hasData = true;

        return calendar;
    }
});

export const calendarAtom = atom<any>({
    key: 'CalendarAtom',
    default: null
});

