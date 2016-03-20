'use strict';

var React = require('react-native');
var {
  Text,
  View,
} = React;

var globalStyles = require('./post-global-styles');
var NumberSelectorItem = require('./number-selector-item');

var NumberSelector = React.createClass({

  getDefaultProps: function () {
    return {
      onChange: function () {},
      label: 'Seats available',
      value: 1,
      varName: 'numSeats'
    };
  },

  handleChange: function (value) {
    this.props.onChange(this.props.varName, value);
  },

  render: function() {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.label}>{this.props.label}</Text>
        <View style={globalStyles.innerBox}>
          <NumberSelectorItem value={1} current={this.props.value} onChange={this.handleChange} />
          <NumberSelectorItem value={2} current={this.props.value} onChange={this.handleChange} />
          <NumberSelectorItem value={3} current={this.props.value} onChange={this.handleChange} />
          <NumberSelectorItem value={4} current={this.props.value} onChange={this.handleChange} />
          <NumberSelectorItem value={5} current={this.props.value} onChange={this.handleChange} />
          <NumberSelectorItem value={6} current={this.props.value} onChange={this.handleChange} />
        </View>
      </View>
    );
  }
});

module.exports = NumberSelector;

