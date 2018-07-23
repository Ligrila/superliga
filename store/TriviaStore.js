import Reflux from 'reflux';

import Api from '../api/Api';

export const TriviaActions = Reflux.createActions(['nextTrivia', 'indexTrivias']);

export class TriviaStore extends Reflux.Store
{
    api = new Api;
    _nextTrivia = false;
    _trivias = false;
    constructor()
    {
        super();
        this.listenables = TriviaActions;

    }

    async onNextTrivia(){
        //this._nextTrivia = await this.api.getNextTrivia();
        // calls on Actions.firstAction();
        if(this._nextTrivia){
            this.setState({nextTrivia: this._nextTrivia});
            return;
        }
        console.log("getNextTrivia");
        this._nextTrivia =  await this.api.getNextTrivia();
        console.log(this._nextTrivia);
        await this.setState({nextTrivia: this._nextTrivia});
    }

	async onIndexTrivias()
	{
        this._trivias =  await this.api.getTrivias();
        this.setState({trivias: this._trivias});
	}
}

