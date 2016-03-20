"use strict";

var React = require('react-native');
var {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} = React;

var globalStyles = require('./post-global-styles');
var PriceSelector = require('./price-selector');

var deviceWidth = require('Dimensions').get('window').width;


var PriceRangeSelector = React.createClass({

  getDefaultProps: function () {
    return {
      onChange: function () {},
      value: []
    };
  },
  handleStartChange: function (value) {
    this.props.onChange('priceRange', [value, this.props.value[1]]);
  },

  handleEndChange: function (value) {
    this.props.onChange('priceRange', [this.props.value[0], value]);
  },

  render: function() {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.label}>Price Between</Text>
        <View style={globalStyles.innerbox}>
          <PriceSelector label='Low Price' onChange={this.handleStartChange} value={this.props.value[0]} />
          <PriceSelector label='High Price' onChange={this.handleEndChange} value={this.props.value[1]} />
        </View>


      </View>
    );
  }
});

var styles = StyleSheet.create({
  innerbox: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },
});

module.exports = PriceRangeSelector;
