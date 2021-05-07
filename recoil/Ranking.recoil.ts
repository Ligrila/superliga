import { selector, selectorFamily } from "recoil";
import Api from '../api/Api';

const defaultData = {
    hasData: false,
    data: undefined
}

export const rankingSelector = selectorFamily({
    key: 'RankingSelector',
    get: dateID => async () => {

        let endpoint = `/trivia-points/for-date/${dateID?.toString()}`;

        switch (dateID) {
            case "week":
                endpoint = `/trivia-points/week/`;
                break;
            case "general":
                endpoint = `/trivia-points/general/`;
                break;
            default:
                endpoint = `/trivia-points/for-date/${dateID?.toString}`;
                break;
        }
        console.log('endpoint', endpoint);
        const api = new Api();
        const ranking = { ...defaultData }
        const response = await api.GET(endpoint);
        
        response.hasData = response.success;
        ranking.data = response.data;

        return ranking;

    },
});



