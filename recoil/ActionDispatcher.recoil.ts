// import Reflux from 'reflux';

// import {ConnectedUsersStore,ConnectedUsersActions} from './ConnectedUsersStore';

// import {TriviaQuestionActions} from './TriviaQuestion';
// import { UsersStore, UsersActions } from './UserStore';
// import { NextTriviaActions } from './NextTriviaStore';
// import { ConnectionStatusStore } from './ConnectionStatusStore';
// import { StatisticsStore } from './StatisticsStore';
// import { CurrentTriviaStatisticsStore, CurrentTriviaStatisticsActions } from './CurrentTriviaStatisticsStore';
// import { ChatActions, ChatStore } from './ChatStore';
import { useNavigationState } from '@react-navigation/native';
import Api from '../api/Api';
// To access to recoil outside components
import { getRecoil, setRecoil } from "recoil-nexus";
import { navigationAtom } from './Navigation.recoil';

// First
// If Trivia active redirect to GamePlay


export default class ActionDispatcherRecoil {
    private api = new Api();
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
    getActiveRouteState() {
        const routes = useNavigationState(state => state.routes);
        const currentRoute = routes[routes.length - 1].name;
        return currentRoute;
    }
    async onConnect(isReconnected = false) {
        try {
            if (isReconnected) {
                console.log('is reconected');
                const routeName = this.getActiveRouteState()
                // call trivia actions
                const canHandle = (routeName == 'GamePlay' || routeName == 'Home')
                if (!canHandle) return
                // Get Current trivia
                let ct = await this.api.getCurrentTrivia();
                if (!ct) {
                    ct = { success: false };
                }
                let gameInProgress = ct.success;
                if (gameInProgress) {
                    // this.navigation.navigate('GamePlay')
                    setRecoil(navigationAtom, 'GamePlay');
                }
            }
            console.log('Action dispatcher connected');
        } catch (e) {
            console.log("error onConnect", e)
        }

    }
    onUpdateConnectedUsers(message) {
        // ConnectedUsersActions.updateConnectedUsers(message.payload)
    }
    onNewQuestion(message) {
        // TriviaQuestionActions.add(message.payload);
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
        // NextTriviaActions.finish(message.payload);
        // NextTriviaActions.get();
    }
    onStartTrivia(message) {
        // NextTriviaActions.current(message.payload);
        // CurrentTriviaStatisticsActions.reset();
    }

    onFinishedQuestion(message) {
        // TriviaQuestionActions.finishedQuestion(message.payload);
        // UsersActions.update();
    }

    onUpdateUserData(message) {
        // UsersActions.update();
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