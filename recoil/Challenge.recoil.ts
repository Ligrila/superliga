import { atom, selector } from "recoil";
import Api from '../api/Api';


const defaultValue = {
    hasData: false,
    data: undefined
}

export const challengesSelector = selector({
    key: 'ChallengesSelector',
    get: async (
        // If need another atom
        { get }
    ) => {
        get(challengesAtom)
        const api = new Api()
        let response = await api.challengesList();
        console.log('response', response)
        const challengeResponse = {
            hasData: false,
            data: []
        }

        if (response && response.success) {
            challengeResponse.data = response.data;
        }
        
        challengeResponse.hasData  = true;

        return challengeResponse;
    },
});

export const challengesAtom = atom<any>({
    key: 'ChallengesAtom',
    default: defaultValue
});