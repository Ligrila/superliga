import Reflux from 'reflux';
import CacheStore from './CacheStore'
import Api from '../api/Api';

export const ChallengesActions = Reflux.createActions(['list','reset']);



export class ChallengesStore extends CacheStore
{
    
    api = new Api;

    constructor()
    {
        super('Store.Challenges');
        this.listenables = ChallengesActions;
    }

    

    getInititalState(){
        return {
            Challenges:{
                hasData: false,
                data: []
            }
        };
    }

    onReset(){
        this.setState(this.getInititalState());
    }


 
    async list(q=null){
        let response = await this.api.challengesList();
        const state = {
            Challenges:{
                hasData: true,
                data: response.data
            }
        }
        this.setStateCache(state)
    }
}

