import Reflux from 'reflux';
import Api from '../api/Api';

export const AwardsActions = Reflux.createActions(['index','reset']);

export class AwardsStore extends Reflux.Store
{
    
    api = new Api;

    constructor()
    {
        super();
        this.listenables = AwardsActions;
        this.state = this.getInititalState();

    }
    getInititalState(){
        return {
            Awards:[]
        };
    }
    onReset(){
        this.setState(this.getInititalState());
    }


    async index(){
        let response = await this.api.getAwards();

        if(response.success){
            this.setState({
                Awards:[
                    ...response.data
                ]
            });
        }
    }
}

