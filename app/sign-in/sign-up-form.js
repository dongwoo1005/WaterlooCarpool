/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');
var t = require('tcomb-form-native');
var colors = require('../colors');
var Settings = require('./settings');

// Parse.initialize("HaRnhRCe0lEiOqWuaX2iNwyn7Ac2KVkyaZgWg0L9","G8a7jYpsPb5kdF6eb3M6E8WjdUsAssCvguG9mOt6");

var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  AlertIOS,
} = React;

var Form = t.form.Form;

var Email = t.subtype(t.Str, function(email){
  var RFC5322reg = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
  return RFC5322reg.test(email);
});

var User = t.struct({
  email: Email,
  password: t.Str,
  fname: t.Str,
  lname: t.Str,
});

var options = {
  // auto: 'none'
   // order: ['username', 'email', 'phone', 'password'],
   fields: {
    email: {
      placeholder: 'abc@example.com',
      error: 'Insert a valid email',
      keyboardType: 'email-address'
    },
    password: {
      password: true,
      secureTextEntry: true,
    },
    fname: {
      label: 'First name',
      placeholder: 'First name',
      error: '',
      // help: 'No help for you'
    },
    lname: {
      label: 'Last name',
      placeholder: 'Last name',
      error: '',
    },
    // phone: {
    //   placeholder: '123-456-7890',
    //   keyboardType: 'number-pad'
    // }
  }
};

// default value for testing
var value = {
  email: 'woos931005@hotmail.com',
  password: 'password123!',
  fname: 'Dongwoo',
  lname: 'Son',
  // phone: '111-111-1111'
};

var SignUpForm = React.createClass({
  getDefaultProps:function(){
    return {
      onSignedIn: function(){},
    }
  },

  onPress: function () {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    var props = this.props;
    if (value) { // if validation fails, value will be null
      console.log(value.email, value.password, value.fname, value.lname); // value here is an instance of User
      var user = new Parse.User();
      user.set("username", value.email);
      user.set("email", value.email);
      user.set("password", value.password);
      user.set("fname", value.fname);
      user.set("lname", value.lname);
      user.signUp(null, {
        success: function(user) {
          props.onSignedIn();
          Settings.setToken(Parse.User.current().getSessionToken());
        },
        error: function(user, error) {
          // Show the error message somewhere and let the user try again.
          // alert("Error: " + error.code + " " + error.message);
          AlertIOS.alert(
            'Error:' + error.code,
            error.message,
            [
              {text: 'OK', onPress: () => console.log('Foo Pressed!')}
            ]
          )
        }
      });
    }
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
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
    // marginBottom: 80,
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

module.exports = SignUpForm;