import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity, Alert,
} from 'react-native';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';


import FormTextInput from '../../components/FormTextInput';
import Button from '../../components/Button';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const AlertBox = (status, msg) => {
    return Alert.alert(status, msg, [{text: 'OK'}]);
  };

  async function OnSignUp() {
    if (!email.length || !password.length) {
      AlertBox('Error', 'Email or Password should not be empty');
    } else if (!validEmail(email)) {
      AlertBox('Error', 'Enter a valid Email');
    } else if (!validPassword(password)) {
      AlertBox('Error', 'Password should have minimum 6 characters');
    } else {
      const userExists = await Keychain.getInternetCredentials(email);
      console.log(userExists);
      if (userExists) {
        AlertBox('Error', 'Email already exists');
      } else {
        await Keychain.setInternetCredentials(email, email, password);
        try {
          const userData = {'name': name, 'age': age};
          const jsonUserData = JSON.stringify(userData);
          await AsyncStorage.setItem(email, jsonUserData);
        } catch (e) {
          AlertBox('Error', 'Error registering. Try Again.');
        }
        AlertBox('Success', 'User registered');
        setEmail(null);
        setPassword(null);
        setName(null);
        setAge(null);
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
        <View style={styles.signUpTextView}>
          <Text style={styles.signUpText}>Sign Up</Text>
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
          <FormTextInput
            onChangeText={(val) => setName(val)}
            value={name}
            placeholder={'Name'}
            placeholderTextColor={'#242424'}
          />
          <FormTextInput
            onChangeText={(val) => setAge(val)}
            value={age}
            placeholder={'Age'}
            placeholderTextColor={'#242424'}
          />
        </View>

        <View style={styles.buttonView}>
          <Button
            type={'Sign Up'}
            buttonText={'Sign Up'}
            onButtonClick={OnSignUp}
          />
        </View>

        <View style={styles.signInView}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
            <Text style={styles.signInText}> Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

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
  signUpTextView: {
    marginLeft: 5,
    marginBottom: 18,
  },
  signUpText: {
    color: '#000',
    fontSize: 20,
  },
  textInputView: {
    marginBottom: 18,
  },
  buttonView: {
    marginBottom: 25,
  },
  signInText: {
    fontSize: 15,
  },
});
