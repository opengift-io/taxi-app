import { createStackNavigator, createAppContainer } from "react-navigation";
import {ChooseCountry} from "../../views/choose-country/choose-country"; 

const AppNavigator = createStackNavigator({
	Country:ChooseCountry
	
},{
	initialRouteName:"Country"
})
export default createAppContainer(AppNavigator);
