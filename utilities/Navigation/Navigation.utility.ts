import { getNavigation, navigationAtomState } from '../../recoil/Navigation.recoil';

export default class NavigationUtility {

    static getActiveRouteState(route: any) {
        if (route) {
            let routes = [];
            let index = 0
            if (route.state) {
                routes = route.state.routes ? route.state.routes : [];
                index = route.state.index ? route.state.index : 0;
            } else {
                routes = route.routes ? route.routes : [];
                index = route.index ? route.index : 0;
            }

            if (!routes || routes.length === 0 || index >= routes.length) {
                return route;
            }
            const childActiveRoute = routes[index];
            return this.getActiveRouteState(childActiveRoute);
        }
    }
    static async getActiveRoute() {

        const navigationState = await getNavigation();
        // console.log('navigationState', navigationState)
        if (navigationState) {
            const routes = navigationState;
            const currentRoute = this.getActiveRouteState(routes);
            if (currentRoute) {
                return currentRoute;
            }
        }

        return null;
    }


}