var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');

var {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} = React;


var colors = require('../colors');

var PostTypeSelectorButton = React.createClass({

  getDefaultProps: function () {
    return {
      text: null,
      icon: null,
      value: null,
      current: null,
      onPress: function () {}
    };
  },

  handlePress: function () {
    this.props.onPress(this.props.value);
  },
  renderIcon: function() {
    var isActive = this.props.value === this.props.current;
    var iconName = this.props.icon == 'driver' ? 'android-car' : (this.props.icon == 'passenger' ? 'ios-body' : 'ios-list') ;
    var iconColor = isActive ? colors.green : '#ccc';
    return (
      <Icon
        name={iconName}
        size={45}
        color={iconColor}
        style={styles.icon}
      />
    );
  },

  render: function() {
    var isActive = this.props.value === this.props.current;

    return (
      <TouchableOpacity onPress={this.handlePress}>
        <View style={styles.tapAreaView}>
          {this.renderIcon()}
          <Text style={[styles.text, isActive && styles.active]}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
});

var styles = StyleSheet.create({
  tapAreaView: {
    alignItems: 'center',
  },

  icon: {
    // width: 80,
    // height: 80,
    marginLeft: 35,
    marginRight: 35,
    // marginBottom: 5,
  },

  text: {
    color: colors.textColor,
    paddingTop: 10
  },

  active: {
    color: colors.green
  },
});

module.exports = PostTypeSelectorButton;
