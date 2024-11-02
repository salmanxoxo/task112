import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {connect} from 'react-redux';

import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import Home from '../screens/home/Home';

const Stack = createNativeStackNavigator();

const navigationRef = React.createRef();

const AuthRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const AppRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        initialParams={{type: ''}}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const AllRoutes = props => {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef} >
        {props.userEmail ?
          <AppRoutes/> :
          <AuthRoutes/>}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const mapStateToProps = state => {
  return {
    userEmail: state.userData.email,
  };
};

export default connect(mapStateToProps)(AllRoutes);
