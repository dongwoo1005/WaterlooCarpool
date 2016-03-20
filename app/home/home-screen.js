var React = require('react-native');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');
// var RadioButtons = require('react-native-radio-buttons');
import { RadioButtons, SegmentedControls } from 'react-native-radio-buttons';

var colors = require('../colors');
var Posts = require('./post-entries');
// var PostDetails = require('./post-details');

var {
  View,
  Text,
  StyleSheet,
  ScrollView,
} = React;

var HomeScreen = React.createClass({
  getInitialState:function(){
    return {
      options: ["All", "Driver", "Passenger"],
      option: "All"
    }
  },
  setOption:function(selectedOption){
    this.setState({
      option: selectedOption
    });
  },
  render:function(){
    return (
        <View style={{flex:1, padding: 20}}>
          <SegmentedControls
            tint= {colors.myGreen}
            selectedTint= {'#ffffff'}
            backTint= {'#ffffff'}
            options={ this.state.options }
            onSelection={ this.setOption }
            selectedOption={this.state.option }
          />
          <Posts option={this.state.option}/>
        </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 20,
  },
  radioContainer: {
    backgroundColor: colors.darker,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  radioBase: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    color: colors.light
  },
  radioSelected: {
    color: colors.pink,
  }
});

module.exports = HomeScreen;