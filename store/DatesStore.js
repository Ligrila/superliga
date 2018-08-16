import Reflux from 'reflux';
import Api from '../api/Api';

export const DatesActions = Reflux.createActions(['calendar','reset']);

export class DatesStore extends Reflux.Store
{
    
    api = new Api;

    constructor()
    {
        super();
        this.listenables = DatesActions;
        this.state = this.getInititalState();

    }
    getInititalState(){
        return {
            Dates:{

            }
        };
    }
    onReset(){
        this.setState(this.getInititalState());
    }

    /***
     * @param question_id question id
     * @param option integer, the number of option
    */
    async calendar(){
        let response = await this.api.calendar();
        this.setState({
            Dates:{
                ...response.data
            }
        });
    }
}

