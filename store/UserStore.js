import Reflux from 'reflux';
import Api from '../api/Api';
import CacheStore from './CacheStore'
import AsyncStorage from "@react-native-async-storage/async-storage";


export const UsersActions = Reflux.createActions(['me','update','noLife','isLoggedIn','reset']);

export class UsersStore extends CacheStore
{
    api = new Api;
    constructor()
    {
        super('Store.Users');
        this.listenables = UsersActions;
        this.state = this.getInititalState();

    }


    getInititalState(){
        return {user:{},hasInformation:false};
    }

    onNoLife(lives){
        // simplemente lo usamos para listen desde fuera
        // UsersActions.onNoLife.list(fnc)
    }
    reset(){
        this.setState(this.getInititalState());
        UsersActions.isLoggedIn(false);
    }
    onIsLoggedIn(b){
        // simplemente lo usamos para listen desde fuera
        // para las notificaciones push en App.js
        // se actualiza desde AuthLoading screen
        // y desde el loginScreen
        // UsersActions.onUserIsLogin.list(fnc) 
    }
    async onMe(user){
        await this.setStateCache({user: user,hasInformation:true});
        AsyncStorage.setItem('user',JSON.stringify(user))
    }

    async onUpdate(){
        var response = await this.api.getUserInformation();
        if(response.success){
            let data = response.data.user;
            let lives = 0;
            if(data.life){
                lives = data.life.lives;
            }
            if(data.infinite_lives && data.infinite_lives[0]){
                lives = 100000;
            }
            data.lives = lives;
            UsersActions.me(data);
            if(lives<=0){
                UsersActions.noLife(lives);
            }
        }
    }

}

