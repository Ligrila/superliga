import Reflux from 'reflux';
import Api from '../api/Api';
import CacheStore from './CacheStore'

export const LivePacksActions = Reflux.createActions(['index','reset']);

export class LivePacksStore extends CacheStore
{
    
    api = new Api;

    constructor()
    {
        super('Store.LivePacks');
        this.listenables = LivePacksActions;
        this.state = this.getInititalState();

    }
    getInititalState(){
        return {
            LivePacks:{
                hasData: false,
                data: []
            }
        };
    }
    onReset(){
        this.setState(this.getInititalState());
    }


    async index(){
        let response = await this.api.getLivePacks()

        this.setStateCache({
            LivePacks:{
                hasData: true,
                data: response.data
            }
        });
    }
}

