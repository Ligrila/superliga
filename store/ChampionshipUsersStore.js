import Reflux from 'reflux';
import Api from '../api/Api';

export const ChampionshipUsersActions = Reflux.createActions(['list','reset']);



export class ChampionshipUsersStore extends Reflux.Store
{
    
    api = new Api;

    constructor()
    {
        super();
        this.listenables = ChampionshipUsersActions;
        this.state = this.getInititalState();
    }


    getInititalState(){
        return {
            ChampionshipUsers:{
                loading: false,
                hasData: false,
                data: []
            }
        };
    }

    onReset(){
        this.setState(this.getInititalState());
    }


    async list(id){
        this.setState({loading:true})
        let response = await this.api.championshipUsers(id);


        const state = {
            ChampionshipUsers:{
                loading:false,
                hasData: response.success,
                data: response.data
            }
        }
        this.setState(state)

    }
}

