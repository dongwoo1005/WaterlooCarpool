'use strict';

var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');

var Home = require('./app/home/home-screen');
var Search = require('./app/search/search-form');
var Post = require('./app/post/post-form');
var Chat = require('./app/chat/chat-app');
var MyPage = require('./app/my-page/my-page-screen');
var colors = require('./app/colors');

var {
  StyleSheet,
  Text,
  View,
  Image,
  TabBarIOS,
  NavigatorIOS,
  TouchableOpacity,
} = React;

var Main = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'home',
    };
  },
  getDefaultProps:function(){
    return {
      onSignOut: function(){},
    }
  },

  componentWillMount: function() {
    // https://github.com/facebook/react-native/issues/1403 prevents this to work for initial load
    Icon.getImageSource('navicon-round', 24).then((source) => this.setState({ navIcon: source }));
  },

  _renderContent: function(component, pageText) {
    var props = {
      pageText,
      onSignOut: this.props.onSignOut
    };
    return (
      <NavigatorIOS
        style={styles.navigator}
        tintColor={colors.appleGrey}
        barTintColor='#f7f7f7'
        titleTextColor={colors.navTitleTextColor}
        translucent={false}
        initialRoute={{
          component: component,
          passProps: props,
          title: pageText,
          rightButtonIcon: this.state.navIcon,
        }}
      />
    );
  },

  render: function() {
    return (
      <TabBarIOS
        tintColor={colors.myGreen}
        barTintColor="#f7f7f7"
        translucent={false}>
        <Icon.TabBarItem
          title="Home"
          iconName="ios-home-outline"
          selectedIconName="ios-home"
          iconSize={25}
          selected={this.state.selectedTab === 'home'}
          onPress={() => {
            this.setState({
              selectedTab: 'home',
            });
          }}>
          {
            this._renderContent(Home, 'UW Carpool')
          }
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Search"
          iconName="ios-search"
          selectedIconName="ios-search-strong"
          iconSize={25}
          selected={this.state.selectedTab === 'search'}
          onPress={() => {
            this.setState({
              selectedTab: 'search',
            });
          }}>
          {
            this._renderContent(Search, 'Search')
          }
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Post"
          iconName="android-car"
          selectedIconName="android-car"
          iconSize={25}
          selected={this.state.selectedTab === 'post'}
          onPress={() => {
            this.setState({
              selectedTab: 'post',
            });
          }}>
          {
            this._renderContent(Post, 'Post')
          }
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Chat"
          iconName="ios-chatbubble-outline"
          selectedIconName="ios-chatbubble"
          iconSize={25}
          selected={this.state.selectedTab === 'chat'}
          onPress={() => {
            this.setState({
              selectedTab: 'chat',
            });
          }}>
          {
            this._renderContent(Chat, 'Chat')
          }
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="My Page"
          iconName="ios-person-outline"
          selectedIconName="ios-person"
          iconSize={25}
          selected={this.state.selectedTab === 'mypage'}
          onPress={() => {
            this.setState({
              selectedTab: 'mypage',
            });
          }}>
          {
            this._renderContent(MyPage, 'My Page')
          }
        </Icon.TabBarItem>
      </TabBarIOS>
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
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: 'black',
  },
  button: {
    marginTop: 20,
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 4,
    borderColor: colors.myGreen,
    borderStyle: 'solid',
    borderWidth: 1,
  },
});

module.exports = Main;