import Reflux from 'reflux';

export const TriviaQuestionActions = Reflux.createActions(['add','onNewQuestion','onFinishQuestion','timeout','answerQuestion','finishedQuestion','reset']);

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
            currentTimestamp: 0, 
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
        let timeout = q.timeout ? q.timeout : 15000;
        this.timer = setTimeout(()=>{
            TriviaQuestionActions.timeout();
        },timeout);
        this.setState(this.getInititalState());
        //console.log(this.timer);
        await this.setState({
            hasQuestion: true,
            currentQuestion: q,
            currentTimestap: new Date().getTime(),
            currentTimeout: timeout,
            timedOut: false
        });

        TriviaQuestionActions.onNewQuestion(q);
        

    }
    onNewQuestion(q){

    }
    onFinishQuestion(q){

    }

    onFinishedQuestion(question){
        if(!this.state.hasQuestion){
            return;
        }
        if(this.state.currentQuestion.id == question.id){
            if(this.state.answeredServerResponse){
                this.state.answeredServerResponse.then((data)=>{
                    console.log(data);
                    this.setState({
                        hasQuestion: false,
                        currentQuestion: question,
                        correctOption: question.correct_option,
                        hasResult: true,
                        serverSuccess: data.success,
                        win: data.success && (question.correct_option == this.state.answeredOption)
                    });
                });
            } else{
                this.setState({
                    hasQuestion: false,
                    correctOption: question.correct_option,
                    currentQuestion: question,
                    hasResult: true,
                    serverSuccess: false,
                    win: false
                });
            }
        } else{
            console.warn("Intentando finalizar a una pregunta que no es la actual");
        }

        TriviaQuestionActions.onFinishQuestion(question);

    }
    onAnswerQuestion(question_id,option,response){
        //necesitamos saber si response llego a destino antes de dar veredicto.
        /*response.then((data)=>{
            console.log(data);
        })*/
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
        //console.log("Question timed out" + new Date());
        this.setState({
            timedOut: true,
        });
        /*this.setState(this.getInititalState());*/
    }

}

