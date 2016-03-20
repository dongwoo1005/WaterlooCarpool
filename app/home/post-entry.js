'use strict';

var React = require('react-native');
var colors = require('../colors');
var Moment = require('moment');

var {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image
} = React;

var PostEntry = React.createClass({
  render:function(){
    var post = this.props.post;
    var isDriver = post.postType === 'driver' ? true : false;
    var emptyPicture = "http://whatsupintheworld.com/wp-content/uploads/2014/06/Facebook-Blank-Photo.jpg";
    return (
      <TouchableOpacity>
        <View style={styles.container}>
          <Image
            style={styles.thumbnail}
            source={{uri: post.user.picture ? post.user.picture : emptyPicture} }
          />
          <View style={styles.eventName}>
            <Text style={styles.eventText}>
              {post.user.fname + " " + post.user.lname}
              {isDriver ? ' is driving' : ' needs a ride'}
            </Text>
            <Text style={styles.eventLocation}>{post.from} --> {post.to} @ {Moment(post.datetime).format('ddd, MMM D, h:mm a')}</Text>
            <Text style={styles.eventLocation}>
              {isDriver ?
                '$' + post.price + '/seats':
                'Willing to pay $' + post.priceRange[0] + ' - $' + post.priceRange[1]}
            </Text>
            <Text style={styles.eventLocation}>
              {isDriver ?
                post.numSeats + ' seat(s) available' :
                'Looking for ' + post.numSeats + ' seat(s)'}
            </Text>
            <Text style={styles.eventLocation}>
              Post created {Moment(post.createdAt).fromNow() /*format("MMM D [at] h:mma")*/}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5,
  },
  thumbnail: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    width: 45,
    height: 45,
    borderRadius: 18,
  },
  eventName:{
    width: 275,
  },
  eventText: {
    fontSize: 14,
    color: colors.darker,
  },
  eventLocation: {
    fontSize: 10,
    color: colors.dark,
  },
})

module.exports = PostEntry;