import React, { Component } from 'react';
import {
  View, Text, Button, StyleSheet, Image, DeviceEventEmitter, Platform, NativeModules, NativeEventEmitter, Alert, TouchableOpacity
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import * as _ from 'lodash';
import { Icon } from 'react-native-elements'
import Header from './header';
import { serverURL } from './shares';

export default class Settings extends Component {

  state = {
    username: '',
    tableName: '',
    listName: '',
  };

  static navigationOptions = ({ navigation }) => {
    console.log(navigation);
    return ({
      header: <Header name={navigation.state.params.table.name} table={navigation.state.params.table} token={navigation.state.params.token} navigation={navigation}></Header>
    })
  };

  componentWillMount() {
    console.log('test', this.props);
  }

  render() {
    let { username, tableName, listName } = this.state;

    return (
      <View>
        <TextField
          label='Username'
          value={username}
          onChangeText={(username) => this.setState({ username })}
        />
        <View>
          <Button title={'Add member'} onPress={() => this.addMember()} />
          <Button title={'Remove member'} onPress={() => this.addMember()} />
        </View>
        <TextField
          label='Table Name'
          value={tableName}
          onChangeText={(tableName) => this.setState({ tableName })}
        />
        <Button title={'Add desk'} onPress={() => this.addDesk(tableName)} />
        <TextField
          label='List Name'
          value={listName}
          onChangeText={(listName) => this.setState({ listName })}
        />
        <Button title={'Add list'} onPress={() => this.addList(listName)} />
        <Button title={'Logout'} onPress={() => this.props.navigation.navigate('Login')} />

      </View>

    );
  }

  addMember() {
    console.log()
    fetch(`${serverURL}/boards/${this.props.navigation.state.params.table.id}/add_user/${this.state.username}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `JWT ${this.props.navigation.state.params.token}`
      }
    }).then((res) => console.log(res));
  }

  addDesk(tableName) {
    console.log(tableName, this.props.navigation.state.params.token);
    fetch(`${serverURL}/boards/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `JWT ${this.props.navigation.state.params.token}`
      },
      body: JSON.stringify({
        name: tableName
      }),
    }).then((res) => {
      this.setState({ tableName: '' })
      console.log(res);
    })
      .catch((err) => console.log(err))
  }

  addList(listName) {
    fetch(`${serverURL}/boards/${this.props.navigation.state.params.table.id}/lists`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `JWT ${this.props.navigation.state.params.token}`
      },
      body: JSON.stringify({
        name: listName
      }),
    }).then((res) => {
      this.setState({ listName: '' })
      console.log(res);
    })
      .catch((err) => console.log(err))
  }

}

const styles = StyleSheet.create({

})
