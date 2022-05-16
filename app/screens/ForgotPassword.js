import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
  BackHandler,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {hp, wp} from '../config/dpTopx';
import Input from '../components/Input';
import ButtonV1 from '../components/ButtonV1';
import {useDispatch, useSelector} from 'react-redux';
import {resetPassword, resetPasswordVerify} from '../redux/actions/auth';

const PasswordResetCode = ({handleBackButton, info, onSuccess}) => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');
  const [errorDisplay, setErrorDisplay] = useState(null);

  const isLoading = useSelector(state => state.auth.isLoading);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () =>
      handleBackButton(),
    );

    return () => backHandler.remove();
  }, []);

  const handleResetPassword = () => {
    setErrorDisplay(null);
    const form = {otp: otp, email_phone: info.email_phone};
    dispatch(resetPasswordVerify(form, info.token, resetRequestHandler));
  };

  const resetRequestHandler = (data, status) => {
    if (status < 300) {
      onSuccess(otp);
    }
  };

  return (
    <>
      <Text style={styles.titleText}>Enter OTP</Text>
      <Text style={styles.titleSubtitle}>
        Enter verification code that been send to your email address to continue
      </Text>
      <Text />
      <Input
        placeholder={'Verification Code'}
        value={otp}
        type={'numeric'}
        max={6}
        onInput={text => setOtp(text)}
      />
      <Text />
      <ButtonV1
        title={'Reset password'}
        child={
          isLoading && (
            <ActivityIndicator size={hp(30)} color={colors.primary} />
          )
        }
        buttonStyle={isLoading && 'outline'}
        disabled={isLoading}
        onClick={handleResetPassword}
      />
      {errorDisplay && (
        <Text style={styles.errorDisplayStyle}>{errorDisplay}</Text>
      )}
    </>
  );
};

export default function ForgotPassword({navigation}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(false);
  const [info, setInfo] = useState({});
  const [validated, setValidated] = useState(true);
  const [errorDisplay, setErrorDisplay] = useState(null);

  const isLoading = useSelector(state => state.auth.isLoading);
  const handleSetStep = () => {
    setStep(true);
  };

  useEffect(() => {
    if (email.length > 10) {
      setValidated(false);
    } else {
      setValidated(true);
    }
  }, [email]);

  const handleOtpSuccess = otp => {
    navigation.navigate('ChangePassword', {
      otp: otp,
      token: info.token,
      email_phone: info.email_phone,
    });
  };
  const HandleResetPasswordRequest = () => {
    setErrorDisplay(null);
    dispatch(
      resetPassword(
        {verification_type: 'email', email_phone: email},
        resetRequestHandler,
      ),
    );
  };

  const resetRequestHandler = (data, status) => {
    if (status < 300) {
      setInfo(data);
      setStep(!step);
    }
    if (status !== 200) {
      if (data.reason) {
        Alert.alert(
          'No accounts match that information.',
          "Make sure that you've entered the correct email address.",
          [{text: 'TRY AGAIN', style: 'cancel'}],
        );
      }
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={step ? () => setStep(!step) : () => navigation.goBack()}>
          <Feather name="arrow-left" size={hp(30)} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerBackText}>Back</Text>
      </View>

      {/* Password reset first step */}
      {step ? (
        <PasswordResetCode
          handleBackButton={handleSetStep}
          info={info}
          onSuccess={handleOtpSuccess}
        />
      ) : (
        <>
          <Text style={styles.titleText}>{'Reset\nPassword'}</Text>
          <Text style={styles.titleSubtitle}>
            Please enter your email address to request a password reset.
          </Text>
          <View style={styles.inputWRapper}>
            <Text style={styles.inputTitle}>Email</Text>
            <Input
              placeholder={'Email Address'}
              value={email}
              onInput={text => setEmail(text)}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <ButtonV1
              title={'Send Reset Password'}
              onClick={HandleResetPasswordRequest}
              child={
                isLoading && (
                  <ActivityIndicator size={hp(30)} color={colors.primary} />
                )
              }
              buttonStyle={isLoading && 'outline'}
              disabled={validated}
            />
            {errorDisplay && (
              <Text style={styles.errorDisplayStyle}>{errorDisplay}</Text>
            )}
          </View>
        </>
      )}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: wp(25),
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
    marginTop: hp(100),
    fontFamily: 'Poppins-SemiBold',
    color: colors.textBlack,
    fontSize: hp(30),
  },
  titleSubtitle: {
    marginTop: hp(12),
    fontFamily: 'Poppins-Medium',
    // color: colors.textBlack,
    fontSize: hp(14),
    paddingRight: wp(45),
  },
  inputTitle: {
    fontFamily: 'Poppins-Medium',
    paddingLeft: wp(5),
    fontSize: hp(14),
    color: colors.textBlack,
  },
  inputWRapper: {
    marginTop: hp(40),
  },
  buttonWrapper: {
    marginTop: hp(10),
  },
  errorDisplayStyle: {
    marginTop: hp(30),
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    fontSize: hp(16),
    color: 'red',
  },

  // password reset code verify
});
