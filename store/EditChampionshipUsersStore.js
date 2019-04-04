import Reflux from 'reflux';
import Api from '../api/Api';

export const EditChampionshipUsersActions = Reflux.createActions(['toggle','reset']);



export class EditChampionshipUsersStore extends Reflux.Store
{
    
    api = new Api;

    constructor()
    {
        super();
        this.listenables = EditChampionshipUsersActions;
        this.state = this.getInititalState();
    }


    getInititalState(){
        return {
            EditChampionshipUsers:{
                loading: false,
                hasData: false,
                data: []
            }
        };
    }

    onReset(){
        this.setState(this.getInititalState());
    }


    async toggle(user_id,championship_id,value){
        this.setState({loading:true})
        let response = await this.api.toggleChampionshipUser(user_id,championship_id,value);


        const state = {
            EditChampionshipUsers:{
                loading:false,
                hasData: true,
                data: response
            }
        }
        this.setState(state)

    }
}

