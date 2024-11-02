import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function Button(props) {
  const onButtonClick = () => {
    props.onButtonClick();
  };

  return (
    <TouchableOpacity
      onPress={() => onButtonClick()}
      style={[styles.buttonStyle, styles.bgColor]}>
      <Text style={[styles.buttonText, styles.buttonTextColor]}>{props.buttonText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#000',
  },
  bgColor: {
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 16,
  },
  buttonTextColor: {
    color: '#000',
  },
});
