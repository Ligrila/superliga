import React, { useCallback, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { currentTriviaAtom } from '../../recoil/CurrentTrivia.recoil';
import { navigationAtomState } from '../../recoil/Navigation.recoil';
import NavigationUtility from '../../utilities/Navigation/Navigation.utility';
import * as RootNavigation from '../../new-navigation/RootNavigation'
import { GAME_ROUTES_STRING } from '../../new-navigation/GameNavigator';


const WatchCurrentTrivia = () => {
    // Recoil
    const navigationState = useRecoilValue(navigationAtomState)
    const currentTrivia = useRecoilValue(currentTriviaAtom)
    // Ignore Routes  (Game Stack)
    const ignoreRoutes = [...GAME_ROUTES_STRING].filter(route => route !== 'GameEnd');
    const processNavigation = useCallback(async () => {
        if (currentTrivia && currentTrivia.hasData && navigationState) {
            const route: string = await NavigationUtility.getActiveRouteState(navigationState).name;
            let included = false;
            for (const string of ignoreRoutes) {
                // console.log(string, route, route.includes(string));
                included = route.includes(string);
                if (included) {
                    break;
                }
            }
            if (!included) {
                const trivia = {
                    type: currentTrivia.data.type,
                    award: currentTrivia.award ? currentTrivia.award : null
                }
                RootNavigation
                    .navigate('GamePlayStack', {
                        screen: 'StartFirstTime',
                        params: { trivia }
                    });
            }
        }
    }, [currentTrivia])
    useEffect(() => {
        processNavigation();
    }, [currentTrivia])

    return null;

}

export default WatchCurrentTrivia;