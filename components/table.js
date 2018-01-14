import React, { Component } from 'react';
import {
  View, Text, Button, StyleSheet, Image, DeviceEventEmitter, Platform, NativeModules, NativeEventEmitter, Alert
} from 'react-native';
import * as _ from 'lodash';
export default class Table extends Component {

  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  componentDidMount() {
    console.log('test', this.props);
  }

  render() {
    return (
      <View>
        <Text>Test2</Text>
        <Text>Test</Text>
        <Text>Test</Text>
        <Text style={{ color: '#000' }}>Test</Text>
        <Text>Test</Text>
        <Text>Test</Text>
        <Text>Test</Text>
        <Button title={'test'} onPress={
          this.login.bind(this)
        }></Button>
      </View>
    );
  }

  login() {
    console.log('testttt');
    this.props.navigation.navigation('Login')
  }
}
