import Reflux from 'reflux';
import Api from '../api/Api';

export const CurrentTriviaStatisticsActions = Reflux.createActions(['update','reset']);

export class CurrentTriviaStatisticsStore extends Reflux.Store
{
    
    api = new Api;

    constructor()
    {
        super();
        this.listenables = CurrentTriviaStatisticsActions;
        this.state = this.getInititalState();

    }
    getInititalState(){
        return {
            CurrentTriviaStatistics:{
                
                points: 0,
                mediaHits: 0,
                correctAnswers:0,
                wrongAnswers: 0,
                triviaHits:0,
                usedLives: 0,
                ranking: 0,

            }
        };
    }
    onReset(){
        this.setState(this.getInititalState());
    }



    async update(trivia_id){
        let response = await this.api.getTriviaStatistics(trivia_id);
        if(response.success){
            this.setState({
                CurrentTriviaStatistics:{
                    ...response.data
                }
            });
        }
    }
}

