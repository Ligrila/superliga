import Reflux from 'reflux';
import CacheStore from './CacheStore'
import Api from '../api/Api';

export const ChampionshipsActions = Reflux.createActions(['list','reset']);



export class ChampionshipsStore extends CacheStore
{
    
    api = new Api;

    constructor()
    {
        super('Store.Championships');
        this.listenables = ChampionshipsActions;
    }

    

    getInititalState(){
        return {
            Championships:{
                hasData: false,
                data: []
            }
        };
    }

    onReset(){
        this.setState(this.getInititalState());
    }

 
    async list(){
        let response = await this.api.championshipList();
        const state = {
            Championships:{
                hasData: true,
                data: response.data
            }
        }
        this.setStateCache(state)
    }
}

