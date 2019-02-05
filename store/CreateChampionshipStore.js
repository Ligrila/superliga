import Reflux from 'reflux';
import Api from '../api/Api';

export const CreateChampionshipActions = Reflux.createActions(['create','created','reset']);



export class CreateChampionshipStore extends Reflux.Store
{
    
    api = new Api;

    constructor()
    {
        super();
        this.listenables = CreateChampionshipActions;
        this.state = this.getInititalState();
    }


    getInititalState(){
        return {
            CreateChampionship:{
                loading: false,
                hasData: false,
                data: []
            }
        };
    }

    onReset(){
        this.setState(this.getInititalState());
    }

    onCreated(championship){

    }
    async create(name,startDate,endDate){
        this.setState({loading:true})
        let response = await this.api.createChampionship(name,startDate,endDate);
        console.log(response);

        const state = {
            CreateChampionship:{
                loading:false,
                hasData: true,
                data: response
            }
        }
        this.setState(state)
        if(response.success){
            CreateChampionshipActions.created(response.data)
        }
    }
}

