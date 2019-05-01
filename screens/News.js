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
import Up from '../components/UpIcon.js'
const axios = require('axios');

/**
* This is the news page tha will show the daily news we need for the stock market
* Add animation to the page so that it looks different
*/
export default class News extends React.Component {
  // This is the navigation operation that is 
  static navigationOptions = {
    title: '',
    headerStyle: {
      backgroundColor: 'black',
      borderBottomColor: 'black',
    },
    headerTintColor: 'white',
  };
  // This is the constructor for the news page, data is the data that is needed before we fetch the real data from the API
  constructor(props){
     super(props);
     this.state = {
       data: [
         {
            "author": "Loren Grush",
            "content": "Early Wednesday morning, a huge collaboration of scientists are expected to release the first images of the event horizon of a black hole, constructed from data gathered by observatories all over the globe. Combined, the telescopes created a virtual telescope… [+4458 chars]",
            "description": "A huge collaboration of scientists are expected to release the first images of the event horizon of a black hole, constructed from data gathered by observatories all over the globe. Combined, the telescopes created a virtual telescope as big as the Earth itse…",
            "publishedAt": "2019-04-09T18:12:43Z",
            "source":  {
              "id": "the-verge",
              "name": "The Verge",
            },
            "title": "Scientists are about to unveil the first images of a supermassive black hole - The Verge",
            "url": "https://www.theverge.com/2019/4/9/18301276/event-horizon-telescope-supermassive-black-holes-images",
            "urlToImage": "https://cdn.vox-cdn.com/thumbor/UWLSK9d6P5Dg_iP2PeCTaSUYxso=/0x38:1920x1043/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/16019239/PIA16695_large.jpg",
        },
        {
            "author": "Elisha Fieldstadt, Tom Winter",
            "content": "Get breaking news alerts and special reports. The news and stories that matter, delivered weekday mornings. SUBSCRIBE April 9, 2019, 5:53 PM GMT / Updated April 9, 2019, 6:19 PM GMT By Elisha Fieldstadt and Tom Winter Actress Lori Loughlin and her husband are… [+2232 chars]",
            "description": "Lori Loughlin was among 16 parents indicted on fraud, money laundering charges in the college admissions scheme.",
            "publishedAt": "2019-04-09T17:53:00Z",
            "source":  {
              "id": "nbc-news",
              "name": "NBC News",
            },
            "title": "Lori Loughlin among 16 parents indicted on new charges in college admissions scheme - NBC News",
            "url": "https://www.nbcnews.com/news/us-news/lori-loughlin-among-16-parents-indicted-new-charges-college-admissions-n992561",
            "urlToImage": "https://media2.s-nbcnews.com/j/newscms/2019_15/2815341/190409-lori-loughlin-ew-145p_fb29ccb3ec5bd2e9f33c70aaa7125af8.nbcnews-fp-1200-630.jpg",
        },]
      
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
  * Render function that generate the screen of the app
  */
  render() {
    return (
      <ScrollView style={styles.container}>
         <Text style = {styles.TitleStyle}>Daily News</Text>
         <View>
           {
              this.state.data.map((item, i) => (
                <ListItem
                  key={i}
                  title={item['title']}
                  subtitle={item['author']}
                  contentContainerStyle={{ backgroundColor: 'black' }}
                  containerStyle = {{backgroundColor: 'black' }}
                  subtitleStyle= {{color: 'white', fontFamily:'AvenirNext-HeavyItalic'}}
                  titleStyle = {{color: 'white',  fontFamily:'AvenirNext-Regular',}}
                  leftIcon = {{name:'flight-takeoff', color :'white'}}
                  onPress = {()=>{Linking.openURL(item['url'])}}
                />
              ))
            }
        </View> 
      </ScrollView>
    );
  }
  /**
  * This function is used to get data from the news api using the OAuth token 
  */

  async getData(){
    try {
      const response = await axios.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=b8ea93c693cd4c5a9ea292d1c58e1762")
      const dataAPI = response.data.articles;
      // If error, catch
      if("Error Message" in dataAPI || "Note" in dataAPI){
          console.warn("Receive error message!")
      }else{
        console.log("receive data")
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
/**
*The style sheet that include all kinds of style that is needed
*/
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
