import Reflux from 'reflux';
import Api from '../api/Api';

export const TriviaAnswerActions = Reflux.createActions(['add','reset']);

export class TriviaResult extends Reflux.Store
{
    
    api = new Api;

    constructor()
    {
        super();
        this.listenables = TriviaAnswerActions;
        this.state = this.getInititalState();

    }
    getInititalState(){
        return {
            Answer:{
                answered: false,
                answeredOption: null,
                answeredServerResponse: null,
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
    onAdd(question_id,option){
        let response = this.api.sendAnswer(question.id,option);
        this.setState({
            Answer:{
                answered: true,
                answeredOption: 'option_'+option,
                answeredServerResponse: response
            }
        });

    }
}

