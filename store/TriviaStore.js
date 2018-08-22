import Reflux from 'reflux';

import Api from '../api/Api';

import DateTimeHelper from '../DateTimeHelper';


TriviaActions = Reflux.createActions(
    {
        'index':{'children':['completed','failed'],asyncResult: true,actionName: 'index'}
    }
);

TriviaActions.index.listen( function(){
    let api = new Api;
    api.getTrivias()
        .then(async(trivias)=>{
            if(!trivias.success){
                return;
            }
            for (var index = 0; index < trivias.data.length; index++) {
                let data = trivias.data[index];
                data.start_datetime_local = await DateTimeHelper.datetime(data.start_datetime);
                data.start_datetime_local_string = await DateTimeHelper.format(data.start_datetime);
                trivias.data[index]  = data;
              }
            this.completed(trivias);
        })
        .catch(this.failed);
});


class TriviaStore extends Reflux.Store
{
    

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
    onIndexFailed(){

    }

    async onIndexCompleted(trivias){
        this.setState({
            Trivia: {
                hasData: true,
                Trivias: trivias.data,
            },
        });
    }

	/*async onIndex()
	{
        const trivias =  await this.api.getTrivias();

	}*/
}

export {TriviaActions,TriviaStore};