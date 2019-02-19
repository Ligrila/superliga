import Reflux from 'reflux';
import CacheStore from './CacheStore'
import Api from '../api/Api';

export const ChampionshipViewActions = Reflux.createActions(['ranking','changeChampionship','reset']);



export class ChampionshipViewStore extends CacheStore
{
    
    api = new Api;

    constructor()
    {
        super('Store.ChampionshipView');
        this.listenables = ChampionshipViewActions;
    }

    changeChampionship(id){
        this.cacheKey = 'Store.ChampionshipView.' + id;
        this.setInititalStateCache(this.cacheKey,this.getInititalState())
    }

    getInititalState(){
        return {
            ChampionshipView:{
                hasData: false,
                "day":{
                    hasData: false,
                    data: []
                },
                "week":{
                    hasData: false,
                    data: []
                },
                "trivia":{
                    hasData: false,
                    data: []
                },
                "all": {
                    hasData: false,
                    data: []
                }
            }
        };
    }

    onReset(){
        this.setState(this.getInititalState());
    }

 
    async ranking(id,type='trivia'){
        this.cacheKey = 'Store.ChampionshipView.' + id;
        let response = await this.api.championshipRanking(id,type);
        let state = this.state;
        state.ChampionshipView.hasData = true;
        state.ChampionshipView[type] = {
            hasData : true,
            data : response.data
        }


        this.setStateCache(state)
    }
}

