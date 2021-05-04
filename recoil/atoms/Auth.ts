import {
    atom
} from 'recoil';
// User logged in
export const user = atom({
    key: 'Auth.User', // unique ID (with respect to other atoms/selectors)
    default: null, // default value (aka initial value)
});

