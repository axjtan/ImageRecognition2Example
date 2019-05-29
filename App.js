/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { TfImageRecognition } from 'react-native-tensorflow';

export default class App extends React.Component {

  constructor() {
    super()
    //this.image1 = require('./assets/sealions.jpg');
    this.image1 = require('./assets/tele.jpg');
    this.image2 = require('./assets/dumbbell.jpg');
    this.state = {result: ""}
  }

  componentDidMount() {
    this.recognizeImage()
  }

  async recognizeImage() {
    //const text = {uri: 'assets:/tensorflow_labels.txt'};
    //const graph = {uri: 'assets:/tensorflow_inception_graph.pb'};
    const tfImageRecognition = new TfImageRecognition({
      //model: graph,
      //labels: text
      model: 'file://tensorflow_inception_graph.pb',
      labels: 'file://tensorflow_labels.txt'
    })
    
    try {

      results = await tfImageRecognition.recognize({
        image: this.image1
      })
      resultText = `Name: ${results[0].name} - Confidence: ${results[0].confidence}`
      this.setState({result1: resultText})
      console.log("Image 1")
      console.log(results[0].id)

      results = await tfImageRecognition.recognize({
        image: this.image2
      })
      resultText = `Name: ${results[0].name} - Confidence: ${results[0].confidence}`
      this.setState({result2: resultText})
      console.log("Image 2")

      await tfImageRecognition.close()
      console.log("Close")
    } catch(err) {
      alert(err)
    }
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Image source={this.image1} style={styles.image} />
        <Text style={styles.results}>
          {this.state.result1}
        </Text>
        <Image source={this.image2} style={styles.image} />
        <Text style={styles.results}>
          {this.state.result2}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  results: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  image: {
    width: 150,
    height: 100
  },
});
