import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity, Alert,
} from 'react-native';
import {connect} from 'react-redux';
import * as Keychain from 'react-native-keychain';

import {
  updateUserEmail,
} from '../../redux/actions/userActions';

import FormTextInput from '../../components/FormTextInput';
import Button from '../../components/Button';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const AlertBox = (msg) => {
    return Alert.alert('Error', msg, [{text: 'OK'}]);
  };

  async function onLogin() {

    if (!email.length || !password.length) {
      AlertBox('Email or Password should not be empty');
    } else if (!validEmail(email)) {
      AlertBox('Enter a valid Email');
    } else if (!validPassword(password)) {
      AlertBox('Password should have minimum 6 characters');
    } else {
      const userData = await Keychain.getInternetCredentials(email);
      console.log(userData);
      if (!userData) {
        AlertBox('User not found');
      } else if (userData.password !== password) {
        AlertBox('Invalid credentials');
      } else {
        props.updateUserEmail(email);
      }
    }
  }

  const validEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const validPassword = (pass) => {
    return pass.length > 5;
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.mainView}>
        <View style={styles.signInTextView}>
          <Text style={styles.signInText}>Sign in</Text>
        </View>
        <View style={styles.textInputView}>
          <FormTextInput
            onChangeText={val => setEmail(val)}
            value={email}
            placeholder={'Email'}
            placeholderTextColor={'#242424'}
            inputMode={'email'}
            keyboardType={'email-address'}
            autoCapitalize={'none'}
          />
          <FormTextInput
            onChangeText={(val) => setPassword(val)}
            value={password}
            placeholder={'Password'}
            placeholderTextColor={'#242424'}
            secureTextEntry={true}
            autoCapitalize={'none'}
          />
        </View>

        <View style={styles.buttonView}>
          <Button
            type={'Login'}
            buttonText={'Login'}
            onButtonClick={onLogin}
          />
        </View>

        {/*<View style={styles.signInView}>*/}
        <TouchableOpacity onPress={() => props.navigation.navigate('Register', {mobile: ''})}>
          <Text style={styles.signUpText}> Sign up</Text>
        </TouchableOpacity>
        {/*</View>*/}
      </View>
    </SafeAreaView>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    updateUserEmail: data => dispatch(updateUserEmail(data)),
  };
};

export default connect(null, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  mainView: {
    paddingHorizontal: 15,
    paddingVertical: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  signInTextView: {
    marginLeft: 5,
    marginBottom: 18,
  },
  signInText: {
    color: '#000',
    fontSize: 20,
  },
  textInputView: {
    marginBottom: 18,
  },
  buttonView: {
    marginBottom: 25,
  },
  signUpText: {
    fontSize: 15,
  },
});
