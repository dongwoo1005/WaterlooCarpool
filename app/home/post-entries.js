var React = require('react-native');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');
var PostEntry = require('./post-entry');
var LoadingScreen = require('../common/loading-screen');

var {
  StyleSheet,
  ListView,
} = React;

var PostEntries = React.createClass({

  getInitialState:function(){
    return {
      option: this.props.option,
      ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    };
  },

  componentWillReceiveProps:function(nextProps){
    console.log('cwrp nextprops', nextProps.option);
    if (this.props.option !== nextProps.option){
      this.setState({
        option: nextProps.option
      });
    }
  },

  componentWillUpdate: function(nextProps, nextState) {
    console.log('cwu nextprops', nextProps.option);
    if (this.props.option !== nextProps.option){
      this.setState({
        option: nextProps.option
      });
    }
  },

  mixins: [ParseReact.Mixin],

  observe: function() {
    console.log('observe state', this.state.option)
    var query = new Parse.Query('Posts').include("user");
    if (this.state.option !== 'All'){
      query.equalTo('postType',this.state.option.toLowerCase());
    }
    return {
      user: ParseReact.currentUser,
      posts: query.descending('createdAt'),
    };
  },



  renderRow: function(post){
    return (
      <PostEntry post={post}/>
    );
  },

  render:function(){
    var dataLoaded = this.data.posts.length > 0;
    console.log('Post entries rendered');
    return (
      dataLoaded ?
      <ListView
        dataSource = {this.state.ds.cloneWithRows(this.data.posts)}
        renderRow = {this.renderRow}
        style={styles.container}
      /> : <LoadingScreen />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 50
  }
});

module.exports = PostEntries;