'use strict';

var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');

var SearchForm = require('./search-form');
var colors = require('../colors');

var {
  NavigatorIOS,
  StyleSheet,
} = React;

var SearchScreen= React.createClass({
  getInitialState:function(){
    return {
      navIcon: null,
    }
  },
  componentWillMount: function() {
    // https://github.com/facebook/react-native/issues/1403 prevents this to work for initial load
    Icon.getImageSource('navicon-round', 25).then((source) => this.setState({ navIcon: source }));
  },

  render:function(){
    return (
      <NavigatorIOS
        style={styles.navigator}
        tintColor={colors.appleGrey}
        titleTextColor={colors.navTitleTextColor}
        translucent={true}
        initialRoute={{
          component: SearchForm,
          // passProps: props,
          title: 'Search',
          rightButtonIcon: this.state.navIcon,
        }}
      />
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

module.exports = SearchScreen;