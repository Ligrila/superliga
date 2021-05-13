import AsyncStorage from "@react-native-async-storage/async-storage";
;
import Reflux from 'reflux';
import CacheStore from './CacheStore'
import Api from '../api/Api';
import DateTimeHelper from '../helpers/DateTimeHelper';

export const ContactActions = Reflux.createActions(['topics','reset']);



export class ContactStore extends CacheStore
{
    
    api = new Api;

    constructor()
    {
        super('Store.Contact');
        this.listenables = ContactActions;
    }


    getInititalState(){
        return {
            Contact:{
                hasData: false,
                data: []
            }
        };
    }

    onReset(){
        this.setState(this.getInititalState());
    }

 
    async topics(){
        let response = await this.api.contactTopics();
        
        const state = {
            Contact:{
                hasData: response.success,
                data: response.data
            }
        }
        this.setStateCache(state)
    }
}

