import React, { Component } from 'react';
import {
  View, Text, Button, StyleSheet, Image, DeviceEventEmitter, Platform, NativeModules, NativeEventEmitter, Alert
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { serverURL } from './shares';
import * as _ from 'lodash';
import Header from './header';
export default class Login extends Component {

  state = {
    email: '',
    password: ''
  };

  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  componentDidMount() {
    console.log('test', this.props);
  }

  render() {
    let { email, password } = this.state;
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <View style={{ width: 300 }}>
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
          <Button title={'Login'} onPress={this.login.bind(this)} />
          <Button title={'Register'} onPress={this.register.bind(this)} />
        </View>
      </View>
    );
  }

  login() {
    console.log('TEST');
    fetch(`${serverURL}/users/auth/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.email,
        password: this.state.password,
      }),
    }).then(response => response.json())
      .then((res) => {
        if (res.token) {
          this.props.navigation.navigate('TableList', { token: res.token })
        }

      }).catch((err) => {
        console.log(err)
      });
    //
  }

  register() {
    this.props.navigation.navigate('Register')
  }
}
