import { StackNavigator } from 'react-navigation';
import EnterNumber from './enterNumber'
import EnterCode from './enterCode'
import EnterDetails from './enterDetails'
import ChooseCity from './chooseCity'
import CitiesList from './citiesList'
import UploadPhoto from './uploadPhoto'

export const RegistrationNavigator = StackNavigator({
    enterNumber: {
        screen: EnterNumber
    },
    enterCode: {
        screen: EnterCode
    },
    enterDetails: {
        screen: EnterDetails
    },
    chooseCity: {
        screen: ChooseCity
    },
    citiesList:{
        screen: CitiesList
    },
    uploadPhoto:{
        screen: UploadPhoto
    }
},
    {
        headerMode: 'none',
        //initialRouteName: 'chooseCity'
    });