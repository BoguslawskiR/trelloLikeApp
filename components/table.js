import React, { Component } from 'react';
import {
  View, Text, Button, StyleSheet, Image, DeviceEventEmitter, Platform, NativeModules, NativeEventEmitter, Alert, TouchableOpacity
} from 'react-native';
import * as _ from 'lodash';
import Header from './header';
export default class Table extends Component {

  state = {
    lists: []
  }

  static navigationOptions = ({ navigation }) => ({
    header: <Header name={navigation.state.params.table.name} navigation={navigation}></Header>
  });

  componentWillMount() {
    console.log(this.props);

    fetch(`http://192.168.8.102:8000/boards/${this.props.navigation.state.params.table.id}/lists`, {
      type: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `JWT ${this.props.navigation.state.params.token}`
      },
    }).then((res) => res.json())
      .then((jsonLists) => {
        let lists = jsonLists;
        this.setState({ lists: lists });
        console.log(this.state.lists)
      })
  }

  render() {
    return (
      <View>
        {this.lists()}
      </View>
    );
  }

  login() {
    console.log('testttt');
    this.props.navigation.navigate('Login')
  }

  lists() {
    console.log(this.state.lists)
    return (
      this.state.lists.map(list => (
        <View key={list.id}>
          <Text style={styles.listName}>{list.name}</Text>
          {list.tasks.map((task) => (
            <TouchableOpacity key={task.id} style={styles.item} onPress={() => {
              this.props.navigation.navigate('TaskDetails', {
                token: this.props.navigation.state.params.token,
                tableId: this.props.navigation.state.params.table.id,
                listId: list.id,
                taskId: task.id,
              })
            }}>
              <Text>{task.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))
    )
  }
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
  },
  itemName: {
    fontSize: 22
  },
  listName: {
    fontSize: 18,
    color: '#2196F3',
    margin: 16,
  }
})
