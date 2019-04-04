import Reflux from 'reflux';
import Api from '../api/Api';

export const ChallengeRequestActions = Reflux.createActions(['get','save','response','reset']);



export class ChallengeRequestStore extends Reflux.Store
{
    
    api = new Api;

    constructor()
    {
        super();
        this.listenables = ChallengeRequestActions;
        this.state = this.getInititalState();
    }


    getInititalState(){
        return {
            ChallengeRequest:{
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
    async get(id){

    }
    async save(id,accepted){
        this.setState({loading:true})
        let response = await this.api.challengeResponse(id,accepted);

        const state = {
            ChallengeRequest:{
                loading:false,
                hasData: true,
                data: response
            }
        }
        this.setState(state)

        ChallengeRequestActions.response(response)
        
    }
}

