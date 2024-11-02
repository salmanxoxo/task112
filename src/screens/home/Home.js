import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView, TouchableOpacity, Alert,
} from 'react-native';
import {connect} from 'react-redux';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  logOut,
} from '../../redux/actions/userActions';

const Home = (props) => {

  const AlertBox = (status, msg) => {
    return Alert.alert(status, msg, [{text: 'OK'}]);
  };

  const onLogout = () => {
    props.logOut();
  };

  async function onFetchData() {
    const userCreds = await Keychain.getInternetCredentials(props.email);
    console.log(userCreds);
    try {
      const userData = await AsyncStorage.getItem(props.email);
      if (userData !== null) {
        AlertBox('Success', userData);
      }
    } catch (e) {
      // error reading value
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.mainView}>
        <View style={styles.mainTextView}>
          <Text style={styles.mainText}>Welcome {props.name}</Text>
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity onPress={() => onFetchData()}>
            <Text style={styles.subText}> Fetch Data</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onLogout()}>
            <Text style={styles.subText}> Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    email: state.userData.email,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(logOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  mainView: {
    padding: 10,
  },
  mainTextView: {
    marginLeft: 5,
    marginBottom: 18,
  },
  mainText: {
    color: '#000',
    fontSize: 20,
  },
  subText: {
    color: '#000',
    marginTop: 10,
    fontSize: 15,
  },
  buttonView: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
