import { atom } from "recoil";
import { getRecoilExternalLoadable, setRecoilExternalState } from "../components/Recoil/RecoilExternalStatePortal";

export const defaultValue = {
    hasQuestion: false,
    answered: false,
    answeredOption: null,
    answeredServerResponse: null,
    hasResult: false,
    correctOption: null,
    currentQuestion: {},
    currentTimeout: 0,
    currentTimestamp: 0,
    timedOut: false,
    serverSuccess: true,
    win: false,
}

export const triviaQuestionAtom = atom<any>({
    key: 'TriviaQuestionAtom',
    default: defaultValue
});




export const setTriviaQuestion = async (value) => {
    await setRecoilExternalState(triviaQuestionAtom, value)

}

export const getTriviaQuestion = async () => {
    const value = await getRecoilExternalLoadable(triviaQuestionAtom).contents
    return value
}

