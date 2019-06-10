/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity,TextInput,Dimensions } from 'react-native';
import firebase from 'react-native-firebase';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAnthenticatedAnonymus : false,
      isAnthenticated : false,
      Email : '',
      Password : '',
      User : null
    };
  }
  onanonymusLogin = () => {
    firebase.auth().signInAnonymously()
      .then(() => {
        console.log('Login Successfully');
        this.setState({isAnthenticatedAnonymus : true});
      })
      .catch((error) => {
        console.log(error);
      })
  }
  OnLogin(){
    firebase.auth().signInWithEmailAndPassword(this.state.Email,this.state.Password)
    .then(()=>{
      console.log(`Sign Successfully`);
      this.setState({ isAnthenticated : true})
    })
    .catch((error) => console.log(error))
  }
  OnRegister(){
    firebase.auth().createUserWithEmailAndPassword(this.state.Email,this.state.Password)
    .then(( LoggedInUser )=>{
      console.log(`Register Successfully : ${JSON.stringify(LoggedInUser)} `);
      this.setState({ User : LoggedInUser})
    })
    .catch((error) => console.log(error))
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onanonymusLogin} >
          <Text style={styles.welcome}>Login Anonymus</Text>
        </TouchableOpacity>
        <Text>{ this.state.isAnthenticatedAnonymus == true ? 'login annymus Successfully' : '' }</Text>
        <Text>{ this.state.User != null ? 'Register Successfully' : '' }</Text>
        <Text>{ this.state.isAnthenticated == true ? 'Login Successfully' : '' }</Text>
        <TextInput
        autoCapitalize="none"
          style = {styles.txtInput}
          placeholder='Enter your Email'
          onChangeText = {(Email) => this.setState({ Email : Email })}
          value= {this.state.Email}
        >

        </TextInput>
        <TextInput
        autoCapitalize="none"
          secureTextEntry
          style = {styles.txtInput}
          placeholder='Enter your password'
          onChangeText = {(pass) => this.setState({ Password : pass })}
          value= {this.state.Password}
        >

        </TextInput>
        
        <View style={{flexDirection : 'row',justifyContent:'center',width : '75%'}}>
        <TouchableOpacity onPress={this.OnRegister.bind(this)}  style={styles.bntRegister}>
            <Text style ={{color:'white'}}>Register</Text>
          </TouchableOpacity>
        <TouchableOpacity onPress={this.OnLogin.bind(this)} style={styles.bntLogin} >
            <Text style ={{color:'white'}}>Login</Text>
          </TouchableOpacity>
         
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  txtInput : {
    width : '75%',
    height : 40,
    borderWidth:1,
    borderColor : '#6666',
    marginBottom : 10

  },
  container: {
    flex: 1,
    
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  bntLogin :{
    width : '30%',
    height: 30,
    backgroundColor:'green',
    alignItems:'center',
    justifyContent:'center',
    
    
  },
  bntRegister :{
    width : '30%',
    height: 30,
    backgroundColor:'tomato',
    alignItems:'center',
    justifyContent:'center',
    marginRight:20,
  }
});
