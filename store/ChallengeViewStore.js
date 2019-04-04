import Reflux from 'reflux';
import CacheStore from './CacheStore'
import Api from '../api/Api';

export const ChallengeViewActions = Reflux.createActions(['ranking','changeChallenge','reset']);



export class ChallengeViewStore extends CacheStore
{
    
    api = new Api;

    constructor()
    {
        super('Store.ChallengeView');
        this.listenables = ChallengeViewActions;
    }

    changeChallenge(id){
        this.cacheKey = 'Store.ChallengeView.' + id;
        this.setInititalStateCache(this.cacheKey,this.getInititalState())
    }

    getInititalState(){
        return {
            ChallengeView:{
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
        this.cacheKey = 'Store.ChallengeView.' + id;
        let response = await this.api.challengeRanking(id,type);
        let state = this.state;
        state.ChallengeView.hasData = true;
        state.ChallengeView[type] = {
            hasData : true,
            data : response.data
        }


        this.setStateCache(state)
    }
}

