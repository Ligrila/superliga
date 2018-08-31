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
            Dates:[]
        };
    }

    onReset(){
        this.setState(this.getInititalState());
    }

    /***
     * @param question_id question id
     * @param option integer, the number of option
    */
    async calendar(){
        let response = await this.api.calendar();
        const state = {
            Dates:[
                ...response.data
            ]
        }
        this.setStateCache('Store.Dates',state)
    }
}

