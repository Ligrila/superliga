import Reflux from 'reflux';

import Api from '../api/Api';
import DateTimeHelper from '../helpers/DateTimeHelper';


export const NextTriviaActions = Reflux.createActions(
    [
        'get',
        'current',
        'startTrivia',
        'finish',
        'finishHalfTime',
        'halfTime',
        'startHalfTime',
        'halfTimeStarted',
        'showBanner',
        'showBannerStarted',
        'startHalfTimePlay',
        'halfTimePlay',
        'finishGame',
        'gameFinished',
        'startExtraPlay',
        'extraPlay'
    ]
    );

export class NextTriviaStore extends Reflux.Store
{
    api = new Api;
    constructor()
    {
        super();
        this.listenables = NextTriviaActions;
        this.state = this.getInititalState();

    }

    getInititalState(){
        return {
            NextTrivia:{
                hasData: false,
                Trivia: {}
            },
            CurrentTrivia:{
                hasData: false,
                Trivia: {}
            }
        };
    }

    onFinish(){
        this.setState({
            CurrentTrivia:{
                hasData: false,
                Trivia: {}
            }
        });
    }

    halfTime(b){}

    finishHalfTime(payload){
        if(!this.state.CurrentTrivia.hasData){
            return;
        }
        if(this.state.CurrentTrivia.Trivia.id == payload.id ){
            let CurrentTrivia = this.state.CurrentTrivia;
            CurrentTrivia.Trivia.half_time_finished = true;
            CurrentTrivia.Trivia.half_time_started = false;

            this.setState({CurrentTrivia});
            NextTriviaActions.halfTime(true);
        }
    }

    extraPlay(){

    }
    
    startExtraPlay(payload){
        if(!this.state.CurrentTrivia.hasData){
            return;
        }
        if(this.state.CurrentTrivia.Trivia.id == payload.id ){
            NextTriviaActions.extraPlay();
        }
    }

    halfTimePlay(){

    }
    
    startHalfTimePlay(payload){
        if(!this.state.CurrentTrivia.hasData){
            return;
        }
        if(this.state.CurrentTrivia.Trivia.id == payload.id ){
            NextTriviaActions.halfTimePlay();
        }
    }

    showBannerStarted(payload){

    }

    showBanner(payload){
        console.log("showBanner")
        if(!this.state.CurrentTrivia.hasData){
            console.warn("No trivia data")
            return;
        }
        if(this.state.CurrentTrivia.Trivia.id == payload.trivia_id ){
            NextTriviaActions.showBannerStarted(payload);
        }
    }
    
    halfTimeStarted(){}

    startHalfTime(payload){
        if(!this.state.CurrentTrivia.hasData){
            return;
        }
        if(this.state.CurrentTrivia.Trivia.id == payload.id ){
            let CurrentTrivia = this.state.CurrentTrivia;
            CurrentTrivia.Trivia.half_time_finished = true;
            CurrentTrivia.Trivia.half_time_started = true;
            this.setState({CurrentTrivia});
            NextTriviaActions.halfTimeStarted(true);
        }
    }

    gameFinished(){}

    finishGame(payload){
        if(!this.state.CurrentTrivia.hasData){
            return;
        }
        if(this.state.CurrentTrivia.Trivia.id == payload.id ){
            let CurrentTrivia = this.state.CurrentTrivia;
            CurrentTrivia.Trivia.half_time_finished = true;
            CurrentTrivia.Trivia.half_time_started = true;
            CurrentTrivia.Trivia.game_finished = true;

            this.setState({CurrentTrivia});
            NextTriviaActions.gameFinished();
        }
    }

    async onCurrent(payload){
        let ct = {};
        if(typeof(payload)=='undefined'){
            ct = await this.api.getCurrentTrivia();
        } else{
            // por aqui es por el socket o sea mostramos comienza el primer tiempo
            ct = {success:true,data:payload};
        }
        if(ct.success){
            let data = ct.data;
            if(data){
                data.start_datetime_local = await DateTimeHelper.datetime(data.start_datetime);
                data.start_datetime_local_string = await DateTimeHelper.format(data.start_datetime);            
            }
            await this.setState({
                CurrentTrivia:{
                    hasData: true,
                    Trivia: data
                }
            });
        }
    }

    startTrivia(){

    }

    async onGet(){
        const nextTrivia = await this.api.getNextTrivia();
        if(nextTrivia.success){
            let data = nextTrivia.data;
            if(data){
                data.start_datetime_local = await DateTimeHelper.datetime(data.start_datetime);
                data.start_datetime_local_string = await DateTimeHelper.format(data.start_datetime);
            }

            await this.setState({
                NextTrivia:{
                    hasData: true,
                    Trivia: data
                }
            });
        }
    }


}

