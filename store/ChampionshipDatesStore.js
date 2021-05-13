import AsyncStorage from "@react-native-async-storage/async-storage";
;
import Reflux from 'reflux';
import CacheStore from './CacheStore'
import Api from '../api/Api';

export const ChampionshipDatesActions = Reflux.createActions(['index','reset']);



export class ChampionshipDatesStore extends CacheStore
{
    
    api = new Api;

    constructor()
    {
        super('Store.ChampionshipDates');
        this.listenables = ChampionshipDatesActions;
    }


    getInititalState(){
        return {
            ChampionshipDates:{
                hasData: false,
                data: []
            }
        };
    }

    onReset(){
        this.setState(this.getInititalState());
    }

 
    async index(){
        let response = await this.api.GET('/championship-dates/index?recent');
  
        const state = {
            ChampionshipDates:{
                hasData: response.success,
                data: response.data
            }
        }
        this.setStateCache(state)
    }
}

