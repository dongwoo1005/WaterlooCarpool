'use strict';

var React = require('react-native');

var Badge = require('./badge');
var MyPageItems = require('./my-page-items');
var colors = require('../colors');

var {
  View,
  StyleSheet
} = React;

var MyPageScreen= React.createClass({
  getDefaultProps:function(){
    return {
      onSignOut: function(){},
    }
  },
  render:function(){
    return (
      <View>
        <Badge />
        <MyPageItems onSignOut={this.props.onSignOut}/>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundColor,
  },
})

module.exports = MyPageScreen;