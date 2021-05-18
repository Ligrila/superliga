import React, { useCallback, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { currentTriviaAtom } from '../../recoil/CurrentTrivia.recoil';
import { navigationAtomState } from '../../recoil/Navigation.recoil';
import NavigationUtility from '../../utilities/Navigation/Navigation.utility';


const WatchCurrentTrivia = () => {
    // Recoil
    const navigationState = useRecoilValue(navigationAtomState)
    const currentTrivia = useRecoilValue(currentTriviaAtom)
    // Ignore Routes  (Game Stack)
    const ignoreRoutes = [
            'StartFirstTime',
            'GamePlay',
            'HalfTime',
            'GameHalfTimePlay',
            'HalfTimeStart',
            'GameExtraPlay',
            'GameEnd',
            'Banner',
            'GameLoading'
    ];
    const processNavigation = useCallback(async () => {
        if (currentTrivia && currentTrivia.hasData) {
            const route: string = await NavigationUtility.getActiveRouteState(navigationState).name;
            let included = false;
            for(const string of ignoreRoutes){
                console.log(string, route, route.includes(string));
                included = route.includes(string);
                if(included){
                    break;
                }
            }            
            console.log('included', included)
            if (!included) {
                console.log('redirecciono a Jugar!');
            }
        }
    }, [navigationState, currentTrivia])
    useEffect(() => {
        processNavigation();
    }, [navigationState, currentTrivia])

    return null;

}

export default WatchCurrentTrivia;