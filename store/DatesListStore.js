import {AsyncStorage} from 'react-native';
import Reflux from 'reflux';
import CacheStore from './CacheStore'
import Api from '../api/Api';

export const DatesListActions = Reflux.createActions(['index','reset']);



export class DatesListStore extends CacheStore
{
    
    api = new Api;

    constructor()
    {
        super('Store.DatesList');
        this.listenables = DatesListActions;
    }


    getInititalState(){
        return {
            DatesList:{
                hasData: false,
                data: []
            }
        };
    }

    onReset(){
        this.setState(this.getInititalState());
    }

 
    async index(){
        let response = await this.api.GET('/dates/index?recent');
  
        const state = {
            DatesList:{
                hasData: response.success,
                data: response.data
            }
        }
        this.setStateCache(state)
    }
}

