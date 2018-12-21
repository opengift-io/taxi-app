import React from 'react'
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableNativeFeedback,
  AsyncStorage
} from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux'

const routes = ['requestHistory', 'nearbyDrivingsNav']
const icons = [require('../assets/icons/route.png')]

function navigate(props, routeName) {
  props.navigation.navigate(routeName)
}

function logout(){
  return AsyncStorage.removeItem('phone')
}

const DrawerContent = (props) => (
  <ScrollView style={{ backgroundColor: '#27ae60' }}>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <View style={styles.header}>
        <View style={styles.photoContainer}>
          <Image
            style={styles.image}
            source={require('../assets/images/1.png')}
          />
        </View>
        <View>
          <Text style={styles.infoText}>
            {props.user.info.firstname}{'\n'}
            +{props.user.info.phone}{'\n'}
            {props.user.info.lastname}
          </Text>
        </View>
      </View>
      {routes.map((route, i) => (<TouchableNativeFeedback
        key={i}
        onPress={() => {
          navigate(props, route)
        }}
      >
        <View style={styles.item}>
          <Image
            style={styles.icon}
            source={icons[0]}
          />
          <Text style={styles.itemText}>
            {route}
          </Text>
        </View>
      </TouchableNativeFeedback>))}
      <TouchableNativeFeedback
        onPress={() => {
          logout().then(()=>{
            props.dispatch({type: 'SET_LOGIN', value: false})
          })
          .catch((error)=>{
            console.log(error)
          })
        }}
      >
        <View style={styles.item}>
          <Image
            style={styles.icon}
            source={icons[0]}
          />
          <Text style={styles.itemText}>
            Log Out
          </Text>
        </View>
      </TouchableNativeFeedback>
    </SafeAreaView>
  </ScrollView>
);

export default connect(
  ({user})=>({user})
)(DrawerContent)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 43,
    borderBottomWidth: 1,
    borderBottomColor: '#2ecc71'
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 20
  },
  itemText: {
    marginLeft: 15,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#fff'
  },
  header: {
    height: 90,
    backgroundColor: '#2ecc71',
    alignItems: 'center',
    flexDirection: 'row',
  },
  photoContainer: {
    marginLeft: 15,
    height: 55,
    width: 55,
    borderRadius: 28,
  },
  image: {
    flex: 1,
    width: '100%',
    borderRadius: 28
  },
  infoText: {
    marginLeft: 11,
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: '#fff',
    lineHeight: 16
  }
});