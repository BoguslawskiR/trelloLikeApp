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
  View
} from 'react-native';
import Login from './components/login';

import { StackNavigator, AppNavigator } from 'react-navigation';
import Table from './components/table';
import Register from './components/register';
import TaskDetails from './components/taskdetails';
import TableList from './components/tableList';


export default class App extends Component<{}> {
  render() {
    return (
      <ModalStack />
    );
  }
}

const ModalStack = StackNavigator({
  Login: {
    screen: Login,
  },
  Table: {
    screen: Table
  },
  Register: {
    screen: Register,
  },
  TableList: {
    screen: TableList
  },
    TaskDetails: {
    screen: TaskDetails
    }
},
  {
    initialRouteName: 'TaskDetails',
  }
);
