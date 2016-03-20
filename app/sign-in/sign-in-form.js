'use strict';

var React = require('react-native');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');
var t = require('tcomb-form-native');

var colors = require('../colors');
var Main = require('../../main');
var Index = require('../../index.ios');
var Settings = require('./settings');


var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  AlertIOS,
  NavigatorIOS,
} = React;

var Form = t.form.Form;

var Email = t.subtype(t.Str, function(email){
  var RFC5322reg = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
  return RFC5322reg.test(email);
});

var User = t.struct({
  email: Email,
  password: t.Str,
});

var options = {
  fields: {
    email: {
      placeholder: 'abc@example.com',
      error: 'Insert a valid email',
      keyboardType: 'email-address'
    },
    password: {
      password: true,
      secureTextEntry: true,
      placeholder: 'P@ssword123!'
    },
  }
};

var value = {
  email: 'woos931005@hotmail.com',
  password: 'password123!'
};

var SignInForm = React.createClass({
  getDefaultProps:function(){
    return {
      onSignedIn: function(){},
    }
  },
  onPress: function() {
    var value = this.refs.form.getValue();
    var props = this.props;
    if (value){
      Parse.User.logIn(value.email, value.password, {
        success: function(user){
          props.onSignedIn();
          Settings.setToken(Parse.User.current().getSessionToken());
        },
        error: function(user, error){
          // The login failed. Check error to see why.
          console.log('error', user, error.code, error.message);
          AlertIOS.alert(
            'Login Failed',
            'Please try again with registered email and password',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed!')},
            ]
          )
        }
      });
    }
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>
        <View style={styles.container}>
          {/* display */}
          <Form
            ref="form"
            type={User}
            options={options}
            value={value}
          />
          <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableHighlight>
        </View>
      </View>

    );
  }
});

var styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 80,
    color: '#181818'
  },
  buttonText: {
    fontSize: 18,
    color: colors.myGreen,
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#ffffff',
    // borderColor: '#48BBEC',
    borderWidth: 1.5,
    borderRadius: 8,
    borderColor: colors.myGreen,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

module.exports = SignInForm;

