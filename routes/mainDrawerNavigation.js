import { DrawerNavigator } from "react-navigation";
import {
    Home,
    HistoryNavigator,
    NearbyDrivingsNav
} from '../views'
import  DrawerContent  from './drawerContent'

const Drawer = DrawerNavigator(
    {
        home: {
            screen: Home
        },
        requestHistory:{
            screen: HistoryNavigator
        },
        nearbyDrivingsNav:{
            screen: NearbyDrivingsNav
        }
    },

    {
        contentComponent: DrawerContent,
        //initialRouteName: 'requestHistory'
    }
);

export default Drawer;
