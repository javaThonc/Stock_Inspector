import React, { Component } from 'react';
import Chart from '../components/Chart.js'
import { ScrollView, StyleSheet, Text, View, Image,Button,AsyncStorage  } from 'react-native';
import {ImageBackground, rgb } from 'react-native'
import * as Animatable from 'react-native-animatable';
AnimatImg = Animatable.createAnimatableComponent(Image);
AnimatView = Animatable.createAnimatableComponent(View);
import { Divider } from 'react-native-elements';
import { SearchBar, ButtonGroup, Icon } from 'react-native-elements';
import Up from '../components/UpIcon.js'
import Indicator from '../components/Indicator.js'
import Ionicons from 'react-native-vector-icons/Ionicons';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
const axios = require('axios');

/**
*The main class where we display the stock and its price with indicators fetching from Alpha Vantage API
* This page should include the index graph, indicator and new feature of the Deep learning predication of the data 
*/
export default class Page extends React.Component {
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
       selectedIndex: 2,
       EMA:'188.2',
       RSI:'189.2',
       MACD:'342',
       SMA:'18.09',
       MetaData: [],
       Data:{        "2019-04-08": {
            "1. open": "88.6100",
            "2. high": "89.1400",
            "3. low": "87.9900",
            "4. close": "88.7600",
            "5. volume": "567432"
        },
        "2019-04-05": {
            "1. open": "89.4300",
            "2. high": "89.4800",
            "3. low": "88.1800",
            "4. close": "88.5900",
            "5. volume": "780396"
        },
        "2019-04-04": {
            "1. open": "89.3000",
            "2. high": "89.6300",
            "3. low": "88.6700",
            "4. close": "89.1800",
            "5. volume": "487822"
        },
        "2019-04-03": {
            "1. open": "89.6000",
            "2. high": "89.8800",
            "3. low": "89.0000",
            "4. close": "89.3000",
            "5. volume": "674096"
        },
        "2019-04-02": {
            "1. open": "88.3000",
            "2. high": "89.0900",
            "3. low": "88.1000",
            "4. close": "89.0100",
            "5. volume": "677776"
        },
        "2019-04-01": {
            "1. open": "88.2300",
            "2. high": "88.5700",
            "3. low": "87.6400",
            "4. close": "88.4000",
            "5. volume": "649044"
        },
        "2019-03-29": {
            "1. open": "87.2600",
            "2. high": "87.8300",
            "3. low": "86.9000",
            "4. close": "87.4900",
            "5. volume": "1221615"
        },},
       APIKey:'AC9J5P9B7S967OCH',
       APIKey2:'590IMXU31J3F94UP',
       APIKey3:'209PJSZ611ZJMIZW',
       newsAPIKey:'b8ea93c693cd4c5a9ea292d1c58e1762',
      myText: 'I\'m ready to get swiped!',
      gestureName: 'none',
      backgroundColor: 'black'
     }
     this.updateIndex = this.updateIndex.bind(this)
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
        this.setState({backgroundColor: 'black'});
        break;
      case SWIPE_DOWN:
        this.setState({backgroundColor: 'black'});
        break;
      case SWIPE_LEFT:
        this.setState({backgroundColor: 'black'});
        break;
      case SWIPE_RIGHT:
        this.setState({backgroundColor: 'yellow'});
        break;
    }
  }
  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
    if(selectedIndex==0){
      this.getData();
    }
    if(selectedIndex == 1){
      this.getDataWeek();
    }
    if(selectedIndex == 2){
      this.getDataMonth();
    }
  }
  /**
  * Render function that is used to generate the main screen of the home page
  */
  render() {
    // generate the data for the screen
    const { navigation } = this.props;
    const itemId = navigation.getParam('Name', 'NO-ID');
    var RSIString = this.state.RSI
    var MACDString = this.state.MACD
    var SMAString = this.state.SMA
    var EMAString = this.state.EMA
    console.log("Preparing data")
    if(RSIString == null || MACDString == null || SMAString == null || EMAString == null){
      console.warn("Wrong no returning data")
    }
    // generate button group for the button group
    const component1 = () => <Text style = {{color:'white'}}>Day</Text>
    const component2 = () => <Text style = {{color:'white'}}>Week</Text>
    const component3 = () => <Text style = {{color:'white'}}>Month</Text>
    const component4 = () => <Text style = {{color:'white'}}>Year</Text>

    // Initialize all kinds of the index that is needed for the main functionality
    const { selectedIndex } = this.state
    const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }, {element : component4}]
    var price = this.state.Data[Object.keys(this.state.Data)[0]]['4. close']
    var keyIntial = Object.keys(this.state.Data)[6]
    var initialPrice = this.state.Data[keyIntial]['4. close']
    var changePrice = parseFloat(price) - parseFloat(initialPrice);
    changePrice = changePrice.toFixed(2)
    var Percent = (changePrice/initialPrice)*100
    Percent = Percent.toFixed(2)
    // The UP icon for the main page
    var isUP = true
    if(changePrice<0){
      isUP = false
    }
    // if the price is no usual, cast the warning
    if(price==0 || Percent == 0){
      console.warn("Wrong no returning data : precent and price")
    }
    var RSIString_ = AsyncStorage.getItem('@MySuperStore:RSI');
    var MACDString_ = AsyncStorage.getItem('@MySuperStore:MACD');
    var SMAString_ = AsyncStorage.getItem('@MySuperStore:SMA');
    var EMAString_ =AsyncStorage.getItem('@MySuperStore:EMA');
        if(RSIString_ == null || MACDString_ == null || SMAString_ == null || EMAString_ == null){
      console.warn("Wrong no returning data")
    }
    const config = {
      velocityThreshold: 0.1,
      directionalOffsetThreshold: 30
    };
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
        <Text>{this.state.myText}</Text>
        <Text>onSwipe callback received gesture: {this.state.gestureName}</Text>
      <Text style = {styles.TitleStyle}>{itemId}</Text>
      <Text style = {styles.TitleStyle2}>${price.substring(0, price.length-2)}</Text>
      <View style = {styles.IconStyle}>
        <Up up = {isUP}/>
        <Text style={{color: isUP ? 'rgba( 107, 244, 169, 0.7)':'red',fontSize: 17,}}> {changePrice}</Text>
        <Text style={{color: isUP ? 'rgba( 107, 244, 169, 0.7)':'red',fontSize: 17,}}>({Percent}%)</Text>
        <Text style={{color: 'white',fontSize: 17,}}> last 6 months</Text>
      </View>
      <Chart data = {this.state.Data} up = {isUP}/>
      <ButtonGroup buttons={buttons} containerStyle={{height: 20, backgroundColor:'black'}} onPress={this.updateIndex} />
      <View>
        <Indicator RSI = {RSIString} MACD = {MACDString} SMA = {SMAString} EMA = {EMAString}/>
      </View>
      </GestureRecognizer>
      </ScrollView>
    );
  }

