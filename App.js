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
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
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
  componentDidMount() {

  }
  onLoginGoogle = async () =>  {
    try {
      await GoogleSignin.configure({
        webClientId: "208220183696-fobfqfp74kap567j8h3tnr5pojoj7j4r.apps.googleusercontent.com",
        offlineAccess: false,
      });
      const data = await GoogleSignin.signIn();

      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
      // login with credential
      const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);

      console.info(JSON.stringify(currentUser.user.toJSON()));
    } catch (e) {
      console.error(e);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', width: '75%', marginTop: 20 }}>
          <TouchableOpacity style={styles.bntLoginGoogle} onPress={this.onLoginGoogle.bind(this)}>
            <Text style={{ color: 'white' }}> Login With google </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bntLoginGoogle: {
    width: '70%',
    height: 30,
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',

  },
  container: {
    flex: 1,

    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

});
