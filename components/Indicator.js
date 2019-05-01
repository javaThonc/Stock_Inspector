import React, { Component } from 'react';
import {Dimensions, LayoutAnimation, StyleSheet, View, Text } from 'react-native';
import { AreaChart, Grid, LineChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
const properties = require("svg-path-properties");
const lineLength = properties.svgPathProperties();



/**
*Indicator is the indicator list that include indicators that will show on the home page for a stock
*/
export default class Indicator extends Component {
  render() {
  	return (
  		<View style = {styles.container}>
		  	<Text style = {styles.TitleStyle}> Indicators </Text>
		  	<View style ={styles.IndexContainer}>
				<Text style = {styles.Index}>SMA</Text>
		    	<Text style = {styles.Index}> {this.props.SMA} </Text>
		    </View>
		    <View></View>
		  	<View style ={styles.IndexContainer}>
		  		<Text style = {styles.Index}>RSI</Text>
		  		<Text style = {styles.Index}> {this.props.RSI} </Text>
		  	</View>
		  	<View style ={styles.IndexContainer}>
		  		<Text style = {styles.Index}>MACD</Text>
				<Text style = {styles.Index}> {this.props.MACD} </Text>
			</View>
		    <View style ={styles.IndexContainer}>
		    	<Text style = {styles.Index}>EMA</Text>
		    	<Text style = {styles.Index}> {this.props.EMA} </Text>
		    </View>
	    </View>
    )
  }
}

/**
*The style sheet that include all kinds of style that is needed
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop:30

  },

  TitleStyle:{
    flex: 1,
    color: 'white',
    fontSize: 40,
    fontFamily:'AvenirNextCondensed-DemiBold',
    paddingLeft:20
  },
  IndexContainer:{
  	flex:1,
  	flexDirection: 'row',
  	justifyContent: 'flex-end',
  	paddingLeft:15,
  	borderBottomColor: 'grey',
  	borderBottomWidth: 1,
  	paddingBottom: 10,
  	paddingTop: 10
  },
   IndexContainer2:{
  	flex:1,
  	flexDirection: 'row',
  	justifyContent: 'flex-end',
  	paddingLeft:15,
  	paddingTop: 10
  },
  Index:{
    flex: 1,
    color: 'white',
    fontSize: 28,
    fontFamily:'AvenirNextCondensed-Regular',
    paddingLeft:20
  },
});
