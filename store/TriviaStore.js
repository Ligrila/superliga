import Reflux from 'reflux';

import Api from '../api/Api';

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
        this.setState({
            Trivia: {
                hasData: true,
                Trivias: trivias,
            },
        });
	}
}

