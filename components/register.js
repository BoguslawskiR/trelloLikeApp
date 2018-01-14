import React, { Component } from 'react';
import {
  View, Text, Button, StyleSheet, Image, DeviceEventEmitter, Platform, NativeModules, NativeEventEmitter, Alert
} from 'react-native';
import { TextField } from 'react-native-material-textfield';

import * as _ from 'lodash';

export default class Name extends Component {

  state = {
    email: '',
    password: '',
    name: ''
  };

  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  componentDidMount() {
    console.log('test', this.props);
  }

  render() {
    let { email, password, name } = this.state;
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <View style={{ width: 300 }}>
          <TextField
            label='Name'
            value={name}
            onChangeText={(name) => this.setState({ name })}
          />
          <TextField
            label='Email'
            value={email}
            onChangeText={(email) => this.setState({ email })}
          />
          <TextField
            secureTextEntry={true}

            label='Password'
            value={password}
            onChangeText={(password) => this.setState({ password })}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: 300, marginTop: 16 }}>
          <Button title={'Register'} />
        </View>
      </View>
    );
  }

  login() {
    console.log('testttt');
    this.props.navigation.navigate('Table')
  }
}
