import React, { Component } from 'react';
import { ScrollView, StyleSheet,Text, View, Image, Button, TouchableHighlight} from 'react-native';
import {ImageBackground, rgb } from 'react-native'
import { AppRegistry, SectionList , FlatList, Linking,AsyncStorage} from 'react-native';
import * as Animatable from 'react-native-animatable';
AnimatImg = Animatable.createAnimatableComponent(Image);
AnimatView = Animatable.createAnimatableComponent(View);
AnimatButton = Animatable.createAnimatableComponent(Button);
import { createStackNavigator, TabNavigator, SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native'
import { SearchBar,ListItem } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
const axios = require('axios');

// Default class that represent the main components  in the
// Repositories page
export default class Stock extends React.Component {
  static navigationOptions = {
    title: '',
    headerStyle: {
      backgroundColor: 'black',
      borderBottomColor: 'black',
    },
    headerTintColor: 'white',
  };
  // constructor that has a default information because it must have one
  constructor(props){
     super(props);
     this.state = {
       search: '',
       data: {"bestMatches":[
        {
            "1. symbol": "AAPL",
            "2. name": "Apple Inc.",
            "3. type": "Equity",
            "4. region": "United States",
            "5. marketOpen": "09:30",
            "6. marketClose": "16:00",
            "7. timezone": "UTC-04",
            "8. currency": "USD",
            "9. matchScore": "0.8889"
        },
        {
            "1. symbol": "APLE",
            "2. name": "Apple Hospitality REIT Inc.",
            "3. type": "Equity",
            "4. region": "United States",
            "5. marketOpen": "09:30",
            "6. marketClose": "16:00",
            "7. timezone": "UTC-04",
            "8. currency": "USD",
            "9. matchScore": "0.8000"
        },]
      }
    };

  }
 /**
  * The search function that is necessary for the search functionality
  */
  updateSearch = search => {
    console.log("Start searching")
    this.setState({ search });
  };
  /**
  * Render function that is used to generate the main screen of the home page
  */
  render() {
    const { search } = this.state;
    this.getData()
    return (
      <ScrollView style={styles.container}>
        <Text style = {styles.TitleStyle}>For More Stocks</Text>
        <SearchBar
          placeholder="Look For More Stocks..."
          onChangeText={this.updateSearch}
          value={search}
          searchIcon = {false}
        />
        <View >
        {
          this.state.data['bestMatches'].map((item, i) => (
            <ListItem
              key={i}
              title={item['1. symbol']}
              subtitle={item['2. name']}
              contentContainerStyle={{ backgroundColor: 'black' }}
              containerStyle = {{backgroundColor: 'black' }}
              subtitleStyle= {{color: 'white'}}
              titleStyle = {{color: 'white'}}
              onPress={() => {
                this.props.navigation.navigate('Page', {
                  Name:item['1. symbol'],
                })
              }}
            />
          ))
        }
      </View>
      </ScrollView>
    );
  }

  // Fetch data from API from Alpha Vantage API
  async getData(){
    try {
      console.log("Start fetching data")
      const response = await axios.get("https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords="+this.state.search+"&apikey=AC9J5P9B7S967OCH")
      const dataAPI = response.data;
      if("Error Message" in dataAPI || "Note" in dataAPI){
        //not set
      }else{
        this.setState({
          data:dataAPI,
        })
      }
      
    }catch(error){
      console.error(error);
    }
  }
  // Fetch data after creating the data
  componentDidMount(){
    this.getData();
  }
}
const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: 'black',
  },
  TitleStyle:{
    flex: 1,
    color: 'white',
    fontSize: 40,
    fontFamily:'AvenirNextCondensed-DemiBold',
    paddingLeft:10
  },
  userIconStyle:{
    width: 260,
    height: 260,
    backgroundColor: 'transparent',
    borderColor: 'rgb(245,245,  240)',
    borderWidth: 10,
    borderRadius:130,
  },
  userNameStyle:{
    paddingTop: 21,
    paddingLeft: 90,
    backgroundColor: 'transparent',
    fontSize: 20,
    textAlign:'right',
    justifyContent: 'flex-end',
  },

});
