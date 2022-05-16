import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {hp, wp} from '../config/dpTopx';
import React from 'react';
import colors from '../../assets/colors/colors';

export default function ButtonV1({
  title,
  onClick,
  style,
  textStyle,
  disabled = false,
  buttonStyle = 'filled',
  child,
}) {
  const btnStyle =
    buttonStyle === 'outline'
      ? {
          backgroundColor: colors.background,
          borderWidth: 2,
          borderColor: colors.primary,
        }
      : {};
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.container,
        style,
        btnStyle,
        disabled && buttonStyle === 'filled'
          ? {backgroundColor: colors.grey}
          : {},
      ]}
      activeOpacity={0.7}
      onPress={onClick}>
      {child ? (
        child
      ) : (
        <Text
          style={[
            styles.titleText,
            textStyle,
            buttonStyle === 'outline' && {color: colors.primary},
          ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: hp(40),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  titleText: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(12),
    color: colors.white,
  },
});
