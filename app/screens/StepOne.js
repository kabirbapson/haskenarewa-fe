import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import colors from '../../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';
import {hp, wp} from '../config/dpTopx';
import Input from '../components/Input';
import ButtonV1 from '../components/ButtonV1';
import {useDispatch, useSelector} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {verifyEmail} from '../redux/actions/auth';

export default function StepOne({navigation}) {
  const dispatch = useDispatch();
  const [register_type, setRegisterType] = useState(false);
  const [email, setEmail] = useState('');

  const isLoading = useSelector(state => state.auth.isLoading);

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

  const handleNext = () => {
    if (!validateEmail()) {
      return;
    }

    dispatch(
      verifyEmail(
        {verification_type: 'email', email_phone: email},
        handleResponse,
      ),
    );
  };

  const handleResponse = (data, status) => {
    if (status < 300) {
      navigation.navigate('VerifyEmail', {
        data: data,
      });
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      {/* Password reset first step */}

      <>
        <Text style={styles.titleText}>{`Create Account\nWith ${
          register_type ? 'Phone' : 'Email'
        }`}</Text>
        <Text style={styles.titleSubtitle}>
          {`Type in your ${
            register_type ? 'phone number' : 'email address'
          } to continue`}
        </Text>
        <View style={styles.inputWRapper}>
          <Input
            placeholder={register_type ? 'Phone Number' : 'Email Address'}
            value={email}
            onInput={text => setEmail(text)}
            // max={register_type && 11}
            type={register_type ? 'numeric' : 'default'}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <ButtonV1
            title={'Send verification code'}
            disabled={isLoading}
            child={
              isLoading && (
                <ActivityIndicator size={hp(30)} color={colors.primary} />
              )
            }
            buttonStyle={isLoading && 'outline'}
            onClick={handleNext}
          />
        </View>

        <Text style={styles.SignUpOption}>or sign up using</Text>
        <View style={styles.SignUpOptionWrapper}>
          <View style={[styles.SignUpOptionItem, {backgroundColor: '#DB4437'}]}>
            <FontAwesome name="google" color={colors.white} size={hp(25)} />
          </View>
          <View style={[styles.SignUpOptionItem, {backgroundColor: '#0165E1'}]}>
            <FontAwesome name="facebook-f" color={colors.white} size={hp(25)} />
          </View>
          <View style={[styles.SignUpOptionItem, {backgroundColor: '#1DA1F2'}]}>
            <FontAwesome name="twitter" color={colors.white} size={hp(25)} />
          </View>
        </View>
        {/* <View style={styles.buttonWrapperBottom}>
          <ButtonV1
            title={register_type ? 'Use Email' : 'Use Phone Number'}
            buttonStyle={'outline'}
            textStyle={{color: colors.primary}}
            onClick={() => setRegisterType(!register_type)}
          />
        </View> */}
      </>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: wp(25),
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    // alignItems: 'center',
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBackText: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(13),
    color: colors.black,
  },
  titleText: {
    marginTop: hp(80),
    fontFamily: 'Poppins-SemiBold',
    color: colors.textBlack,
    fontSize: hp(20),
  },
  titleSubtitle: {
    marginTop: hp(12),
    fontFamily: 'Poppins-Medium',
    // color: colors.textBlack,
    fontSize: hp(13),
    paddingRight: wp(100),
  },
  inputTitle: {
    fontFamily: 'Poppins-Medium',
    paddingLeft: wp(5),
    fontSize: hp(14),
    color: colors.textBlack,
  },
  inputWRapper: {
    marginTop: hp(20),
  },
  buttonWrapper: {
    width: '100%',
    marginTop: hp(20),
  },
  wrongEmail: {
    marginTop: hp(10),
    fontFamily: 'Poppins-Medium',
    fontSize: hp(16),
    color: colors.textBlack,
  },

  // password reset code verify

  SignUpOption: {
    marginTop: hp(80),
    fontFamily: 'Poppins-Medium',
    fontSize: hp(16),
    color: colors.textBlack,
    textAlign: 'center',
  },
  SignUpOptionWrapper: {
    marginTop: hp(10),
    flexDirection: 'row',
    alignSelf: 'center',
  },
  SignUpOptionItem: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'black',
    marginRight: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapperBottom: {
    marginTop: hp(100),
  },
});
