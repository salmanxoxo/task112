import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

export default function FormTextInput({onChangeText, ...props}) {
  const handleChangeText = value => {
    onChangeText(value);
  };

  return (
    <TextInput
      style={styles.textInput}
      onChangeText={value => handleChangeText(value)}
      {...props}
      // onSubmitEditing={() => {
      //   props.onSubmit == '' ? null : props.onSubmit.current.focus();
      // }}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    fontSize: 15,
    color: '#000',
    paddingTop: 2,
    paddingBottom: 6,
    paddingHorizontal: 15,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 10,
  },
});
