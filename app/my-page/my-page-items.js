'use strict';

var React = require('react-native');
var Parse = require('parse').Parse;
var colors = require('../colors');

var {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} = React;

var MyPageItems = React.createClass({
  getDefaultProps:function(){
    return {
      onSignOut: function(){},
    }
  },
  signOut:function(){
    console.log('Logging Out...')
    Parse.User.logOut().then(this.props.onSignOut());
  },
  render:function(){
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.signOut}>
          <Text>Touch to Sign Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundColor,
  },
})

module.exports = MyPageItems;