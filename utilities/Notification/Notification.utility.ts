import { CHALLELNGES_ROUTES_STRING } from "../../new-navigation/ChallengeNavigator";
import { CHAMPIONSHIP_ROUTES_STRING } from "../../new-navigation/ChampionshipNavigator";
import { GAME_ROUTES_STRING } from "../../new-navigation/GameNavigator";

import * as RootNavigation from '../../new-navigation/RootNavigation'



export default class NotificationUtility {

    static navigateTo(route, params = null) {
        if (route) {
            // Game
            if (GAME_ROUTES_STRING.includes(route)) {
                RootNavigation.navigate('Main', {
                    screen: 'GamePlayStack',
                    params: {
                        screen: route,
                        params
                    }
                });
            }
            // Championship
            else if (CHAMPIONSHIP_ROUTES_STRING.includes(route)) {
                RootNavigation.navigate('Main', {
                    screen: 'ChampionshipTab',
                    params: {
                        screen: 'ChampionshipStack',
                        params: {
                            screen: route,
                            params
                        }
                    }
                });
            }
            // Challenge
            else if (CHALLELNGES_ROUTES_STRING.includes(route)) {

                RootNavigation.navigate('Main', {
                    screen: 'ChampionshipTab',
                    params: {
                        screen: 'ChallengeStack',
                        params: {
                            screen: route,
                            params
                        }
                    }
                });
            }
            else {
                RootNavigation.navigate(
                    route,
                    params
                );
            }


        }
    }



}