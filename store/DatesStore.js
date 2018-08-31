import {AsyncStorage} from 'react-native';
import Reflux from 'reflux';
import CacheStore from './CacheStore'
import Api from '../api/Api';
import DateTimeHelper from '../helpers/DateTimeHelper';

export const DatesActions = Reflux.createActions(['calendar','reset']);



export class DatesStore extends CacheStore
{
    
    api = new Api;

    constructor()
    {
        super('Store.Dates');
        this.listenables = DatesActions;
    }


    getInititalState(){
        return {
            Dates:{
                hasData: false,
                data: []
            }
        };
    }

    onReset(){
        this.setState(this.getInititalState());
    }

 
    async calendar(){
        let response = await this.api.calendar();
        const state = {
            Dates:{
                hasData: true,
                data: response.data
            }
        }
        this.setStateCache(state)
    }
}

