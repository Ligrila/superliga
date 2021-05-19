import { atom, selector } from "recoil";
import Api from '../api/Api';

const statisticDefault = {
    points: 0,
    mediaHits: 0,
    correctAnswers: 0,
    correctAnswersPercentage: 0,
    wrongAnswers: 0,
    wrongAnswersPercentage: 0,
    triviaHits: 0,
    usedLives: 0,
    ranking: 0,
    rankingPercentage: 0,
}

export const statisticsSelector = selector({
    key: 'StatisticsSelector',
    get: async () => {
        const api = new Api()
        console.log('search api')
        const statistic = {
            ...statisticDefault
        }
        let response = await api.getStatistics();
        if (response && response.success) {
            statistic.points = response.data.points;
            statistic.mediaHits = response.data.mediaHits;
            statistic.correctAnswers = response.data.correctAnswers;
            statistic.wrongAnswers = response.data.wrongAnswers;
            const totalAnswers = response.data.correctAnswers + response.data.wrongAnswers; 
            statistic.triviaHits = response.data.triviaHits;
            statistic.usedLives = response.data.usedLives;
            statistic.ranking = response.data.ranking;
            if (statistic.ranking > 0) {
                statistic.rankingPercentage = Math.max(100 / statistic.ranking, 0);
            }
            if(totalAnswers > 0){
                statistic.correctAnswersPercentage = Math.round((statistic.correctAnswers * 100 ) / totalAnswers);
                statistic.wrongAnswersPercentage = Math.round((statistic.wrongAnswers * 100 ) /  totalAnswers);
            }
        }
        return statistic;
    },
});


export const statisticsAtom = atom({
    key: 'StatisticsAtom',
    default:statisticDefault
});



