import { selector, selectorFamily } from "recoil";
import Api from '../api/Api';

const defaultData = {
    hasData: false,
    data: undefined
}

export const rankingSelector = selectorFamily({
    key: 'RankingSelector',
    get: dateID => async ({ get }) => {

        const dateString = dateID?.toString();
        let endpoint = `/trivia-points/for-date/${dateString}`;

        switch (dateID) {
            case "week":
                endpoint = `/trivia-points/week/`;
                break;
            case "general":
                endpoint = `/trivia-points/general/`;
                break;
            default:
                endpoint = `/trivia-points/for-date/${dateString}`;
                break;
        }
        const api = new Api();
        const ranking: any = { ...defaultData }
        const response = await api.GET(endpoint);
        if (response) {
            // console.log('response', response)
            ranking.hasData = response.success;
            ranking.data = response.data;
        }

        return ranking;

    },
});



