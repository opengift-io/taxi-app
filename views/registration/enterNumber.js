import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    Alert
} from 'react-native';
import CountryPicker from '../../components/react-native-country-picker-modal'
import API from '../../networking/api'
import { BarIndicator } from 'react-native-indicators';

export default class EnterNumber extends Component {
    api = new API()

    constructor(props) {
        super(props)
        this.state = {
            cca2: 'US',
            callingCode: '',
            countries: [],
            number: '',
            count: 0
        }
    }


    componentDidMount() {
        this.api.countries().then((data) => {
            console.log(data);
            
            let arr = []
            for (let i = 0; i < data._items.length; i++) {
                arr.push(data._items[i].code.toUpperCase())
            }
            this.setState({
                countries: arr
            })
        }).catch((error) => {
            console.log(error);

        })
    }

    _renderLoading() {
        return this.state.countries.length == 0 ?
            (<View style={styles.loadingContainer}>
                <BarIndicator
                    count={7}
                    color='#3dc464' />
            </View>) :
            null
    }

    _renderCountryPicker() {
        return this.state.countries.length == 0 ?
            null :
            (<CountryPicker
                countryList={this.state.countries}
                showCallingCode={true}
                closeable={true}
                onChange={(value) => {
                    this.setState({
                        callingCode: value.callingCode,
                        cca2: value.cca2,

                    });
                }}
                cca2={this.state.countries[0]}
                translation="eng"
            />)
    }

    next() {
        if(this.state.number.length>=7){
            this.props.navigation.navigate('enterCode', {
                cca2: this.state.cca2,
                callingCode: this.state.callingCode,
                number: this.state.number
            })
        }
        else{
            Alert.alert(
                '',
                'Short number !',
                [
                  {text: 'Close', onPress: () => {}, style: 'cancel'},
                ],
                { cancelable: false }
              )
        }
        
    }

    render() {
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss()
                }}
            >
                <View style={styles.container}>
                    <View style={{ flex: 1, zIndex: 1 }}>
                        <View style={styles.shadowContainer}>
                            <View style={styles.header}>
                                <Text style={styles.headerText}>
                                    Enter your number
                </Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <View
                                    style={styles.codeContainer}>
                                    <Text style={styles.codeText}>
                                        {'+' + this.state.callingCode}
                                    </Text>
                                </View>
                                {this._renderCountryPicker()}
                                <TextInput
                                    onChangeText={(text) => {
                                        this.state.number = text
                                    }}
                                    style={styles.input}
                                    underlineColorAndroid="transparent"
                                    placeholder='Phone number'
                                    keyboardType='numeric'
                                    maxLength={10}
                                />
                            </View>
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity
                                    onPress={() => {
                                        Keyboard.dismiss()
                                    }}
                                    style={styles.backButton}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.backButtonText}>
                                        Back
                                </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        Keyboard.dismiss()
                                        this.next()
                                    }}
                                    style={styles.nextButton}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.nextButtonText}>
                                        Next Step
                                </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.footer}>
                                <Text style={styles.footerText}>
                                    Lorem Ipsum is simply dummy text. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
                        </Text>
                            </View>
                        </View>
                    </View>
                    {this._renderLoading()}
                    {/* <TouchableOpacity 
                    onPress={()=>{
                        this.api.users('GET').then((res)=>{
                            console.log(res);
                            
                        })
                    }}
                    style={{
                        zIndex: 10,
                        width: 50,
                        height: 50,
                        position: 'absolute',
                        right: 0,
                        backgroundColor: 'red'
                        }}></TouchableOpacity> */}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height - StatusBar.currentHeight,
        backgroundColor: '#3dc464',
    },
    shadowContainer: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 19,
        borderRadius: 5,
        elevation: 20,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 6,
        shadowOpacity: 1,
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 66,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    headerText: {
        fontSize: 25
    },
    inputContainer: {
        marginTop: 28,
        height: 42,
        flexDirection: 'row',
        alignItems: 'center',
    },
    codeContainer: {
        width: '25%'
    },
    codeText: {
        fontSize: 20,
        marginRight: 18,
        textAlign: 'right',
        color: 'rgba(0,0,0,0.1)'
    },
    input: {
        flex: 1,
        paddingHorizontal: 16,
        fontSize: 20,
    },
    buttonsContainer: {
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 52,
        marginHorizontal: 25
    },
    backButton: {
        backgroundColor: '#fff',
        height: '100%',
        width: '40%',
        borderRadius: 5,
        borderColor: '#3dc464',
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButtonText: {
        fontSize: 20,
        color: 'rgba(0,0,0,0.2)'
    },
    nextButton: {
        backgroundColor: '#3dc464',
        height: '100%',
        width: '58%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nextButtonText: {
        fontSize: 20,
        color: '#fff'
    },
    footer: {
        paddingVertical: 20,
        paddingHorizontal: 25,
        backgroundColor: 'rgba(0,0,0,0.05)',
        position: 'absolute',
        width: '100%',
        bottom: 0,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    footerText: {
        color: 'rgba(0,0,0,0.1)',
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
