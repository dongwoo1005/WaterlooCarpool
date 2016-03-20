'use strict';

var React = require('react-native');
var colors = require('../colors');

var {
  View,
  Text,
  StyleSheet
} = React;

var ChatApp = React.createClass({
  render:function(){
    return (
      <View style={styles.container}>
        <Text>Chat Screen</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundColor,
  },
})

module.exports = ChatApp;