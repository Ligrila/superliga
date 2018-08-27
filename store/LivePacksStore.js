import Reflux from 'reflux';
import Api from '../api/Api';

export const LivePacksActions = Reflux.createActions(['index','reset']);

export class LivePacksStore extends Reflux.Store
{
    
    api = new Api;

    constructor()
    {
        super();
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

        this.setState({
            LivePacks:{
                hasData: true,
                data: response.data
            }
        });
    }
}

