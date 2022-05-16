import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import colors from '../../assets/colors/colors';
import {hp, wp} from '../config/dpTopx';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo_v1.png')}
        style={styles.logo}
      />
      <View style={styles.logoTitleWrapper}>
        <Text style={styles.title}>hasken arewa</Text>
        <View style={styles.dot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: wp(122),
    height: hp(88),
  },
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
