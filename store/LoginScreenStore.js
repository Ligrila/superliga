import Reflux from 'reflux';
import Api from '../api/Api';
import CacheStore from './CacheStore'

export const LoginScreenActions = Reflux.createActions(['checkForMessages']);

export class LoginScreenStore extends Reflux.Store
{
    api = new Api;
    constructor()
    {
        super();
        this.listenables = LoginScreenActions;
        this.state = this.getInititalState();

    }


    getInititalState(){
        return {
            Login:{
                
            }
        };
    }

    checkForMessages(){
        // simplemente lo usamos para listen desde fuera
        // LoginScreenActions.checkForMessages.list(fnc)
    }


}

