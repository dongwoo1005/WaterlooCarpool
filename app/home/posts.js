'use strict';

var React = require('react-native');
var colors = require('../colors');
var LoadingScreen = require('../common/loading-screen');
var PostEntries = require('./post-entries');

var {
  View,
  Text,
  StyleSheet,
  ListView
} = React;

var Posts = React.createClass({
  render: function(){
    return <PostEntries />
  }
});

module.exports = Posts;