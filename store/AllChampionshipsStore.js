import Reflux from 'reflux';
import CacheStore from './CacheStore'
import Api from '../api/Api';

export const AllChampionshipsActions = Reflux.createActions(['list','reset']);



export class AllChampionshipsStore extends CacheStore
{
    
    api = new Api;

    constructor()
    {
        super('Store.AllChampionships');
        this.listenables = AllChampionshipsActions;
    }

    

    getInititalState(){
        return {
            AllChampionships:{
                hasData: false,
                data: []
            }
        };
    }

    onReset(){
        this.setState(this.getInititalState());
    }


 
    async list(q=null){
        let response = await this.api.allChampionshipList(q);
        const state = {
            AllChampionships:{
                hasData: true,
                data: response.data
            }
        }
        this.setStateCache(state)
    }
}

