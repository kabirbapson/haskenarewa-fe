import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';
import {hp} from '../config/dpTopx';

function Button({
  title = 'Default',
  textStyle = {},
  buttonStyle = {},
  onPress = () => {},
}) {
  return (
    <TouchableOpacity style={[styles.container, buttonStyle]} onPress={onPress}>
      <Text style={[styles.textStyle, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: hp(60),
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: hp(14),
    color: colors.white,
  },
});

export default Button;
