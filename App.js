
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';

import TodoComponent from './components/TodoComponent';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAnthenticated : false,
    };
  }
  
  render() {
    return (
      <TodoComponent />
    );
  }
}


