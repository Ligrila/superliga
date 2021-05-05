import { selector } from "recoil";
import Api from '../../api/Api';
import DateTimeHelper from "../../helpers/DateTimeHelper";

export const nextTriviaSelector = selector({
    key: 'NextTrivia',
    get: async (
        // If need another atom
        // { get }
    ) => {
        const api = new Api()
        const nextTriviaResponse = await api.getNextTrivia();
        let nextTrivia = {
            hasData: false,
            data: {}
        }
        if (nextTriviaResponse.success) {
            let data = nextTriviaResponse.data;
            if (data) {
                data.start_datetime_local = await DateTimeHelper.datetime(data.start_datetime);
                data.start_datetime_local_string = await DateTimeHelper.format(data.start_datetime);

            }
            nextTrivia.hasData = true;
            nextTrivia.data = data;

        }
        return nextTrivia;
    },
});



