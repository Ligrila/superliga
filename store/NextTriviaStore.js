import Reflux from 'reflux';

import Api from '../api/Api';

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
            await this.setState({
                NextTrivia:{
                    hasData: true,
                    Trivia: nextTrivia.data
                }
            });
        }
    }


}

