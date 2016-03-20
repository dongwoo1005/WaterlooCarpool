'use strict';

var React = require('react-native');

var Parse = require('parse').Parse;
var ParseReact = require('parse-react');
Parse.initialize("HaRnhRCe0lEiOqWuaX2iNwyn7Ac2KVkyaZgWg0L9", "G8a7jYpsPb5kdF6eb3M6E8WjdUsAssCvguG9mOt6");

var SignIn = require('./app/sign-in/sign-in-screen');
var Main = require('./main');
var colors = require('./app/colors');
var Settings = require('./app/sign-in/settings');

var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  // AlertIOS,
} = React;

var carpool = React.createClass({
  getInitialState:function(){
    return {
      currUserSession: null,
    }
  },
  componentWillMount:function(){
    Settings.getToken().then(this._checkSignedIn);
  },
  _checkSignedIn:function(session){
    this.setState({
      currUserSession: session
    });
    Parse.User.become(session,{
      success: function(){
        console.log('token login success: ', Parse.User.current().id);
        // AlertIOS.alert(
        //   'Foo Title',
        //   Parse.User.current().getEmail(),
        //   [
        //     {text: 'Foo', onPress: () => console.log('Foo Pressed!')},
        //     {text: 'Bar', onPress: () => console.log('Bar Pressed!')},
        //   ]
        // );
      },
      error: function(error){
        console.log('error', error.code, error.message);
      }
    });
  },
  _onSignIn:function(){
    this.setState({
      currUserSession: Parse.User.current().getSessionToken()
    });
  },
  _onSignOut:function(){
    this.setState({
      currUserSession: null
    });
    Settings.removeToken();
  },
  render: function() {
    if (this.state.currUserSession) {
      return (
        <Main onSignOut={this._onSignOut}/>
      );
    } else {
      return (
        <SignIn onSignedIn={this._onSignIn}/>
      );
    }
  }
});

var styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
})

module.exports = carpool;
AppRegistry.registerComponent('carpool', () => carpool);
