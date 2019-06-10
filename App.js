/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import firebase from 'react-native-firebase';
import { AccessToken,LoginManager , LoginButton } from 'react-native-fbsdk';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnthenticatedAnonymus: false,
      isAnthenticated: false,
      Email: '',
      Password: '',
      User: null
    };
  }
  onanonymusLogin = () => {
    firebase.auth().signInAnonymously()
      .then(() => {
        console.log('Login Successfully');
        this.setState({ isAnthenticatedAnonymus: true });
      })
      .catch((error) => {
        console.log(error);
      })
  }
  OnLogin() {
    firebase.auth().signInWithEmailAndPassword(this.state.Email, this.state.Password)
      .then(() => {
        console.log(`Sign Successfully`);
        this.setState({ isAnthenticated: true })
      })
      .catch((error) => console.log(error))
  }
  OnRegister() {
    firebase.auth().createUserWithEmailAndPassword(this.state.Email, this.state.Password)
      .then((LoggedInUser) => {
        console.log(`Register Successfully : ${JSON.stringify(LoggedInUser)} `);
        this.setState({ User: LoggedInUser })
      })
      .catch((error) => console.log(error))
  }
  onLoginFacebook(){
    LoginManager
      .logInWithReadPermissions(['public_profile','email'])
      .then((result) => {
        if(result.isCancelled){
          return Promise.reject(new Error('The user Cancelled the request'))// co nghia laf login khong thanh cong
        }
        //login thanh cong
        console.log(`Login success width Permission : ${result.grantedPermissions.toString()}`);
        this.setState({ isAnthenticated: true })
        return AccessToken.getCurrentAccessToken();
        
      })
      .then(data =>{
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
        return firebase.auth().signInWithCredential(credential);
      })
      .then((currentUser) => {
        console.log(`Facebook Login width user : ${JSON.stringify(currentUser.toJSON())}`);
      })
      .catch((error) => {
        console.log(`Facebook Login fail width user : ${error}`);
      })
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onanonymusLogin} >
          <Text style={styles.welcome}>Login Anonymus</Text>
        </TouchableOpacity>
        <Text>{this.state.isAnthenticatedAnonymus == true ? 'login annymus Successfully' : ''}</Text>
        <Text>{this.state.User != null ? 'Register Successfully' : ''}</Text>
        <Text>{this.state.isAnthenticated == true ? 'Login Successfully' : ''}</Text>
        <TextInput
          autoCapitalize="none"
          style={styles.txtInput}
          placeholder='Enter your Email'
          onChangeText={(Email) => this.setState({ Email: Email })}
          value={this.state.Email}
        >

        </TextInput>
        <TextInput
          autoCapitalize="none"
          secureTextEntry
          style={styles.txtInput}
          placeholder='Enter your password'
          onChangeText={(pass) => this.setState({ Password: pass })}
          value={this.state.Password}
        >

        </TextInput>

        <View style={{ flexDirection: 'row', justifyContent: 'center', width: '75%' }}>
          <TouchableOpacity onPress={this.OnRegister.bind(this)} style={styles.bntRegister}>
            <Text style={{ color: 'white' }}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.OnLogin.bind(this)} style={styles.bntLogin} >
            <Text style={{ color: 'white' }}>Login</Text>
          </TouchableOpacity>

        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', width: '75%' ,marginTop:20 }}>
          <TouchableOpacity style={styles.bntLoginFacebook} onPress={this.onLoginFacebook.bind(this)}>
            <Text style={{ color: 'white' }}> Login Width Facebook </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bntLoginFacebook :{
    width: '70%',
    height: 30,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',

  },  
  txtInput: {
    width: '75%',
    height: 40,
    borderWidth: 1,
    borderColor: '#6666',
    marginBottom: 10

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
  bntLogin: {
    width: '30%',
    height: 30,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',


  },
  bntRegister: {
    width: '30%',
    height: 30,
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  }
});
