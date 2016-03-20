var React = require('react-native');
var {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} = React;

var PostTypeSelectorButton = require('./post-type-selector-button');
var styles = require('./post-global-styles');

var PostTypeSelector = React.createClass({

  getDefaultProps: function () {
    return {
      onChange: function () {},
      value: null,
      label: ''
    };
  },

  handleChange: function (value) {
    this.props.onChange('postType', value);
  },
  getAllButton: function() {
    if (this.props.label === 'View Only') {
      return (
        <PostTypeSelectorButton
          text='All'
          icon='all'
          value='ALL'
          current={this.props.value}
          onPress={this.handleChange}
        />
      );
    } else {
      return <View></View>
    }
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{this.props.label}</Text>
        <View style={styles.innerBox}>
          {this.getAllButton()}
          <PostTypeSelectorButton
            text='Driver'
            icon='driver'
            value='DRIVER'
            current={this.props.value}
            onPress={this.handleChange} />
          <PostTypeSelectorButton
            text='Passenger'
            icon='passenger'
            value='PASSENGER'
            current={this.props.value}
            onPress={this.handleChange} />
        </View>
      </View>
    );
  }
});



module.exports = PostTypeSelector;