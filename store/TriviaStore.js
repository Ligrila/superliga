import Reflux from 'reflux';

import Api from '../api/Api';

import DateTimeHelper from '../DateTimeHelper';

export const TriviaActions = Reflux.createActions(['index']);

export class TriviaStore extends Reflux.Store
{
    api = new Api;

    constructor()
    {
        super();
        this.listenables = TriviaActions;
        this.state = this.getInititalState();

    }

    getInititalState(){
        return {
            Trivia: {
                hasData: false,
                Trivias: [],
            },
        };
    }



	async onIndex()
	{
        const trivias =  await this.api.getTrivias();
        if(!trivias.success){
            return;
        }
        for (var index = 0; index < trivias.data.length; index++) {
            let data = trivias.data[index];
            data.start_datetime_local = await DateTimeHelper.datetime(data.start_datetime);
            data.start_datetime_local_string = await DateTimeHelper.format(data.start_datetime);
            trivias.data[index]  = data;
          }
        this.setState({
            Trivia: {
                hasData: true,
                Trivias: trivias.data,
            },
        });
	}
}

