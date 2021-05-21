import { atom, selector, selectorFamily } from "recoil";
import Api from '../api/Api';

const defaultValue = {
    hasData: false,
    data: undefined
}

export const championshipSelector = selector({
    key: 'ChampionshipSelector',
    get: async ({get}) => {
        // Force Update
        get(championshipAtom)
        const api = new Api()
        const championshipsResp = {
            hasData : false,
            data: undefined
         }
        let response = await api.championshipList();
        championshipsResp.hasData = response.success;
        championshipsResp.data = response.data;
        return championshipsResp;
    },
});


export const championshipAtom = atom<any>({
    key: 'ChampionshipAtom',
    default: null
});

export const championshipUsersAtom = atom<any>({
    key: 'championshipUsersAtom',
    default: null
});

export const championshipViewAtom = atom<any>({
    key: 'ChampionshipViewAtom',
    default: null
});
