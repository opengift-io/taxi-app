import { StyleSheet, PixelRatio } from 'react-native'
import { getHeightPercent } from './ratio'

export default StyleSheet.create({
  container: {},
  modalContainer: {
    backgroundColor: '#fff',
    flex: 1,
    backgroundColor: '#3dc464',
  },
  shadowContainer:{
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
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    marginHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 66,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerText:{

  },
  input: {
    height: 48,
    width: '70%'
  },
  inputOnly: {
    marginLeft: '15%'
  },
  touchFlag: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
    width: 42,
  },
  imgStyle: {
    flex: 1,
    width: '100%',
    // resizeMode: 'contain',
    // width: 25,
    // height: 19,
    // borderWidth: 1 / PixelRatio.get(),
    // borderColor: '#eee',
     opacity: 0.9,
     borderRadius: 21
  },
  emojiFlag: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    width: 30,
    height: 30,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: 'transparent',
    backgroundColor: 'transparent'
  },
  itemCountry: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  itemCountryFlag: {
    backgroundColor: 'silver',
    justifyContent: 'center',
    alignItems: 'center',
    height: 42,
    width: 42,
    borderRadius: 21
  },
  itemCountryName: {
    flex: 3,
  },
  countryName: {
    fontSize: getHeightPercent(2.2)
  },
  scrollView: {
    flex: 1
  },
  letters: {
    marginRight: 10,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  letter: {
    height: 25,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  letterText: {
    textAlign: 'center',
    fontSize: getHeightPercent(2.2)
  },
  closeButton: {
    height: 48,
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeButtonImage: {
    height: 24,
    width: 24,
    resizeMode: 'contain'
  },
  cancelButton:{
    height: 66,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  }
})
