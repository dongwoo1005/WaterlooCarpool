var React = require('react-native');

var {
  StyleSheet,
  View,
  ActivityIndicatorIOS
} = React;

var LoadingScreen = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <ActivityIndicatorIOS
          size='large'
          style={styles.spinner}
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  spinner: {
    height: 40,
    width: 40,
  }
});

module.exports = LoadingScreen;