import AsyncStorage from '@react-native-async-storage/async-storage';

export default class AuthUtility {


    static async getToken() {
        const tokenExpire = await AsyncStorage.getItem('tokenExpire');
        const token = await AsyncStorage.getItem('token');
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        const user = await AsyncStorage.getItem('user');
        return { tokenExpire, token, refreshToken, user };
    }
    static async setToken(data) {
        await AsyncStorage.setItem('tokenExpire', `${data.expire}`);
        await AsyncStorage.setItem('token', data.access_token);
        await AsyncStorage.setItem('refreshToken', data.refresh_token);
        await AsyncStorage.setItem('user', JSON.stringify(data.user));
    }
    static async removeToken() {
        await AsyncStorage.removeItem('refreshToken');
        await AsyncStorage.removeItem('tokenExpire');
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
    }
    static async checkIfLoggedIn() {
        const token = await AsyncStorage.getItem('token');
        const tokenExpired = await AsyncStorage.getItem('tokenExpire');
        if (token && tokenExpired) {
            const tokenExpireNumber = tokenExpired || 0;
            const timestamp = new Date().getTime();
            const notExpired = tokenExpireNumber > timestamp;            
            return notExpired ? true : false;
        }
        return false;


    }
}