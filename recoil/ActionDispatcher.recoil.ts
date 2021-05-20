// import Reflux from 'reflux';

// import {ConnectedUsersStore,ConnectedUsersActions} from './ConnectedUsersStore';

// import {TriviaQuestionActions} from './TriviaQuestion';
// import { UsersStore, UsersActions } from './UserStore';
// import { NextTriviaActions } from './NextTriviaStore';
// import { ConnectionStatusStore } from './ConnectionStatusStore';
// import { StatisticsStore } from './StatisticsStore';
// import { CurrentTriviaStatisticsStore, CurrentTriviaStatisticsActions } from './CurrentTriviaStatisticsStore';
// import { ChatActions, ChatStore } from './ChatStore';
// import { useNavigationState } from '@react-navigation/native';
import Api from '../api/Api';
// To access to recoil outside components
import { setNavigation } from './Navigation.recoil';
import NavigationUtility from '../utilities/Navigation/Navigation.utility';
// import OfflineNotice from '../components/OfflineNotice';
import NumberUtility from '../utilities/Number/Number.utility';
import { setConnectedUser } from './ConnectedUsers.recoil';
import UserUtility from '../utilities/User/User.utility';
import { setAuthUser, setAuthUserWithoutLives } from './Auth.recoil';
import { getTriviaQuestion, setTriviaQuestion, setTriviaQuestionNotfification } from './TriviaQuestion.recoil';
import TriviaQuestionUtility from '../utilities/Trivia/TriviaQuestion.utility';
import TriviaUtility from '../utilities/Trivia/Trivia.utility';
import { GAME_ROUTES_STRING } from '../new-navigation/GameNavigator';
import { setCurrentTrivia } from './CurrentTrivia.recoil';

import { getChatMessages, setChatMessages } from './Chat.recoil';


// First
// If Trivia active redirect to GamePlay


export default class ActionDispatcherRecoil {
    private api = new Api();
    private timeoutTriviaQuestion: any = null
    constructor() {
    }
    // On Connect Action to Socket.io
    async onConnect(isReconnected = false) {
        try {
            // If socket is reconnected get route and check if have current trivia
            if (isReconnected) {
                const routeObject = await NavigationUtility.getActiveRoute();
                if (routeObject) {
                    const routeName = routeObject.name
                    const gameRoutes = GAME_ROUTES_STRING;
                    let included = false;
                    for (const string of gameRoutes) {
                        included = routeName.includes(string);
                        if (included) {
                            break;
                        }
                    }
                    // console.log('routeName', routeName)
                    // call trivia actions
                    if (included) return
                    // Get Current trivia
                    let ct = await this.api.getCurrentTrivia();
                    if (ct && ct.success) {
                        const newTrivia = {
                            hasData: true,
                            data: ct.data
                        }
                        await setCurrentTrivia({ ...newTrivia });

                    }
                    // let gameInProgress = ct.success;
                    // if (gameInProgress) {
                    //     // promiseSetRecoil(navigationAtom, 'GamePlay');
                    //     setNavigation('GamePlay')
                    // }
                }
            }
        } catch (e) {
            console.log("error onConnect", e)
        }

    }
    async onUpdateConnectedUsers(message) {
        // console.log('onUpdateConnectedUsers', JSON.stringify(message.payload))
        const number = NumberUtility.formatNumberConnected(message.payload);
        // ConnectedUsersActions.updateConnectedUsers(message.payload)
        await setConnectedUser(number);
    }
    async onNewQuestion(message) {
        const newQuestion = TriviaQuestionUtility.onAddNew(message.payload);
        // Timeout
        if (this.timeoutTriviaQuestion) {
            clearTimeout(this.timeoutTriviaQuestion);
        }
        this.timeoutTriviaQuestion = setTimeout(async () => {
            const current = await getTriviaQuestion();
            const newTriviaQuestion = {
                ...current,
                timedOut: true
            }
            await setTriviaQuestion(newTriviaQuestion);
        }, newQuestion.currentTimeout);
        // Set New Question
        await setTriviaQuestion(newQuestion);
        await setTriviaQuestionNotfification(newQuestion);
    }
    async onStartTrivia(message) {
        await TriviaUtility.onStartTrivia(message.payload)
    }
    async onShowBanner(message) {
        await TriviaUtility.onShowBanner(message.payload)

    }
    async onStartHalfTime(message) {
        // NextTriviaActions.startHalfTime(message.payload);
        await TriviaUtility.onStartHalfTime(message.payload)
    }
    async onStartHalfTimePlay(message) {
        // NextTriviaActions.startHalfTimePlay(message.payload);
        await TriviaUtility.onStartHalfTimePlay(message.payload)
    }
    async onFinishHalfTime(message) {
        // NextTriviaActions.finishHalfTime(message.payload);
        await TriviaUtility.onFinishHalfTime(message.payload)
    }
    async onStartExtraPlay(message) {
        // NextTriviaActions.startExtraPlay(message.payload);   
        await TriviaUtility.onStartExtraPlay(message.payload)
    }
    async onFinishGame(message) {
        // NextTriviaActions.finishGame(message.payload);
        await TriviaUtility.onFinishGame(message.payload)
    }

