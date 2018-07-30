import Reflux from 'reflux';

export const TriviaQuestionActions = Reflux.createActions(['add','timeout','answerQuestion','finishedQuestion','reset']);

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
            answeredServerResponse: null,
            hasResult: false,
            correctOption: null,
            currentQuestion: {},
            currentTimeout: 0,
            timedOut: false,
            serverSuccess:true,
            win:false,
        };
    }
    onReset(){
        this.setState(this.getInititalState());
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
        if(!this.state.hasQuestion){
            return;
        }
        if(this.state.currentQuestion.id == question.id){
            if(this.state.answeredServerResponse){
                this.state.answeredServerResponse.then((data)=>{
                    this.setState({
                        correctOption: question.correct_option,
                        hasResult: true,
                        serverSuccess: data.success,
                        win: data.success && (question.correct_option == this.state.answeredOption)
                    });
                });
            } else{
                this.setState({
                    correctOption: question.correct_option,
                    hasResult: true,
                    serverSuccess: false,
                    win: false
                });
            }
        } else{
            console.warn("Intentando finalizar a una pregunta que no es la actual");
        }
    }
    onAnswerQuestion(question_id,option,response){
        //necesitamos saber si response llego a destino antes de dar veredicto.

        if(this.state.currentQuestion.id == question_id){
            this.setState({
                answered: true,
                answeredOption: 'option_'+option,
                answeredServerResponse: response
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

