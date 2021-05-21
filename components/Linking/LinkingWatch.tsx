import React, { useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';
import AuthUtility from '../../utilities/Auth/Auth.utility';
import * as RootNavigation from '../../new-navigation/RootNavigation'

const LinkingWatch = () => {

    const urlCallback = async (event) => {
        const isLogin = await AuthUtility.checkIfLoggedIn();
        let urlToParse = event.url
        if (
            urlToParse.startsWith('www.jugadasuperliga.com') ||
            urlToParse.startsWith('jugadasuperliga.com') ||
            urlToParse.startsWith('exps://www.jugadasuperliga.com') ||
            urlToParse.startsWith('exps://jugadasuperliga.com') ||
            urlToParse.startsWith('https://www.jugadasuperliga.com') ||
            urlToParse.startsWith('https://jugadasuperliga.com') ||
            urlToParse.startsWith('http://www.jugadasuperliga.com') ||
            urlToParse.startsWith('http://jugadasuperliga.com')
        ) {
            urlToParse = urlToParse.replace('exps://www.jugadasuperliga.com/', 'jugadasuperliga://')
            urlToParse = urlToParse.replace('exps://jugadasuperliga.com/', 'jugadasuperliga://')
            urlToParse = urlToParse.replace('https://www.jugadasuperliga.com/', 'jugadasuperliga://')
            urlToParse = urlToParse.replace('https://jugadasuperliga.com/', 'jugadasuperliga://')
            urlToParse = urlToParse.replace('http://www.jugadasuperliga.com/', 'jugadasuperliga://')
            urlToParse = urlToParse.replace('http://jugadasuperliga.com/', 'jugadasuperliga://')
            urlToParse = urlToParse.replace('jugadasuperliga.com/', 'jugadasuperliga://')
            urlToParse = urlToParse.replace('www.jugadasuperliga.com/', 'jugadasuperliga://')
        }
        //Alert.alert("URL TO PARSE: " + urlToParse)
        const { path } = Linking.parse(urlToParse);

        if (path) {
            const parts = path.split('/')
            //console.log({parts})
            if (parts[0] == 'championships' && parts[1]) {
                const championshipId = parts[1]
                if (isLogin) {
                    RootNavigation
                    .navigate('ChampionshipStack', {
                        screen: 'ChampionshipSubscribe',
                        params: {championship: { id: championshipId } }
                      });
                    // .navigate('ChampionshipSubscribe', { championship: { id: championshipId } })
                } else {
                    AsyncStorage.setItem('afterLoginChampionshipSubscribe', championshipId);
                    AsyncStorage.removeItem('afterLoginChampionshipSubscribeMessage');
                    // LoginScreenActions.checkForMessages()
                }
            }
        }
    }
    const proccesFirstLinking = useCallback(async () => {
        const initialUrl = await Linking.getInitialURL();
        if (initialUrl) {
            urlCallback({ url: initialUrl });
        }

    }, [])
    useEffect(() => {
        proccesFirstLinking();
        Linking.addEventListener('url', urlCallback)
        return () => {
            Linking.removeEventListener('url', () => { })
        }
    }, [])

    return null;

}

export default LinkingWatch;