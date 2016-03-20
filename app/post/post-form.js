var React = require('react-native');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var PostTypeSelector = require('../common/post-type-selector');
var NumberSelector = require('../common/number-selector');
var PriceRangeSelector = require('../common/price-range-selector');
var PriceSelector = require('../common/price-selector');
var colors = require('../colors');
var globalStyles = require('../common/post-global-styles');
var AutoComplete = require('react-native-autocomplete');
var Locations = require('../common/locations.json');


var {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableHighlight,
  AlertIOS,
} = React;

var PostView = React.createClass({
  getInitialState: function() {
    return {
      postType: 'DRIVER',
      from: '',
      to: '',
      datetime: '',
      price: 15,
      priceRange: [],
      numSeats: 3,
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

  priceHandler: function(value){
    this.setState({
      price: value
    });
  },
  fromHandler: function(event){
    this.setState({
      from: event.nativeEvent.text
    });
  },
  toHandler: function(event){
    this.setState({
      to: event.nativeEvent.text
    });
  },
  datetimeHandler: function(event){
    this.setState({
      datetime: event.nativeEvent.text
    });
  },
  handleSubmit(event){
    console.log('submit state',this.state);
    var Posts = Parse.Object.extend("Posts");
    var posts = new Posts();
    var post = {
      postType: this.state.postType.toLowerCase(),
      user: Parse.User.current(), //.attributes.username //'Dongwoo Son', //temporary until user authentication implementation
      from: this.state.from,
      to: this.state.to,
      datetime: this.state.datetime,
      price: this.state.price,
      priceRange: this.state.priceRange,
      numSeats: this.state.numSeats
    }

    // need to include more queries for datetime
    var countQuery = new Parse.Query(Posts);
    countQuery.equalTo("postType", post.postType === 'driver' ? 'passenger' : 'driver')
              .equalTo("from", post.from)
              .equalTo("to", post.to);
    countQuery.count({
      success: function(count){
        AlertIOS.alert(
          'Do you want to post it?',
          post.postType === 'driver' ?
          count + ' matching passenger post(s) were found' :
          count + ' matching driver post(s) were found',
          [
            {text: 'Yes', onPress: () =>
              ParseReact.Mutation.Create('Posts', post).dispatch().then(
                function(posts){
                  console.log('Posted succesfully', posts);
                },
                function(posts, error){
                  console.log('Failed posting', posts, error);

                }
              )
            },
            {text: 'Not yet', onPress: () => {
                console.log('show matching posts');
                var matchingPostQuery = new Parse.Query(Posts);
                matchingPostQuery.equalTo("postType", post.postType === 'driver' ? 'passenger' : 'driver')
                                 .equalTo("from", post.from)
                                 .equalTo("to", post.to);
                matchingPostQuery.find({
                  success: function(result){
                    console.log("result", result);
                  },
                  error: function(result, error){
                    console.log("error", error);
                  }
                });
              }
            }
          ]
        );
      },
      error: function(error){
        console.log('count failed', error);
      }
    });
  },

  render:function(){
    var priceSelector;
    if (this.state.postType == 'DRIVER'){
      priceSelector = (
        <View style={globalStyles.container}>
          <Text style={globalStyles.label}>Price</Text>
          <PriceSelector value={this.state.price} onChange={this.priceHandler} />
        </View>
      );
    } else {
      priceSelector = <PriceRangeSelector value={this.state.priceRange} onChange={this.saveQueryOptions}/>;
    }
    return(
      <ScrollView style={styles.container}>
        <View style={styles.page}>
          <PostTypeSelector label='Post Type' value={this.state.postType} onChange={this.saveQueryOptions} />

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
            label={this.state.postType == 'DRIVER' ? '# of Seats Available' : '# of Seats Looking For'}
            value={this.state.numSeats}
            onChange={this.saveQueryOptions} />

          {priceSelector}

          <TouchableHighlight
            style={styles.button}
            underlayColor="rgba(33,224,163,1)"
            onPress={this.handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
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
  page: {
    paddingBottom: 50
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
  buttonText: {
    fontSize: 15,
    color: colors.green,
    alignSelf: 'center',
    textAlign: 'center',
  },
});

module.exports = PostView;
