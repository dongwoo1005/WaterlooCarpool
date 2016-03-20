import { AsyncStorage } from 'react-native';

const PREFIX = 'settings.';

function getSetting(key) {
  return AsyncStorage.getItem(PREFIX + key);
}

function setSetting(key, value) {
  return AsyncStorage.setItem(PREFIX + key, value)
    .then(() => value);
}
function removeSetting(key){
  return AsyncStorage.removeItem(PREFIX + key)
}

class Settings {
  static getToken() {
    console.log(getSetting('token'));
    return getSetting('token');
  }
  static setToken(newToken) {
    return setSetting('token', newToken);
  }
  static removeToken(){
    return removeSetting('token')
  }
}

export default Settings;
