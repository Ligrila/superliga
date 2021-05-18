import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Notifications from 'expo-notifications';
import registerForPushNotificationsAsync from '../../helpers/RegisterPushNotification';
import { Notification as NotificationInterface } from 'expo-notifications';
import Api from '../../api/Api';
import { useRecoilValue } from 'recoil';
import { triviaQuestionNotificationAtom } from '../../recoil/TriviaQuestion.recoil';
import { appStateAtom } from '../../recoil/AppState.recoil';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});
const RegisterPushNotifications = () => {
    const [, setExpoPushToken] = useState('');
    const [, setNotification] = useState<NotificationInterface | null>(null);
    const notificationListener = useRef<any>();
    const responseListener = useRef<any>();
    // App State
    const appState = useRecoilValue(appStateAtom);
    // Atoms
    const triviaQuestion = useRecoilValue(triviaQuestionNotificationAtom);
    //#region Not. Categories
    const registerCategories = useCallback(() => {
        Notifications.setNotificationCategoryAsync('ChampionshipView',
            [{
                identifier: 'ChampionshipView',
                buttonTitle: 'Ver',
            }]
        )
    }, [])
    //#endregion Not.Categories

    //#region  Trivia Questions
    const pushNotificationTriviaQuestion = useCallback(async () => {

        if (appState.match(/inactive|background/)) {
            console.log('triviaQuestion', triviaQuestion)
            const localNotification = {
                content: {
                    title: triviaQuestion.currentQuestion.question,
                    body: 'Responde ahora la pregunta',
                    sound: true,

                },

                vibrate: true,
                // color: Variables.brandPrimary,
                trigger: null
            };
            await Notifications.scheduleNotificationAsync(localNotification);
        }

    }, [triviaQuestion])
    useEffect(() => {
        if (triviaQuestion) {
            pushNotificationTriviaQuestion()
        }
    }, [triviaQuestion])
    //#endregion  Trivia Questions


    useEffect(() => {
        
         registerCategories();

        registerForPushNotificationsAsync().then(async (token) => {
            console.log('token', token)
            const api = new Api();
            const ret = await api.pushNotificationsRegister(token);
            setExpoPushToken(token)
        });
        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });
        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    return null;
}

export default RegisterPushNotifications;