/**
*This is the data API that fetch daily data from the API and store locally
*/  
  async getData(){
     await axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=NDAQ&apikey=AC9J5P9B7S967OCH')
    .then((res) => {
      const dataInfo = res.data['Meta Data'];
      const data = res.data["Time Series (Daily)"];
      if(data!=undefined){
        this.setState({
          MetaData: dataInfo,
          Data: data,
        })
      }

    })
  }
/**
* This is the data API that fetch monthly data from the API and store locally
*/  
  async getDataMonth(){
     await axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=AAPL&apikey=590IMXU31J3F94UP')
    .then((res) => {
      const dataInfo = res.data['Meta Data'];
      const data = res.data["Monthly Time Series"];
      if(data!=undefined){
        this.setState({
          MetaData: dataInfo,
          Data: data,
        })
      }
    })
  }
/**
* This is the data API that fetch weekly data from the API and store locally
*/    
  async getDataWeek(){
     await axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=NDAQ&apikey=7K0XU7O3574CGO82')
    .then((res) => {
      const dataInfo = res.data['Meta Data'];
      const data = res.data["Weekly Adjusted Time Series"];
      if(data!=undefined){
        this.setState({
          MetaData: dataInfo,
          Data: data,
        })
      }
    })
  }
/**
* This is the data API that fetch SMA data from the API and store locally
*/ 
  async getData2(){
     await axios.get('https://www.alphavantage.co/query?function=SMA&symbol=NDAQ&interval=weekly&time_period=10&series_type=open&apikey=7K0XU7O3574CGO82')
    .then((res) => {
      const dataInfo = res.data['Meta Data'];
      const needDay = dataInfo['3: Last Refreshed'];
      const dataSMA = res.data["Technical Analysis: SMA"];
      const data = dataSMA[needDay];
      AsyncStorage.setItem('@MySuperStore:SMA', data['SMA']);
      this.setState({
        SMA: data['SMA'],
      })
    })
  }
