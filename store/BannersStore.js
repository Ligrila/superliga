import Reflux from 'reflux';

import Api from '../api/Api';

import DateTimeHelper from '../helpers/DateTimeHelper';


const HomeBannerActions = Reflux.createActions(
    {
        'index':{'children':['completed','failed'],asyncResult: true,actionName: 'index'}
    }
);

HomeBannerActions.index.listen( function(){
    let api = new Api;
    api.homeBanners()
        .then(async(HomeBanners)=>{
            if(!HomeBanners.success){
                return;
            }
            for (var index = 0; index < HomeBanners.data.length; index++) {
                let data = HomeBanners.data[index];
                if(data.type!='banner'){
                    data.start_datetime_local = await DateTimeHelper.datetime(data.start_datetime);
                    data.start_datetime_local_string = await DateTimeHelper.format(data.start_datetime);
                }
                HomeBanners.data[index]  = data;
              }
            this.completed(HomeBanners);
        })
        .catch(this.failed);
});


class HomeBannerStore extends Reflux.Store
{
    

    constructor()
    {
        super();
        this.listenables = HomeBannerActions;
        this.state = this.getInititalState();

    }

    getInititalState(){
        return {
            HomeBanner: {
                hasData: false,
                data: [],
            },
        };
    }
    onIndexFailed(){

    }

    async onIndexCompleted(HomeBanners){
        this.setState({
            HomeBanner: {
                hasData: true,
                data: HomeBanners.data,
            },
        });
    }


}

export {HomeBannerActions,HomeBannerStore};