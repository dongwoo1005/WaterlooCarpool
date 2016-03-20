'use strict';

var React = require('react-native');
var colors = require('../colors');
var NumberSelector = require('../common/number-selector');
var AutoComplete = require('react-native-autocomplete');
var Locations = require('../common/locations.json');


var {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  AlertIOS,
} = React;

var SearchForm = React.createClass({
  getInitialState: function() {
    return {
      // postType: 'DRIVER',
      from: '',
      to: '',
      datetime: '',
      price: 15,
      priceRange: [],
      numSeats: 1,
      locationData: []
    };
  },
  onTypingforFrom: function (text) {

      var locations = Locations.filter(function (location) {
          return location.name.toLowerCase().startsWith(text.toLowerCase())
      }).map(function (location) {
          return location.name + ', ' + location.detail;
      });

      this.setState({
          locationData: locations,
          from: text
      });
      console.log(this.state.from);
  },
  onTypingforTo: function (text) {

      var locations = Locations.filter(function (location) {
          return location.name.toLowerCase().startsWith(text.toLowerCase())
      }).map(function (location) {
          return location.name + ', ' + location.detail;
      });

      this.setState({
          locationData: locations,
          to: text
      });
      console.log(this.state.to);
  },
  onSelectforFrom: function(e){
    this.setState({
      from: e
    });
    console.log(this.state.from);
  },
  onSelectforTo: function(e){
    this.setState({
      to: e
    });
    console.log(this.state.to);
  },
  saveQueryOptions: function(key, value) {
    // console.log('saveQueryOptions', key, value);
    var temp = {};
    temp[key] = value;
    if (key == 'postType' && value == 'PASSENGER') {
      temp = {
        postType: 'PASSENGER',
        numSeats: 1,
        priceRange: [10, 20],
        price: null
      };
    }
    else if (key == 'postType' && value == 'DRIVER') {
      temp = {
        postType: 'DRIVER',
        numSeats: 3,
        price: 15,
        priceRange: []
      };
    }
    this.setState(temp);
  },
  handleSubmit(event){

  },
  render:function(){
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Where are you going?</Text>
        <AutoComplete
          onTyping={this.onTypingforFrom}
          onSelect={(e) => this.onSelectforFrom(e)}
          // onBlur={() => AlertIOS.alert('Blur')}
          // onFocus={() => AlertIOS.alert('Focus')}

          suggestions={this.state.locationData}

          placeholder='From'
          style={styles.input}
          clearButtonMode='always'
          returnKeyType='go'
          textAlign='left'
          clearTextOnFocus={true}

          maximumNumberOfAutoCompleteRows='5'
          applyBoldEffectToAutoCompleteSuggestions={true}
          reverseAutoCompleteSuggestionsBoldEffect={true}
          showTextFieldDropShadowWhenAutoCompleteTableIsOpen={false}
          disableAutoCompleteTableUserInteractionWhileFetching={true}
          autoCompleteTableViewHidden={false}

          autoCompleteTableBorderColor='#ccc'
          autoCompleteTableBackgroundColor='azure'
          autoCompleteTableCornerRadius={10}
          autoCompleteTableBorderWidth={1}

          autoCompleteRowHeight={35}

          autoCompleteFontSize={15}
          autoCompleteRegularFontName='Helvetica Neue'
          autoCompleteBoldFontName='Helvetica Bold'
        />
        <AutoComplete
          onTyping={this.onTypingforTo}
          onSelect={(e) => this.onSelectforTo(e)}
          // onBlur={() => AlertIOS.alert('Blur')}
          // onFocus={() => AlertIOS.alert('Focus')}

          suggestions={this.state.locationData}

          placeholder='To'
          style={styles.input}
          clearButtonMode='always'
          returnKeyType='go'
          textAlign='left'
          clearTextOnFocus={true}

          maximumNumberOfAutoCompleteRows='5'
          applyBoldEffectToAutoCompleteSuggestions={true}
          reverseAutoCompleteSuggestionsBoldEffect={true}
          showTextFieldDropShadowWhenAutoCompleteTableIsOpen={false}
          disableAutoCompleteTableUserInteractionWhileFetching={true}
          autoCompleteTableViewHidden={false}

          autoCompleteTableBorderColor='#ccc'
          autoCompleteTableBackgroundColor='azure'
          autoCompleteTableCornerRadius={10}
          autoCompleteTableBorderWidth={1}

          autoCompleteRowHeight={35}

          autoCompleteFontSize={15}
          autoCompleteRegularFontName='Helvetica Neue'
          autoCompleteBoldFontName='Helvetica Bold'
        />

        <TextInput onChange={this.datetimeHandler} placeholder='Date/Time' placeholderTextColor='#ccc' style={[styles.input, {marginBottom: 20}]}/>

        <NumberSelector
          varName='numSeats'
          label={'# of Seats'}
          value={this.state.numSeats}
          onChange={this.saveQueryOptions} />

        <TouchableHighlight
          style={[styles.button,{marginBottom: 20}]}
          underlayColor="rgba(33,224,163,1)"
          onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>Find</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button2}
          underlayColor="rgba(33,224,163,1)"
          onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>Nope, I am a Driver</Text>
        </TouchableHighlight>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    marginBottom: 60
  },
  title:{
    fontSize: 18,
    color: colors.green,
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 18,
  },
  input: {
    alignSelf: 'center',
    width: 350,
    height: 50,
    margin: 5,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 15,
    color: colors.textColor,
  },
  button: {
    height: 45,
    width: 90,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderColor: colors.green,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  button2: {
    height: 45,
    width: 200,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderColor: colors.green,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 15,
    color: colors.green,
    alignSelf: 'center',
    textAlign: 'center',
  },
})

module.exports = SearchForm;