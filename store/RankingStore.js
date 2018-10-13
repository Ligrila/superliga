import {AsyncStorage} from 'react-native';
import Reflux from 'reflux';
import CacheStore from './CacheStore'
import Api from '../api/Api';

export const RankingActions = Reflux.createActions(['forDay','reset']);



export class RankingStore extends Reflux.Store
{
    
    api = new Api;

    constructor()
    {
        super();
        this.listenables = RankingActions;
    }


    getInititalState(){
        return {
            Ranking:{
                hasData: false,
                data: []
            }
        };
    }

    onReset(){
        this.setState(this.getInititalState());
    }

 
    async forDay(date_id){

        const endpoint = `/trivia-points/for-date/${date_id}`;

        const response = await this.api.GET(endpoint);
  
        const state = {
            Ranking:{
                hasData: response.success,
                data: response.data
            }
        }
        this.setState(state)
    }
}

