import React, { Component } from 'react';
import Chart from '../components/Chart.js'
import { ScrollView, StyleSheet, Text, View, Image,Button,AsyncStorage  } from 'react-native';
import {ImageBackground, rgb } from 'react-native'
import { AreaChart, Grid, LineChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
const properties = require("svg-path-properties");
const lineLength = properties.svgPathProperties();
const axios = require('axios');
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import ChartThree from '../components/ChartThree.js'

/**
*The main class where we display the stock and its price with indicators fetching from Alpha Vantage API
* This page should include the index graph, indicator and new feature of the Deep learning predication of the data 
*/
export default class Home extends React.Component {
  static navigationOptions = {
    title: '',
    headerStyle: {
      backgroundColor: 'black',
      borderBottomColor: 'black',
    },
    headerTintColor: 'white',
  };
  constructor(props){
     super(props);
     this.state = {
       EMA:[],
       RSI:[],
       MACD:[],
       SMA:[],
       APIKey:'AC9J5P9B7S967OCH',
       APIKey2:'590IMXU31J3F94UP',
       APIKey3:'209PJSZ611ZJMIZW',
       newsAPIKey:'b8ea93c693cd4c5a9ea292d1c58e1762',
       myText: 'I\'m ready to get swiped!',
       gestureName: 'none',
       backgroundColor: 'black',
       graphColor : 'rgba(134, 65, 244, 0.8)',
       length:28
     }
  }
  onSwipeUp(gestureState) {
    this.setState({myText: 'You swiped up!'});
  }

  onSwipeDown(gestureState) {
    this.setState({myText: 'You swiped down!'});
  }

  onSwipeLeft(gestureState) {
    this.setState({myText: 'You swiped left!'});
  }

  onSwipeRight(gestureState) {
    this.setState({myText: 'You swiped right!'});
    this.props.navigation.navigate('Main')
  }

  onSwipe(gestureName, gestureState) {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    this.setState({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
        this.setState({});
        break;
      case SWIPE_DOWN:
        this.setState({});
        break;
      case SWIPE_LEFT:
        this.setState({graphColor: 'rgba(229, 46, 147, 0.6)' , length : 14});
        break;
      case SWIPE_RIGHT:
        this.setState({graphColor: 'rgba(229, 46, 147, 0.9)', length: 28});
        break;
    }
  }

  /**
  * Render function that is used to generate the main screen of the home page
  */
  render() {
    // generate the data for the screen
    const config = {
      velocityThreshold: 0.1,
      directionalOffsetThreshold: 30
    };
    var RSIString = []
    var MACDString = []
    var SMAString = []
    var EMAString = []

    console.log("Preparing data")
    Object.keys(this.state.SMA).map(key => (
        SMAString.push(parseFloat(this.state.SMA[key]['SMA']))))

    Object.keys(this.state.RSI).map(key => (
        RSIString.push(parseFloat(this.state.RSI[key]['RSI']))))

    Object.keys(this.state.MACD).map(key => (
        MACDString.push(parseFloat(this.state.MACD[key]['MACD']))))

    Object.keys(this.state.EMA).map(key => (
        EMAString.push(parseFloat(this.state.EMA[key]['EMA']))))

    console.log("Data Collect")
    return (
      <ScrollView style={styles.container}>
      <GestureRecognizer
        onSwipe={(direction, state) => this.onSwipe(direction, state)}
        onSwipeUp={(state) => this.onSwipeUp(state)}
        onSwipeDown={(state) => this.onSwipeDown(state)}
        onSwipeLeft={(state) => this.onSwipeLeft(state)}
        onSwipeRight={(state) => this.onSwipeRight(state)}
        config={config}
        style={{
          flex: 1,
          backgroundColor: this.state.backgroundColor
        }}
        >
      <Text style = {styles.TitleStyle}>Indicator Indexs</Text>
        <Text style = {styles.TitleStyle}>SMA Index</Text>
        <ChartThree data = {SMAString.slice(0,this.state.length).reverse()} color = {this.state.graphColor}/>
        <Text style = {styles.TitleStyle}>RSI Index</Text>
        <ChartThree data = {RSIString.slice(0,this.state.length).reverse()} color = {this.state.graphColor}/>
        <Text style = {styles.TitleStyle}>MACD Index</Text>
        <ChartThree data = {MACDString.slice(0,this.state.length).reverse()} color = {this.state.graphColor}/>
        <Text style = {styles.TitleStyle}>EMA Index</Text>
        <ChartThree data = {EMAString.slice(0,this.state.length).reverse()} color = {this.state.graphColor}/>
      </GestureRecognizer>
      </ScrollView>
    );
  }

/**
* This is the data API that fetch SMA data from the API and store locally
*/ 
  async getData2(){
     await axios.get('https://www.alphavantage.co/query?function=SMA&symbol=NDAQ&interval=weekly&time_period=10&series_type=open&apikey=7K0XU7O3574CGO82')
    .then((res) => {
      const dataSMA = res.data["Technical Analysis: SMA"];
      console.log("SMA get");
      if(dataSMA!=undefined){
        this.setState({
          SMA: dataSMA,
        })
      }else{
        console.warn("NO data!")
      }
    })
  }
/**
* This is the data API that fetch MACD data from the API and store locally
*/ 
  async getData3(){
    await axios.get('https://www.alphavantage.co/query?function=MACD&symbol=NDAQ&interval=daily&series_type=open&apikey=02WNO5KQV4LP8AVT')
    .then((res) => {
      const dataMACD = res.data["Technical Analysis: MACD"];
      console.log("MACD get");

      if(dataMACD!=undefined){
        this.setState({
          MACD: dataMACD,
        })
      }else{
        console.warn("NO data!")
      }
    })
  }
  /**
  * This is the data API that fetch RSI data from the API and store locally
  */
  async getData4(){
    await axios.get('https://www.alphavantage.co/query?function=RSI&symbol=NDAQ&interval=weekly&time_period=10&series_type=open&apikey=590IMXU31J3F94UP')
    .then((res) => {
      const dataRSI = res.data["Technical Analysis: RSI"];
      console.log("SMA RSI");

      if (dataRSI!=undefined){
        this.setState({
          RSI: dataRSI,
        })
      }else{
        console.warn("NO data!")
      }
    })
  }
    /**
  * This is the data API that fetch EMA data from the API and store locally
  */
  async getData5(){
    await axios.get('https://www.alphavantage.co/query?function=EMA&symbol=NDAQ&interval=weekly&time_period=10&series_type=open&apikey=209PJSZ611ZJMIZW')
    .then((res) => {
      const dataEMA = res.data["Technical Analysis: EMA"];
      console.log("EMA get");
      if(dataEMA!=undefined){
        this.setState({
          EMA: dataEMA,
        })
      }else{
        console.warn("NO data!")
      }
    })
  }
  /**
  * This is the function that continue to work after the component of the screens has already be loaded
  */
  componentDidMount(){
    this.getData2();
    this.getData3();
    this.getData4();
    this.getData5();
  }
}
 /**
 * This is the style sheet that contains all kind of styles
 */
const styles = StyleSheet.create({
  // The outmost style of the home screen
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal:5,
  },
  // The font style of the data on the TitleStyle
  TitleStyle:{
    flex: 1,
    color: 'white',
    fontSize: 40,
    fontFamily:'AvenirNextCondensed-DemiBold',
    paddingLeft:20,
    paddingBottom:15,
  },
  // The font style for the small data for index and percentage for change
  TitleStyle2:{
    flex: 1,
    color: 'white',
    fontSize: 30,
    fontFamily:'AvenirNextCondensed-DemiBold',
    paddingLeft:20
  },
  // The size of the icon
  IconStyle:{
    flex:1,
    flexDirection: 'row',
    paddingLeft:20
  },
});
