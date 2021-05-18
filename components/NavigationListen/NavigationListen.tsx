
import React, { useCallback, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { navigationAtom } from '../../recoil/Navigation.recoil';
import * as RootNavigation from '../../new-navigation/RootNavigation'

// Use to listen recoil value change when trivia is started and not handle
const NavigationListen = () => {
    const navigationValue = useRecoilValue(navigationAtom);

    const processNavigation = useCallback(() => {
        if (navigationValue) {
            console.log('Navigate aca perro', navigationValue);
            // RootNavigation.navigate(navigationValue, {})
        }
    }, [navigationValue])

    useEffect(() => {
        if (navigationValue) {
            processNavigation()
        }
    }, [navigationValue, processNavigation])

    return null;
}

export default NavigationListen;