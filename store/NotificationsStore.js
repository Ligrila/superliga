import Reflux from 'reflux';
import CacheStore from './CacheStore'
import Api from '../api/Api';

export const NotificationsActions = Reflux.createActions(['list','notificationsLoaded','reset']);



export class NotificationsStore extends CacheStore
{
    
    api = new Api;

    constructor()
    {
        super('Store.Notifications');
        this.listenables = NotificationsActions;
    }

    

    getInititalState(){
        return {
            Notifications:{
                hasData: false,
                data: []
            }
        };
    }

    onReset(){
        this.setState(this.getInititalState());
    }

    notificationsLoaded(){

    }

 
    async list(q=null){
        let response = await this.api.notificationsList();
        const state = {
            Notifications:{
                hasData: true,
                data: response.data
            }
        }
        this.setStateCache(state)
        NotificationsActions.notificationsLoaded()
    }
}

