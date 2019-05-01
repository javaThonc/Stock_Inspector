import React, { Component } from 'react';
import {Dimensions, LayoutAnimation, StyleSheet, View, Text } from 'react-native';
import {LineChart } from 'react-native-chart-kit'
import * as shape from 'd3-shape'
const properties = require("svg-path-properties");
const lineLength = properties.svgPathProperties();



/**
* This is the chart component of the stock price 
* data is the input data of last a few period
*/
export default class Chart extends Component {
    render(){
      const graphData = []
      var input = this.props.data
      return(
          <LineChart
            onDataPointClick={({value, dataset, getColor}) =>
              console.log('test:',value)
            }
            data={{
              labels: ['Oct','Nov','Dec', 'Jan', 'Feb', 'Mar', 'April'],
              datasets: [{
                data: input.slice(0,14).reverse()
              }]
            }}
            width={Dimensions.get('window').width} // from react-native
            height={220}
            yAxisLabel={''}
            withInnerLines ={true}
            withOuterLines = {false}
            withDots = {true}
            chartConfig={{
              backgroundColor: 'black',
              backgroundGradientFrom: 'black',
              backgroundGradientTo: 'purple',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => 'white',
              style: {
                borderRadius: 16
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
         />
      )
    }
}
/**
*The style sheet that include all kinds of style that is needed
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // align at the bottom of the container so when animated it rises to the top
    justifyContent: 'flex-end',
  },
});
