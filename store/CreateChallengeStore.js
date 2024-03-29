import Reflux from 'reflux';
import Api from '../api/Api';

export const CreateChallengeActions = Reflux.createActions(['create','response','reset']);



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
                data: {}
            }
        };
    }

    onReset(){
        this.setState(this.getInititalState());
    }

    onResponse(Challenge){

    }
    async create(championship_id,challenge_championship_id){
        this.setState({loading:true})
        let response = await this.api.createChallenge(championship_id,challenge_championship_id);

        const state = {
            CreateChallenge:{
                loading:false,
                hasData: true,
                data: response
            }
        }
        this.setState(state)

        CreateChallengeActions.response(response)
        
    }
}

