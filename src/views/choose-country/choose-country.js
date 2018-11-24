import React, {Component} from 'react';
//import courties from "json!../../assets/data/country/counties.json"
import {View,Text} from "react-native"
import {connect} from "react-redux";
class ChooseCountryClass extends Component{
  render() {
//	console.log(courties);
    return <View>
		<Text>Hello</Text>
	</View>
    ;
  }
}
export const ChooseCountry  =new  ChooseCountryClass()//= connect()(ChooseCountryClass);