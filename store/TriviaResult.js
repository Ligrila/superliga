import Reflux from 'reflux';

export const TriviaResultActions = Reflux.createActions(['result','reset']);


export class TriviaResult extends Reflux.Store
{
    timer = null;
    constructor()
    {
        super();
        this.listenables = TriviaResultActions;
        this.state = this.getInititalState();

    }
    getInititalState(){
        return {
            Result: {
                hasResult: false,
                timedOut: false,
                serverSuccess:true,
                win:false,
            }
        };
    }
    onReset(){
        this.setState(this.getInititalState());
    }

    onResult(win,serverSuccess,timedOut){
        const hasResult = true;
        this.setState({
            Result:{
                win,
                hasResult,
                serverSuccess,
                timedOut
            }
        });
    }

}

