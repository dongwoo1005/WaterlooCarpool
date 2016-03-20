'use strict';

var React = require('react-native');
var {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} = React;

var colors = require('../colors.js');


var NumberSelectorItem = React.createClass({
  getDefaultProps: function () {
    return {
      onChange: function () {},
      value: 1,
      current: 0
    };
  },

  handleChange: function () {
    this.props.onChange(this.props.value);
  },

  render: function() {
    var selectedBox = {};
    var selectedText = {};

    if (this.props.value == this.props.current) {
      selectedBox.borderColor = colors.green;
      selectedText.color = colors.green;
      selectedText.fontSize = 24;
    }

    return (
      <TouchableOpacity onPress={this.handleChange}>
        <View style={[styles.container, selectedBox]}>
          <Text style={[styles.text, selectedText]}>{this.props.value}</Text>
        </View>
      </TouchableOpacity>
    );
  }
});



var styles = StyleSheet.create({
  container: {
    // padding: 20,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 20,
    width: 40,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },

  text: {
    flex: 1,
    fontSize: 20,
    fontWeight: '200',
    color: colors.textColor,
    textAlign: 'center',
  },
});


module.exports = NumberSelectorItem;

