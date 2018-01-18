import React, { Component } from 'react';
import {
  View, Text, Button, StyleSheet, Image, DeviceEventEmitter, Platform, NativeModules, NativeEventEmitter, Alert, TouchableOpacity, ScrollView
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
      header: <Header name={navigation.state.params.table ? navigation.state.params.table.name : 'Settings'} table={navigation.state.params.table} token={navigation.state.params.token} navigation={navigation}></Header>
    })
  };

  componentWillMount() {
    console.log('test', this.props);
  }

  render() {
    let { username, tableName, listName } = this.state;

    return (

      this.props.navigation.state.params.table ? <ScrollView style={styles.view}>
        <TextField
          label='Username'
          value={username}
          onChangeText={(username) => this.setState({ username })}
        />
        <View style={styles.row}>
          <View style={styles.button}>
            <Button style={styles.button} title={'Add member'} onPress={() => this.addMember()} />
          </View>
          <View style={styles.button}>
            <Button style={styles.button} title={'Remove member'} onPress={() => this.addMember()} />
          </View>
        </View>
        <TextField
          label='Table Name'
          value={tableName}
          onChangeText={(tableName) => this.setState({ tableName })}
        />
        <View style={styles.button} >
          <Button style={styles.button} title={'Add desk'} onPress={() => this.addDesk(tableName)} />
        </View>
        <TextField
          label='List Name'
          value={listName}
          onChangeText={(listName) => this.setState({ listName })}
        />
        <View style={styles.button}>
          <Button style={styles.button} title={'Add list'} onPress={() => this.addList(listName)} />
        </View>
        <View style={styles.button}>
          <Button style={styles.button} title={'Logout'} onPress={() => this.props.navigation.navigate('Login')} />
        </View>

      </ScrollView> :
        <View style={styles.view}>
          <TextField
            label='Table Name'
            value={tableName}
            onChangeText={(tableName) => this.setState({ tableName })}
          />
          <View style={styles.button}>
            <Button style={styles.button} title={'Add desk'} onPress={() => this.addDesk(tableName)} />
          </View>
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
    }).then((res) => this.setState({ username: '' }));
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
  button: {
    width: 140,
    marginTop: 8,
    marginBottom: 8
  },
  view: {
    paddingLeft: 16,
    paddingRight: 16
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