/**
* This is the data API that fetch MACD data from the API and store locally
*/ 
  async getData3(){
    await axios.get('https://www.alphavantage.co/query?function=MACD&symbol=NDAQ&interval=daily&series_type=open&apikey=02WNO5KQV4LP8AVT')
    .then((res) => {
      const dataInfo = res.data['Meta Data'];
      const needDay = dataInfo['3: Last Refreshed'];
      const dataSMA = res.data["Technical Analysis: MACD"];
      const data = dataSMA[needDay];
      AsyncStorage.setItem('@MySuperStore:MACD', data['MACD']);
      this.setState({
        MACD: data['MACD'],
      })
    })
  }
  /**
  * This is the data API that fetch RSI data from the API and store locally
  */
  async getData4(){
    await axios.get('https://www.alphavantage.co/query?function=RSI&symbol=NDAQ&interval=weekly&time_period=10&series_type=open&apikey=590IMXU31J3F94UP')
    .then((res) => {
      const dataInfo = res.data['Meta Data'];
      const needDay = dataInfo['3: Last Refreshed'];
      const dataSMA = res.data["Technical Analysis: RSI"];
      const data = dataSMA[needDay];
      AsyncStorage.setItem('@MySuperStore:RSI', data['RSI']);
      this.setState({
        RSI: data['RSI'],
      })
    })
  }
    /**
  * This is the data API that fetch EMA data from the API and store locally
  */
  async getData5(){
    await axios.get('https://www.alphavantage.co/query?function=EMA&symbol=NDAQ&interval=weekly&time_period=10&series_type=open&apikey=209PJSZ611ZJMIZW')
    .then((res) => {
      const dataInfo = res.data['Meta Data'];
      const needDay = dataInfo['3: Last Refreshed'];
      const dataSMA = res.data["Technical Analysis: EMA"];
      const data = dataSMA[needDay];
      AsyncStorage.setItem('@MySuperStore:EMA', data['EMA']);
      console.log(needDay)
      this.setState({
        EMA: data['EMA'],
      })
    })
  }
  /**
  * This is the function that continue to work after the component of the screens has already be loaded
  */
  componentDidMount(){
    this.getDataMonth()
    // this.getData();
    // this.getData2();
    // this.getData3();
    // this.getData4();
    // this.getData5();
  }
}
 /**
 * This is the style sheet that contains all kind of styles
 */
const styles = StyleSheet.create({
  // The outmost style of the home screen
  container: {
    paddingTop:40,
    flex: 1,
    backgroundColor: 'black',
  },
  container2: {
    paddingRight:30,
    backgroundColor: 'black',
  },
  // The font style of the data on the TitleStyle
  TitleStyle:{
    flex: 1,
    color: 'white',
    fontSize: 40,
    fontFamily:'AvenirNextCondensed-DemiBold',
    paddingLeft:20
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

