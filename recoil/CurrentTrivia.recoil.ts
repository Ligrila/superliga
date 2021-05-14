import { atom, selector } from "recoil";
import Api from '../api/Api';
import { getRecoilExternalLoadable, setRecoilExternalState } from "../components/Recoil/RecoilExternalStatePortal";
import DateTimeHelper from "../helpers/DateTimeHelper";

const defaultValue = {
    hasData: false,
    data: undefined
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





export const setCurrentTrivia = async (value) => {
    await setRecoilExternalState(currentTriviaAtom, value)

}

export const getCurrentTrivia = async () => {
    const value = await getRecoilExternalLoadable(currentTriviaAtom)
    return value
}
