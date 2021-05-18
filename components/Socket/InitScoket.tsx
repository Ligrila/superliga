import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { authUserAtom } from '../../recoil/Auth.recoil';
import AuthUtility from '../../utilities/Auth/Auth.utility';
import SocketClient from "../../modules/SocketClient";

const InitSocket = () => {
    const authUser = useRecoilValue(authUserAtom);
    const [authUserId, setAuthUserId] = useState<string | null>(null);
    // Socket
    let socket: any = null;
    const closeSocket = useCallback(() => {
        console.log("App::closeSocket")
        if (!socket || !socket.client) {
            return;
        }

        if (typeof (socket.client.close) == 'function') {
            socket.client.close();
        }

        socket = null;
    }, []);
    const initSocket = useCallback(async () => {
        const { token, user: userLocalStorage } = await AuthUtility.getToken();
        // const token = await AsyncStorage.getItem('token');
        if (socket) {
            closeSocket();
        }
        if (!token) {
            console.log("No token")
            return;
        }
        const user = JSON.parse(userLocalStorage || '');

        socket = new SocketClient(token, user);
    }, [closeSocket])

    const initNetwork = useCallback(() => {
        console.log('initNetwork: initScoket')
        initSocket();
    }, [initSocket]);
    useEffect(() => {
        if (authUserId) {
            initNetwork();
        }
    }, [authUserId])

    const fetchData = useCallback(() => {
        if (authUser && authUser.id) {
            setAuthUserId(authUser.id);
        }else{
            setAuthUserId(null);
            closeSocket()
        }
    }, [authUser, closeSocket])
    useEffect(() => {
        fetchData();
        // return () => closeSocket()
    }, [authUser])

    return null;
}


export default InitSocket;