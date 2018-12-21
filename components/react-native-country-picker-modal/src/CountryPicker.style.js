import { StyleSheet, PixelRatio } from 'react-native'
import { getHeightPercent } from './ratio'

export default StyleSheet.create({
  container: {},
  modalContainer: {
   // backgroundColor: '#fff',
    flex: 1,
    //backgroundColor: '#2ecc71',
  },
  shadowContainer:{
    flex: 1,
    backgroundColor: '#fff',
    margin: 15,
    elevation: 20,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
        width: 0,
        height: 0
    },
    shadowRadius: 20,
    shadowOpacity: 1,
    borderRadius: 4
  },
  contentContainer: {
    flex: 1,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(236, 240, 241)',
  },
  headerText:{
    color: 'rgb(44, 62, 80)',
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
    marginLeft: 18
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
    height: 31,
    width: 31,
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
    height: 50,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  itemCountryFlag: {
    backgroundColor: 'silver',
    justifyContent: 'center',
    alignItems: 'center',
    height: 31,
    width: 31,
    borderRadius: 21
  },
  itemCountryName: {
    flex: 3,
  },
  countryName: {
    //fontSize: getHeightPercent(2.2)
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: 'rgb(44, 62, 80)'
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
    marginRight: 15,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeButtonImage: {
    height: 20,
    width: 20,
  },
  cancelButton:{
    height: 66,
    backgroundColor: 'rgb(236, 240, 241)',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4
  },
  cancelButtonText:{
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: 'rgb(127,140,141)'
  },
  codeText:{
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: 'rgb(189,195,199)'
  }
})
