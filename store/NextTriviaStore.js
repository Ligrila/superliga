import Reflux from 'reflux';

import Api from '../api/Api';
import DateTimeHelper from '../DateTimeHelper';

export const NextTriviaActions = Reflux.createActions(['get']);

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
        };
    }

    async onGet(){
        const nextTrivia = await this.api.getNextTrivia();
        if(nextTrivia.success){
            let data = nextTrivia.data;
            data.start_datetime_local = await DateTimeHelper.datetime(data.start_datetime);
            data.start_datetime_local_string = await DateTimeHelper.format(data.start_datetime);

            await this.setState({
                NextTrivia:{
                    hasData: true,
                    Trivia: data
                }
            });
        }
    }


}

