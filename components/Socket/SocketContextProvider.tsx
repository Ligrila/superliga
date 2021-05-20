import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { authUserAtom } from '../../recoil/Auth.recoil';
import AuthUtility from '../../utilities/Auth/Auth.utility';
import SocketClient from "../../modules/SocketClient";


export const SocketContext = createContext(null)

const SocketContextProvider = (props) => {
    const [socket, setSocket] = useState<any>(null)
    const authUser = useRecoilValue(authUserAtom);
    const [authUserId, setAuthUserId] = useState<string | null>(null);
    
    const closeSocket = useCallback(() => {
        console.log("App::closeSocket")
        if (!socket || !socket.client) {
            return;
        }

        if (typeof (socket.client.close) == 'function') {
            socket.client.close();
        }
        setSocket(null)
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

        let _socket = new SocketClient(token, user);
        setSocket(_socket);
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
        } else {
            setAuthUserId(null);
            closeSocket()
        }
    }, [authUser, closeSocket])
    // When Auth User change
    useEffect(() => {
        fetchData();
    }, [authUser])
    return (
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    )
}

export default SocketContextProvider
