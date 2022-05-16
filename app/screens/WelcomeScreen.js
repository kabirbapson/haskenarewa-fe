import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import React from 'react';
import LogoTitle from '../components/LogoTitle';
import {hp, wp} from '../config/dpTopx';
import colors from '../../assets/colors/colors';
import ButtonV1 from '../components/ButtonV1';

export default function WelcomeScreen({navigation}) {
  return (
    <ImageBackground
      source={require('../../assets/images/Welcome.png')}
      style={styles.container}>
      <LogoTitle />
      <Text style={styles.textSubtitle}>
        We want to help you find the stories you love!
      </Text>
      <ButtonV1
        style={{width: '80%'}}
        title={'Get Started'}
        onClick={() => navigation.navigate('StepOne')}
      />
      <Text style={styles.footerText}>
        Have an Account?{' '}
        <Text
          style={styles.footerLink}
          onPress={() => navigation.navigate('SignIn')}>
          Sign in
        </Text>
      </Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: wp(25),
  },
  textSubtitle: {
    marginTop: hp(10),
    fontFamily: 'Poppins-Medium',
    fontSize: hp(13),
    color: colors.white,
    textAlign: 'center',
    width: wp(240),
    marginBottom: hp(28),
  },
  footerText: {
    marginTop: hp(17),
    marginBottom: hp(38),
    fontFamily: 'Poppins-Medium',
    fontSize: hp(16),
    color: colors.white,
  },
  footerLink: {
    color: colors.primary,
  },
});
