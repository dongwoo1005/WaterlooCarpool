'use strict';

var React = require('react-native');
var {
  StyleSheet,
} = React;

var colors = require('../colors');

var styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },

  label: {
    fontSize: 12,
    color: colors.textColor,
    paddingBottom: 5,
    // paddingLeft: 15,
  },

  innerBox: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

module.exports = styles;