import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../assets/colors/colors';
import {hp, wp} from '../config/dpTopx';

export default function LogoTitle() {
  return (
    <View style={styles.logoTitleWrapper}>
      <Text style={styles.title}>hasken arewa</Text>
      <View style={styles.dot} />
    </View>
  );
}

const styles = StyleSheet.create({
  logoTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(25),
    color: colors.white,
  },
  dot: {
    backgroundColor: colors.primary,
    marginTop: hp(8),
    marginLeft: wp(3),
    width: 8,
    height: 8,
    borderRadius: 7,
  },
});
