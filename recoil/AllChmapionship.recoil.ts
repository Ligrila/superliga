import { selectorFamily } from "recoil";
import Api from '../api/Api';

const defaultData = {
    hasData: false,
    data: undefined
}

export const allChampionshipRankingSelector = selectorFamily({
    key: 'RankingSelector',
    get: dateID => async ({ get }) => {
        const api = new Api();
        const dateString = dateID?.toString();
        let response: any = null;
        if (dateString === 'general') {
            response = await api.allChampionshipList(null, true)
        } else {
            response = await api.allChampionshipListForDate(dateString);
        }
        const ranking: any = { ...defaultData }
        if (response) {
            // console.log('response', response)
            ranking.hasData = response.success;
            ranking.data = response.data;
        }

        return ranking;

    },
});


