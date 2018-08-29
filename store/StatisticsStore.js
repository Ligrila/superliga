import Reflux from 'reflux';
import Api from '../api/Api';

export const StatisticsActions = Reflux.createActions(['update','reset']);

export class StatisticsStore extends Reflux.Store
{
    
    api = new Api;

    constructor()
    {
        super();
        this.listenables = StatisticsActions;
        this.state = this.getInititalState();

    }
    getInititalState(){
        return {
            Statistics:{
                
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



    async update(){
        let response = await this.api.getStatistics();
        if(response.success){
            this.setState({
                Statistics:{
                    ...response.data
                }
            });
        }
    }
}

