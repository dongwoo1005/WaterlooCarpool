var React = require('react-native');

var Parse = require('parse').Parse;
var ParseReact = require('parse-react');
var colors = require('../colors');

var {
  View,
  Text,
  Image,
  StyleSheet
} = React;

var Badge = React.createClass({
  render:function(){
    var user = Parse.User.current();
    var emptyPicture = "http://whatsupintheworld.com/wp-content/uploads/2014/06/Facebook-Blank-Photo.jpg";
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: user.get('picture') || emptyPicture}}></Image>
        <Text style={styles.name}> {user.get('fname') + ' ' + user.get('lname')} </Text>
        <Text style={styles.handle}> {user.getEmail()} </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    paddingBottom: 10
  },
  name: {
    alignSelf: 'center',
    fontSize: 21,
    marginTop: 10,
    marginBottom: 5,
    color: colors.appleGrey
  },
  handle: {
    alignSelf: 'center',
    fontSize: 16,
    color: colors.appleGrey
  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 65,
    borderColor: colors.appleGrey,
    borderWidth: 1,
    marginTop: 10,
    alignSelf: 'center'
  },
  thumbnail: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    width: 45,
    height: 45,
    borderRadius: 18,
    alignSelf: 'center'
  },
});

module.exports = Badge;