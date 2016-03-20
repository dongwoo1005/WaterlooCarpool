"use strict";

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  PickerIOS,
} = React;

var colors = require('../colors');

var PickerItemIOS = PickerIOS.Item;

var PriceSelector = React.createClass({

  getDefaultProps: function () {
    return {
      onChange: function () {},
      value: 15,
      label: ''
    };
  },
  handleChange: function (value) {
    // console.log('handleChange', value);
    this.props.onChange(value);
  },

  render: function() {
    var amounts = [];

    for (var i=5; i<=25; i+=5) {
      amounts.push({ label: '$'+i, value: i });
    }

    amounts.push({ label: 'Any', value: '' });

    return (
      <View style={styles.container}>
        <Text style={styles.label}>{this.props.label}</Text>

        <PickerIOS
          selectedValue={this.props.value}
          onValueChange={this.handleChange}>
          {amounts.map((amount) =>
            (<PickerItemIOS key={'amount-' + amount.value} value={amount.value} label={amount.label} />)
          )}
        </PickerIOS>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  label: {
    fontSize: 12,
    color: colors.textColor,
    textAlign: 'center'
  },

  value: {
    fontSize: 22,
    color: colors.green,
  },
  picker: {
    textAlign: 'left'
  }
});


module.exports = PriceSelector;
