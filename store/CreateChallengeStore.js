import Reflux from 'reflux';
import Api from '../api/Api';

export const CreateChallengeActions = Reflux.createActions(['create','created','reset']);



export class CreateChallengeStore extends Reflux.Store
{
    
    api = new Api;

    constructor()
    {
        super();
        this.listenables = CreateChallengeActions;
        this.state = this.getInititalState();
    }


    getInititalState(){
        return {
            CreateChallenge:{
                loading: false,
                hasData: false,
                data: []
            }
        };
    }

    onReset(){
        this.setState(this.getInititalState());
    }

    onCreated(Challenge){

    }
    async create(name,startDate,endDate){
        this.setState({loading:true})
        let response = await this.api.createChallenge(name,startDate,endDate);
        console.log(response);

        const state = {
            CreateChallenge:{
                loading:false,
                hasData: true,
                data: response
            }
        }
        this.setState(state)
        if(response.success){
            CreateChallengeActions.created(response.data)
        }
    }
}

