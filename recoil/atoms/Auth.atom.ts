import {
    atom
} from 'recoil';
// Auth User
export const authUserAtom = atom<any>({
    key: 'Auth.User',
    default: null
});
// Auth User Lives
export const authUserLivesAtom = atom<number>({
    key: 'Auth.Lives',
    default: 0
});

