import { StackNavigator } from 'react-navigation';
import NearbyDrivings from './nearbyDrivings'
import InfoModal from './infoModal'
import OrderMap from './orderMap'

export const NearbyDrivingsNav = StackNavigator({
    nearbyDrivings:{
        screen: NearbyDrivings
    },
    infoModal:{
        screen: InfoModal
    },
    orderMap:{
        screen: OrderMap
    }
},
    {
        headerMode: 'none',
        //initialRouteName: 'chooseCity'
    });