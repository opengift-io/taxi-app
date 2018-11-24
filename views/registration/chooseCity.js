import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import API from '../../networking/api'
import { BarIndicator } from 'react-native-indicators';

export default class ChooseCity extends Component {
    api= new API()

    constructor(props){
        super(props)
        this.state={
            loading: true,
            items: [],
            city: ''
        }
    }

    componentDidMount(){
       this.api.cities().then((res)=>{
           console.log(res._items);
           
        this.setState({
            items: res._items,
            loading: false,
            city: res._items[0].title
        })
       }).catch((error)=>{
           console.log(error);
           
       })
    }

    _renderLoading() {
        return this.state.loading ?
            (<View style={styles.loadingContainer}>
                <BarIndicator
                    count={7}
                    color='#3dc464' />
            </View>) :
            null
    }

    selectCity=(city)=>{
        this.setState({
            city: city
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>
                        Choose a city
                </Text>
                    <View style={styles.iconContainer}>
                    </View>
                    <Text style={styles.cityText}>
                        {this.state.city}
                </Text>
                <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('turnOnGeolocation')
                        }}
                        activeOpacity={0.8}
                        style={styles.nextButton}>
                        <Text
                        style={styles.nextButtonText}
                        >
                            Next Step
                </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('citiesList', 
                            { items: this.state.items,
                                selectCity: this.selectCity
                            }
                            )
                        }}
                        activeOpacity={0.8}
                        style={styles.button}>
                        <Text style={styles.buttonText}>
                            Change
                </Text>
                    </TouchableOpacity>
                </View>
                {this._renderLoading()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        width: '100%',
        alignItems: 'center',
    },
    title: {
        fontSize: 25,
        marginBottom: 15,
    },
    iconContainer: {
        height: 110,
        width: 110,
        backgroundColor: '#3dc464'
    },
    cityText: {
        fontSize: 30,
        marginVertical: 15
    },
    button: {
        marginVertical: 20,
        height: 40,
        paddingHorizontal: 30,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#3dc464',
        borderWidth: 3
    },
    buttonText:{
        fontSize: 20,
        color: 'rgba(0,0,0,0.2)'
    },
    nextButton:{
        height: 40,
        paddingHorizontal: 30,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3dc464'
    },
    nextButtonText:{
        fontSize: 20,
        color: '#fff'
    },
    loadingContainer: {
        zIndex: 2,
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.2)',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
