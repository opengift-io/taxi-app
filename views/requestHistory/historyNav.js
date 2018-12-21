import { StackNavigator } from 'react-navigation';
import RequestHistory from './requestHistory'
import OrderInfoModal from './orderInfoModal'

export const HistoryNavigator = StackNavigator({
    historyList:{
        screen: RequestHistory
    },
    orderInfoModal:{
        screen: OrderInfoModal
    }
},
    {
        headerMode: 'none',
        //initialRouteName: 'chooseCity'
    });