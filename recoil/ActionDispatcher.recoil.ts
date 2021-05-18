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
import { navigationAtom, navigationAtomState, setNavigation } from './Navigation.recoil';
import NavigationUtility from '../utilities/Navigation/Navigation.utility';
import OfflineNotice from '../components/OfflineNotice';
import NumberUtility from '../utilities/Number/Number.utility';
import { connectedUserAtom, setConnectedUser } from './ConnectedUsers.recoil';
import UserUtility from '../utilities/User/User.utility';
import { authUserAtom, setAuthUser, setAuthUserWithoutLives } from './Auth.recoil';
import { triviaQuestionAtom, getTriviaQuestion, setTriviaQuestion } from './TriviaQuestion.recoil';
import { currentTriviaAtom, setCurrentTrivia } from './CurrentTrivia.recoil';
import TriviaQuestionUtility from '../utilities/Trivia/TriviaQuestion.utility';
import TriviaUtility from '../utilities/Trivia/Trivia.utility';

// First
// If Trivia active redirect to GamePlay


export default class ActionDispatcherRecoil {
    private api = new Api();
    private timeoutTriviaQuestion: any = null
    // private navigation = useNavigation();
    constructor() {
        // Reflux.initStore(ConnectedUsersStore); // la necesitamos iniciada
        // Reflux.initStore(UsersStore);
        // Reflux.initStore(ConnectionStatusStore);
        // Reflux.initStore(StatisticsStore);
        // Reflux.initStore(CurrentTriviaStatisticsStore);
        // Reflux.initStore(ChatStore);
        // Reflux.initStore(NavigatorStore);
        // this.api = new Api;
    }


    // On Connect Action to Socket.io
    async onConnect(isReconnected = false) {
        try {
            // If socket is reconnected get route and check if have current trivia
            if (isReconnected) {
                const routeObject = await NavigationUtility.getActiveRoute();
                if (routeObject) {
                    const routeName = routeObject.name
                    // console.log('routeName', routeName)
                    // call trivia actions
                    const canHandle = (routeName == 'GamePlay' || routeName == 'Home' || null)
                    if (!canHandle) return
                    // Get Current trivia
                    let ct = await this.api.getCurrentTrivia();
                    if (!ct) {
                        ct = { success: false };
                    }
                    let gameInProgress = ct.success;
                    if (gameInProgress) {
                        // promiseSetRecoil(navigationAtom, 'GamePlay');
                        setNavigation('GamePlay')
                    }
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

            setTriviaQuestion(newTriviaQuestion);
        }, newQuestion.currentTimeout);
        // Set New Question
        setTriviaQuestion(newQuestion);
    }
    async onStartTrivia(message) {
        await TriviaUtility.onStartTrivia(message.payload)
    }
    async onShowBanner(message) {
        await TriviaUtility.onShowBanner(message.payload)

    }
    async onStartHalfTime(message) {
        // NextTriviaActions.startHalfTime(message.payload);
        await  TriviaUtility.onStartHalfTime(message.payload)
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
        await  TriviaUtility.onFinishGame(message.payload)
    }

    async onFinishTrivia(message) {
        await  TriviaUtility.onFinishTrivia(message.payload)
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
        if(authUpdated.lives > 0){
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
    onChatBroadcast(message) {
        // ChatActions.appendMessage(message)
    }
    onChatConnect(socket) {
        // ChatActions.reset()
        // ChatActions.setSocket(socket)
    }
    onChatDisconnect() {
        console.log("disconnected")
        // ChatActions.reset()
    }

    dispatch(message) {
        console.log('dispatch', message)
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