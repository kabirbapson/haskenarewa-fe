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
import {confirmEmail} from '../redux/actions/auth';

export default function VerifyEmail({route, navigation}) {
  const dispatch = useDispatch();
  const [step, setStep] = useState(false);
  const [otp, setOtp] = useState('');

  const isLoading = useSelector(state => state.auth.isLoading);

  const handleSetStep = () => {
    setStep(!step);
  };

  const {data} = route.params;

  const handleEmailVerify = () => {
    dispatch(
      confirmEmail(
        {otp: otp, email_phone: data.email_phone},
        data.token,
        handleResponse,
      ),
    );
  };

  const handleResponse = (res_data, status) => {
    if (status < 300) {
      navigation.navigate('StepTwo', {email: data.email_phone});
      return;
    }

    if (status === 400) {
      alert('invalid code please check and try again');
      return;
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 50,
          height: 50,
          borderRadius: 30,
          backgroundColor: colors.grey,
        }}>
        <Feather name="arrow-left" size={30} color={colors.white} />
      </TouchableOpacity>
      {/* Password reset first step */}

      <>
        <Text style={styles.titleText}>{'Email\nVerification'}</Text>
        <Text style={styles.titleSubtitle}>
          Enter the 6 digit that sent to this email address{' '}
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              color: colors.secondary,
              fontFamily: 'Poppins-Medium',
              fontSize: hp(14),
            }}>
            {data.email_phone}
          </Text>
        </Text>
        <View style={styles.inputWRapper}>
          <Input
            placeholder={'Verification Code'}
            value={otp}
            onInput={setOtp}
            type={'numeric'}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <ButtonV1
            title={'Verify Email'}
            disabled={isLoading}
            child={
              isLoading && (
                <ActivityIndicator size={hp(30)} color={colors.primary} />
              )
            }
            buttonStyle={isLoading && 'outline'}
            onClick={handleEmailVerify}
          />
        </View>
        {/* <Text style={styles.wrongEmail}>Didn’t received resend</Text> */}
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
    marginTop: hp(150),
    fontFamily: 'Poppins-SemiBold',
    color: colors.textBlack,
    fontSize: hp(20),
  },
  titleSubtitle: {
    marginTop: hp(12),
    fontFamily: 'Poppins-Medium',
    // color: colors.textBlack,
    fontSize: hp(13),
    paddingRight: wp(20),
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
    marginTop: hp(200),
    alignSelf: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: hp(16),
    color: colors.primary,
  },

  // password reset code verify
});
