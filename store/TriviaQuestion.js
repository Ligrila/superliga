import Reflux from 'reflux';

export const TriviaQuestionActions = Reflux.createActions(['add','timeout']);

export class TriviaQuestion extends Reflux.Store
{
    timer = null;
    constructor()
    {
        super();
        this.listenables = TriviaQuestionActions;
        this.state = this.getInititalState();

    }
    getInititalState(){
        return {
            hasQuestion: false,
            currentQuestion: {},
            currentTimeout: 0,
            timedOut: false,
        };
    }
    async onAdd(q){
        if(this.timer){
            clearTimeout(this.timer);
        }
        let timeout = q.timeout ? q.timeout : 6000;
        this.timer = setTimeout(()=>{
            console.log("t");
            TriviaQuestionActions.timeout();
        },timeout);
        console.log(this.timer);
        this.setState({
            hasQuestion: true,
            currentQuestion: q,
            currentTimeout: timeout,
            timedOut: false
        });
        

    }
    onTimeout(){
        console.log("Question timed out" + new Date());
        /*this.setState({
            timedOut: true,
            hasQuestion: false,
        });*/
    }

}

