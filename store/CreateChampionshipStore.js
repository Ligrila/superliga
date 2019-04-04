import Reflux from 'reflux';
import Api from '../api/Api';

export const CreateChampionshipActions = Reflux.createActions(['create','created','edit','edited','reset']);



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
    onEdited(championship){

    }
    async create(name,picture=null){
        this.setState({loading:true})
        let response = await this.api.createChampionship(name,picture);
        console.log({response})

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

    async edit(id,name,picture=null){
        this.setState({loading:true})
        let response = await this.api.editChampionship(id,name,picture);
        console.log({response})

        const state = {
            CreateChampionship:{
                loading:false,
                hasData: true,
                data: response
            }
        }
        this.setState(state)
        if(response.success){
            CreateChampionshipActions.edited(response.data)
        }
    }
}

