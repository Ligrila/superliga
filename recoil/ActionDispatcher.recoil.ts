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
import { authUserAtom, setAuthUser } from './Auth.recoil';
import { triviaQuestionAtom, getTriviaQuestion, setTriviaQuestion } from './TriviaQuestion.recoil';
import { currentTriviaAtom, setCurrentTrivia } from './CurrentTrivia.recoil';
import TriviaQuestionUtility from '../utilities/Trivia/TriviaQuestion.utility';

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
        const number = NumberUtility.formatNumberConnected(message.payload);
        // ConnectedUsersActions.updateConnectedUsers(message.payload)
        setConnectedUser(number);
    }
    async onNewQuestion(message) {
        const newQuestion = TriviaQuestionUtility.onAddNew(message.payload);
        // Timeout
        if (this.timeoutTriviaQuestion) {
            clearTimeout(this.timeoutTriviaQuestion);
        }
        this.timeoutTriviaQuestion = setTimeout(async () => {
            
            const current = await getTriviaQuestion();
             // console.log('timeoutTriviaQuestion', current)
            current.timeout = true;
            setTriviaQuestion(current);
        }, newQuestion.currentTimeout);
        // Set New Question
        setTriviaQuestion(newQuestion);
    }

    onFinishHalfTime(message) {
        // NextTriviaActions.finishHalfTime(message.payload);
    }
    onStartHalfTimePlay(message) {
        // NextTriviaActions.startHalfTimePlay(message.payload);
    }
    onStartExtraPlay(message) {
        // NextTriviaActions.startExtraPlay(message.payload);   
    }
    onStartHalfTime(message) {
        // NextTriviaActions.startHalfTime(message.payload);
    }
    onFinishGame(message) {
        // NextTriviaActions.finishGame(message.payload);
    }

    onFinishTrivia(message) {
        setCurrentTrivia({
            hasData: false,
            data: undefined
        })
        // NextTriviaActions.finish(message.payload);
        // NextTriviaActions.get();
    }
    onStartTrivia(message) {
        console.log('onStartTrivia', message.payload)
        setCurrentTrivia({
            hasData: true,
            data: message.payload
        })
        // NextTriviaActions.current(message.payload);
        // CurrentTriviaStatisticsActions.reset();
    }

    async onFinishedQuestion(message) {
        const answeredFinished = await TriviaQuestionUtility.onFinishedQuestion(message.payload);
        if(answeredFinished){
            await setTriviaQuestion(answeredFinished);
        }
        const authUpdated = await UserUtility.getUpdateUserInformation();
        console.log('onUpdateUserData')
        // ConnectedUsersActions.updateConnectedUsers(message.payload)
        setAuthUser({...authUpdated});
        // TriviaQuestionActions.finishedQuestion(message.payload);
        // UsersActions.update();

        // When end i need send one event?
    }

    async onUpdateUserData(message) {
        // UsersActions.update();
        const authUpdated = await UserUtility.getUpdateUserInformation();
        // ConnectedUsersActions.updateConnectedUsers(message.payload)
        setAuthUser({...authUpdated});
    }

    onShowBanner(message) {
        // NextTriviaActions.showBanner(message.payload);
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