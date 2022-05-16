import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import React, {useState} from 'react';
import colors from '../../assets/colors/colors';
import Input from '../components/Input';
import {hp, wp} from '../config/dpTopx';
import ButtonV1 from '../components/ButtonV1';
import {useDispatch, useSelector} from 'react-redux';
import {signIn} from '../redux/actions/auth';
import Loading from '../components/Loading';

export default function SignIn({navigation}) {
  const dispatch = useDispatch();
  const [eye, setEye] = useState(false);

  const isLoading = useSelector(state => state.auth.isLoading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputValidation = () => {
    return true;
  };

  const handleLogin = () => {
    if (inputValidation()) {
      dispatch(signIn({email, password}, handleError));
    }
  };

  const handleError = error => {
    if (error.data.non_field_errors) {
      Alert.alert('Error Occur', error.data.non_field_errors[0], [
        {
          text: 'Forgot password?',
          onPress: () => navigation.navigate('ForgotPassword'),
          style: 'retry',
        },
        {
          text: 'Retry',
          onPress: () => {},
          style: 'retry',
        },
      ]);
    }
  };

  return (
    <>
      {isLoading && <Loading title={'Sign In...'} />}
      <KeyboardAwareScrollView style={styles.container}>
        <Text style={styles.welcomeBackText}>Welcome Back!</Text>
        <Text style={styles.subTitleText}>Please sign in to your account.</Text>
        <Input value={email} onInput={setEmail} placeholder="Email Address" />
        <Text />
        <Input
          value={password}
          onInput={setPassword}
          placeholder="Password"
          is_password={eye ? false : true}
          icon={eye ? 'eye' : 'eye-off'}
          iconColor={eye && colors.secondary}
          onIconClick={() => setEye(!eye)}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
        <ButtonV1 onClick={handleLogin} title={'Sign in'} />
        {/* <View style={styles.buttonWrapper}>
          <ButtonV1
            title={'Sign in with Google'}
            style={{backgroundColor: '#ffffff'}}
            textStyle={{color: colors.textBlack}}
          />
          <Text />
          <ButtonV1
            title={'Sign in with Facebook'}
            style={{backgroundColor: '#3b5998'}}
            textStyle={{color: colors.textWhite}}
          />
        </View> */}
        <Text style={styles.footerText}>
          Don’t have an Account?{' '}
          <Text
            style={styles.footerLink}
            onPress={() => navigation.navigate('StepOne')}>
            Sign up
          </Text>
        </Text>
      </KeyboardAwareScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    // alignItems: 'center',
    paddingHorizontal: wp(43),
  },
  welcomeBackText: {
    marginTop: hp(90),
    fontFamily: 'Poppins-Medium',
    fontSize: hp(25),
    textAlign: 'center',
    color: '#010620',
  },
  subTitleText: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(14),
    textAlign: 'center',
    color: '#878787',
    marginBottom: hp(50),
  },

  forgotPassword: {
    marginTop: hp(10),
    fontFamily: 'Poppins-Medium',
    fontSize: hp(16),
    color: colors.primary,
    textAlign: 'right',
    marginBottom: hp(10),
  },
  buttonWrapper: {
    marginTop: hp(80),
  },
  footerText: {
    marginTop: hp(20),
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: hp(16),
    color: '#010620',
  },
  footerLink: {
    color: colors.primary,
  },
});