    async onFinishTrivia(message) {
        await TriviaUtility.onFinishTrivia(message.payload)
    }

    async onFinishedQuestion(message) {
        const answeredFinished = await TriviaQuestionUtility.onFinishedQuestion(message.payload);

        // Update User Data (cannot call this.function)
        const authUpdated = await UserUtility.getUpdateUserInformation();
        await setAuthUser({ ...authUpdated });
        // Secont for lives
        if (answeredFinished) {
            await setTriviaQuestion(answeredFinished);
        }
        // Check if User not have lives and update recoil 
        if (authUpdated.lives > 0) {
            await setAuthUserWithoutLives(authUpdated);
        }
    }

    async onUpdateUserData(message) {
        // UsersActions.update();
        const authUpdated = await UserUtility.getUpdateUserInformation();
        // ConnectedUsersActions.updateConnectedUsers(message.payload)
        await setAuthUser({ ...authUpdated });
    }


    // chat
    async onChatBroadcast(message) {
        const messages = await getChatMessages();
        const copyMessages = [...messages];
        // console.log('messages', messages, message)
        copyMessages.push(message);
        await setChatMessages([...copyMessages]);
    }
    onChatConnect(socket) {
        console.log('connected to action dispatcher socket');
        // setSocketAtom(socket);
    }
    onChatDisconnect() {
        console.log("disconnected")
        setChatMessages([])
    }
    

    dispatch(message) {
        switch (message.eventName) {
            case 'updateConnectedUsers':
                // ConnectedUsersActions.updateConnectedUsers(message.payload)
                break;
            case 'updateUserData':
                console.log('updateUserData');
                // UsersActions.update();
                break;
            case 'newQuestion':
                // TriviaQuestionActions.add(message.payload);
                break;
            case 'finishHalfTime':
                // NextTriviaActions.finishHalfTime(message.payload);
                break;
            case 'startHalfTimePlay':
                // NextTriviaActions.startHalfTimePlay(message.payload);
                break;
            case 'startExtraPlay':
                // NextTriviaActions.startExtraPlay(message.payload);
                break;
            case 'showBanner':
                // NextTriviaActions.showBanner(message.payload);
                break;
            case 'startHalfTime':
                // NextTriviaActions.startHalfTime(message.payload);
                break;
            case 'finishGame':
                // NextTriviaActions.finishGame(message.payload);
                break;
            case 'finishTrivia':
                // NextTriviaActions.finish(message.payload);
                // NextTriviaActions.get();
                break;
            case 'startTrivia':
                // NextTriviaActions.current(message.payload);
                // CurrentTriviaStatisticsActions.reset();
                break;
            case 'finishedQuestion':
                // TriviaQuestionActions.finishedQuestion(message.payload);
                // UsersActions.update();
                break;
            default:
                console.warn("Unknow action name : " + message.eventName);
                break;
        }
    }
}