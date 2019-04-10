import Reflux from 'reflux';

import { NavigationActions as ReactNavigationActions } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';


export const NavigatorActions = Reflux.createActions(['setNavigator','navigate','drawerOpen']);

export class NavigatorStore extends Reflux.Store
{
    
    constructor()
    {
        super();
        this.listenables = NavigatorActions;
        this.state = this.getInititalState();

    }


    getInititalState(){
        return {
            Navigator:{
                hasData : false,
                instance: null
            }
        };
    }
    drawerOpen() {
        if(!this.state.Navigator.hasData){
            return;
        }

        this.state.Navigator.instance.dispatch(
            DrawerActions.openDrawer()
        )

    }
    navigate(routeName,params){
        if(!this.state.Navigator.hasData){
            return;
        }
        this.state.Navigator.instance.dispatch(
            ReactNavigationActions.navigate({
              routeName,
              params,
            })
        )
    }

    setNavigator(appNavigator){
        this.state.Navigator.instance = appNavigator;
        this.state.Navigator.hasData = true;
    }

}

