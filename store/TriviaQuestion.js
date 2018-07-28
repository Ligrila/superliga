import Reflux from 'reflux';

export const TriviaQuestionActions = Reflux.createActions(['add','timeout','answerQuestion','finishedQuestion']);

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
            answered: false,
            answeredOption: null,
            hasResult: false,
            correctOption: null,
            currentQuestion: {},
            currentTimeout: 0,
            timedOut: false,
            win:false,
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
    onFinishedQuestion(question){
        if(this.state.currentQuestion.id == question.id){
            this.setState({
                correctOption: question.correctOption,
                hasResult: true,
                win: question.correctOption == this.state.answeredOption
            });
        } else{
            console.warn("Intentando finalizar a una pregunta que no es la actual");
        }
    }
    onAnswerQuestion(question_id,option){
        if(this.state.currentQuestion.id == question_id){
            this.setState({
                answered: true,
                answeredOption: 'option_'+option,
            });
        } else{
            console.warn("Intentando responder a una pregunta que no es la actual");
        }
    }
    onTimeout(){
        console.log("Question timed out" + new Date());
        
        /*this.setState(this.getInititalState());*/
    }

}

