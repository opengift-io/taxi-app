import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    Image
} from 'react-native';

export default class CitiesList extends Component {
  
    defaultCities = []
    
    constructor(props) {
        super(props)
        this.state = {
            cities: []
            
        }
        const { params } = this.props.navigation.state
        this.defaultCities=params.items
        this.state.cities=params.items
    }

    _renderCitiesList() {
        return this.state.cities.map((item, i) => (<TouchableOpacity
        onPress={()=>{
            const { params } = this.props.navigation.state
            Keyboard.dismiss()
            params.selectCity(item.title)
            this.props.navigation.goBack()
        }}
            key={i}
            style={styles.cityItem}
        >
            <Text style={styles.itemText1}>
                {item.title}
            </Text>
            <Text style={styles.itemText2}>
                District of Columbia
            </Text>
        </TouchableOpacity>))
    }

    render() {
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss()
                }}
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={() => {
                                Keyboard.dismiss()
                                this.props.navigation.goBack()
                            }}
                            activeOpacity={0.8}
                            style={styles.iconContainer}>
                            <Image
                                    style={{ width: 30, height: 30 }}
                                    source={require('../../assets/icons/back.png')}
                                />
                            <Text style={styles.backText}>
                                Back
                        </Text>
                        </TouchableOpacity>
                        <Text style={styles.headerText}>
                            Choose a city
                    </Text>
                    </View>
                    <View style={styles.searchBar}>
                        <View style={styles.searchIconContainer}>
                        <Image
                                    style={{ width: 30, height: 30 }}
                                    source={require('../../assets/icons/search.png')}
                                />
                            
                        </View>
                        <TextInput
                            onChangeText={(text) => {
                                let arr = this.defaultCities.filter((el) => el.title.toLowerCase().indexOf(text.toLowerCase()) > -1)
                                this.setState({
                                    cities: arr
                                })
                            }}
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholder='Enter the name of the city'
                        />
                    </View>
                    <ScrollView 
                    keyboardShouldPersistTaps='always'
                    >
                        {this._renderCitiesList()}
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        height: 46,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        position: 'absolute',
        left: 18,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 15,
        fontWeight: '600'
    },
    backText: {
        color: '#3dc464',
        fontSize: 16,
    },
    searchBar: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 3,
        borderBottomColor: '#3dc464',
        marginHorizontal: 20
    },
    searchIconContainer: {
        position: 'absolute',
        left: 0
    },
    input: {
        flex: 1,
        marginLeft: 40,
        fontSize: 20,
    },
    cityItem: {
        height: 75,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        justifyContent: 'center',
    },
    itemText1: {
        marginLeft: 20,
        fontSize: 20
    },
    itemText2: {
        marginLeft: 20,
        color: 'rgba(0,0,0,0.1)'
    }
});
