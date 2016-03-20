'use strict';

var React = require('react-native');

var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var IonIcon = require('react-native-vector-icons/Ionicons');
var FontAwesomeIcon = require('react-native-vector-icons/FontAwesome');

var Modal = require('react-native-modalbox');

var SignInForm = require('./sign-in-form');
var SignUpForm = require('./sign-up-form');
var colors = require('../colors');

var {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} = React;

var BrandColors = {
  Facebook: '#3b5998',
  Twitter: '#55acee',
  Google: '#dd4b39',
};

var SignInScreen = React.createClass({
  getInitialState: function() {
    return {
      isSignInOpen: false,
      isSignUpOpen: false,
      signInClosingState: false,
      signUpClosingState: false,
      // modal: null,
    }
  },

  getDefaultProps:function(){
    return {
      onSignedIn: function() {},
    }
  },

  handleSignIn: function(){
    this.props.onSignedIn();
  },

  openSignUp: function() {
    this.setState({
      isSignUpOpen: true,
      // modal: 'SignUp'
    });
    console.log('openSignUp was called')
  },

  openSignIn: function() {
    this.setState({
      isSignInOpen: true,
      // modal: 'SignIn'
    });
    console.log('openSignIn was called')
  },


  close: function() {
    this.setState({
      isSignInOpen: false,
      isSignUpOpen: false,
      // modal: null
    });
    console.log('close was called')
  },

  signInOnClosed: function() {
    console.log('onClosed was called');
    // If the modal has been closed with a swipe down, we change the state to hide the modal completely
    if (this.state.isSignInOpen != false)
      this.setState({
        isSignInOpen: false,
        // modal: null,
        signInClosingState: false,
      });
  },
  signUpOnClosed: function() {
    console.log('onClosed was called');
    // If the modal has been closed with a swipe down, we change the state to hide the modal completely
    if (this.state.isSignUpOpen != false)
      this.setState({
        isSignUpOpen: false,
        // modal: null,
        signUpClosingState: false,
      });
  },

  onOpened: function() {
    // console.log('the modal is opened');
    console.log('onOpened was called')
  },

  onClosingState: function(state) {
    this.setState({
      signInClosingState: state,
      signUpClosingState: state
    });
    console.log('onClosingState was called')
  },

  render: function() {
    var modalRelease = <View/>;

    if (this.state.closingState)
      modalRelease = <View style={styles.modalRelease}><Text style={styles.modalReleaseText}>Release To leave</Text></View>;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>UWCarpool</Text>

        <TouchableOpacity>
          <View
            style={styles.signInWithFacebookButton}>
            <FontAwesomeIcon
              name='facebook'
              size={20}
              color='#ffffff'
              style={styles.signInWithFacebookIcon}/>
            <Text style={styles.signInText}>
              {'Log in with Facebook'}
            </Text>
         </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View
            style={styles.signInWithGoogleButton}>
            <FontAwesomeIcon
              name='google'
              size={20}
              color='#ffffff'
              style={styles.signInWithFacebookIcon}/>
            <Text style={styles.signInText}>
              {'Log in with Google'}
            </Text>
         </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.openSignIn}>
          <View style={styles.signInWithEmailButton}>
            <IonIcon
              name='ios-email'
              size={20}
              color='#ffffff'
              style={styles.signInWithFacebookIcon}/>
            <Text style={styles.signInText}>Log in with Email</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.openSignUp}>
          <View style={styles.signUpButton}>
            <Text style={styles.signInText}>Sign up</Text>
          </View>
        </TouchableOpacity>
{
        <Modal
          isOpen={this.state.isSignInOpen}
          swipeToClose={true}
          onClosed={this.signInOnClosed}
          onOpened={this.onOpened}
          onClosingState={this.onClosingState}
        >
          {modalRelease}
          <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
            <TouchableOpacity onPress={this.close}>
              <FontAwesomeIcon
                name='close'
                size={30}
                color='#cccccc'
                style={styles.closeIcon}/>
            </TouchableOpacity>
          </View>
          <SignInForm onSignedIn={this.handleSignIn}/>
        </Modal>
}
{
        <Modal
          isOpen={this.state.isSignUpOpen}
          swipeToClose={true}
          onClosed={this.signUpOnClosed}
          onOpened={this.onOpened}
          onClosingState={this.onClosingState}
        >
          {modalRelease}
          <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
            <TouchableOpacity onPress={this.close}>
              <FontAwesomeIcon
                name='close'
                size={30}
                color='#cccccc'
                style={styles.closeIcon}/>
            </TouchableOpacity>
          </View>
          <SignUpForm onSignedIn={this.handleSignIn}/>
        </Modal>
      }
      </View>

    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#181818'
    // marginTop: 30,
  },
  title: {
    fontSize: 40,
    color: '#fff',
    fontFamily: 'HelveticaNeue-Medium',
    marginBottom: 10,
  },
  // tabView: {
  //   width: deviceWidth,
  //   padding: 10,
  //   backgroundColor: 'rgba(0,0,0,0.01)',
  // },
  signInText: {
    color: 'white',
    // marginLeft: 5,
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 14,
  },
  signInWithFacebookButton: {
    backgroundColor: BrandColors.Facebook,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 210,
    padding: 5,
    borderRadius: 3,
    marginTop: 10
  },
  signInWithGoogleButton: {
    backgroundColor: BrandColors.Google,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 210,
    padding: 5,
    borderRadius: 3,
    marginTop: 10
  },
  signInWithEmailButton: {
    // backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 210,
    padding: 5,
    // paddingLeft:0,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#ffffff',
    marginTop: 10,
    marginBottom: 15
  },
  signUpButton: {
    // backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 210,
    padding: 5,
    paddingLeft:0,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#ffffff',
    marginTop: 10
  },
  signInWithFacebookIcon: {
    width: 28,
    height: 28,
    marginLeft: 5
  },
  closeIcon: {
    width: 30,
    height: 30,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 30,
  },
  modalRelease: {
    alignItems: 'center'
  },
  modalReleaseText: {
    color: colors.myGreen
  }
});

module.exports = SignInScreen;