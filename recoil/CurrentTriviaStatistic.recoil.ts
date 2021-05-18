import { atom, selectorFamily } from "recoil";
import Api from '../api/Api';

const defaultData = {
    hasData: false,
    data: undefined
}

export const currentTriviaStatisticSelector = selectorFamily({
    key: 'CurrentTriviaStatisticSelector',
    get: triviaId => async ({ get }) => {
        get(currentTriviaStatisticAtom)
        const api = new Api();
        console.log('find by id', triviaId)
        let response = await api.getTriviaStatistics(triviaId);
        const defaultResponse = {
            hasData: false,
            data: undefined
        }
        if (response.success) {
            defaultResponse.hasData = response.success;
            defaultResponse.data = response.data;
        }
        return defaultResponse;

    },
});


export const currentTriviaStatisticAtom = atom<any>({
    key: 'CurrentTriviaStatisticAtom',
    default: defaultData
});





