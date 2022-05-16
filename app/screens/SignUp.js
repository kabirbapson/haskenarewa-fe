/* eslint-disable no-alert */
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../assets/colors/colors';
import Input from '../components/Input';
import {hp, wp} from '../config/dpTopx';
import ButtonV1 from '../components/ButtonV1';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function SignUp({navigation}) {
  const [buttonDisable, setButtonDisable] = useState(true);
  const [eye, setEye] = useState(true);

  // Registration Form
  const [full_name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (
      full_name.length > 0 &&
      email.length > 0 &&
      phone_number.length > 0 &&
      password.length > 0
    ) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [full_name, email, phone_number, password]);

  // validate Form
  const validateFullName = () => {
    // check it is full name
    if (full_name.trim().split(' ').length === 1) {
      alert('please type input your full name with a space between the name');
      return false;
    } else if (
      full_name.trim().split(' ')[0].length < 3 ||
      full_name.trim().split(' ')[1].length < 3
    ) {
      alert('your full name is too short');
      return false;
    }
    return true;
  };
  const validateEmail = () => {
    if (
      email.trim().match(/^[a-z | A-Z | 0-9 |.]+@[a-zA-Z]+.[a-z]{2,5}$/) ===
      null
    ) {
      alert(email + ' Not a valid email address');
      return false;
    }
    return true;
  };
  const validatePhone = () => {
    if (phone_number.length < 11) {
      alert('Not a valid phone number');
      return false;
    }
    return true;
  };
  const validatePassword = () => {};

  const handleSetPhoneNumber = text => {
    if (Number(text) || text === '' || text === '0') {
      setPhoneNumber(text);
    }
  };
  // RR

  const generateForm = () => {
    const [first_name, last_name] = full_name.trim().split(' ');
    const data = {
      first_name,
      last_name,
      email,
      phone_number,
      password,
    };

    return data;
  };
  const handleRegistration = () => {
    if (!validateFullName()) {
      return;
    }
    if (!validateEmail()) {
      return;
    }
    if (!validatePhone()) {
      return;
    }
    const data = generateForm();
    navigation.navigate('VerifyEmail');
  };

  return (
    <>
      <KeyboardAwareScrollView style={styles.container}>
        <Text style={styles.welcomeBackText}>Create new account.</Text>
        <Text style={styles.subTitleText}>
          Please fill in the form to continue
        </Text>
        <Input
          placeholder="Full Name"
          value={full_name}
          onInput={text => setFullName(text)}
        />
        <Text />

        <Input
          placeholder="Email Address"
          value={email}
          onInput={text => setEmail(text)}
        />
        <Text />

        <Input
          placeholder="Phone Number"
          type="numeric"
          value={phone_number}
          max={11}
          onInput={text => handleSetPhoneNumber(text)}
        />
        <Text />
        <Input
          placeholder="Password"
          value={password}
          is_password={eye ? false : true}
          icon={eye ? 'eye' : 'eye-off'}
          iconColor={eye && colors.secondary}
          onIconClick={() => setEye(!eye)}
          onInput={text => setPassword(text)}
        />
        <View style={styles.buttonWrapper}>
          <ButtonV1
            title={'Sign Up'}
            onClick={handleRegistration}
            disabled={buttonDisable}
          />
        </View>
        <Text style={styles.footerText}>
          Have an Account?{' '}
          <Text
            style={styles.footerLink}
            onPress={() => navigation.navigate('SignIn')}>
            Sign In
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
  },
  buttonWrapper: {
    marginTop: hp(50),
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
