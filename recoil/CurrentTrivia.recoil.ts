import { atom, selector } from "recoil";
import Api from '../api/Api';
import { getRecoilExternalLoadable, setRecoilExternalState } from "../components/Recoil/RecoilExternalStatePortal";
import DateTimeHelper from "../helpers/DateTimeHelper";

const defaultValue = {
    hasData: false,
    data: undefined
}

// Trivia Game Play Status
export enum GamePlayStatus{
    START_GAME = 'START_GAME',
    START_HALF_TIME = 'START_HALF_TIME',
    START_HALF_TIME_PLAY = 'START_HALF_TIME_PLAY',
    FINISH_HALF_TIME = 'FINISH_HALF_TIME',
    START_EXTRA_PLAY = 'START_EXTRA_PLAY',
    FINISH_GAME = 'FINISH_GAME',
    FINISH_TRIVIA = 'FINISH_TRIVIA',
    SHOW_BANNER_GAME = 'SHOW_BANNER_GAME'
}

export const currentTriviaSelector = selector({
    key: 'CurrentTriviaSelector',
    get: async (
        // If need another atom
        { get }
    ) => {
        get(currentTriviaAtom)
        const api = new Api()
        const currentTriviaResponse = await api.getCurrentTrivia();
        if (currentTriviaResponse.success) {
            let currenTrivia = {
                hasData: false,
                data: null
            }
            let data = currentTriviaResponse.data;
            if (data) {
                data.start_datetime_local = await DateTimeHelper.datetime(data.start_datetime);
                data.start_datetime_local_string = await DateTimeHelper.format(data.start_datetime);

            }   
            // console.log('data', data)
            currenTrivia.hasData = true;
            currenTrivia.data = data;
            return currenTrivia;
        }
        return null;
    },
});


export const currentTriviaAtom = atom<any>({
    key: 'CurrentTriviaAtom',
    default: defaultValue
});

export const currentTriviaFinishedAtom = atom<any>({
    key: 'CurrentTriviaFinishedAtom',
    default: defaultValue
});

export const setCurrentTrivia = async (value) => {
    await setRecoilExternalState(currentTriviaAtom, value)

}

export const getCurrentTrivia = async () => {
    const value = await getRecoilExternalLoadable(currentTriviaAtom).contents
    return value
}

export const setCurrentTriviaFinished = async (value) => {
    await setRecoilExternalState(currentTriviaFinishedAtom, value)

}

export const getCurrentTriviaFinished = async () => {
    const value = await getRecoilExternalLoadable(currentTriviaFinishedAtom).contents
    return value
}
