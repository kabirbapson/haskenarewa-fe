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
import {
  resetPassword,
  resetPasswordChange,
  resetPasswordVerify,
} from '../redux/actions/auth';
import {LOGIN_SUCCESS} from '../redux/constants/auth';

export default function ChangePassword({route, navigation}) {
  const dispatch = useDispatch();
  const [new_password, setNewPassword] = useState('');
  const [new_password_again, setNewPasswordAgain] = useState('');
  const [errorDisplay, setErrorDisplay] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const isLoading = useSelector(state => state.auth.isLoading);

  const {otp, token, email_phone} = route.params;

  useEffect(() => {
    if (new_password.length > 3 && new_password_again.length > 3) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [new_password, new_password_again]);

  const handleChangePassword = () => {
    setErrorDisplay(null);
    if (new_password !== new_password_again) {
      setErrorDisplay('Password does not match');
      return;
    }
    const form = {
      otp: otp,
      email_phone: email_phone,
      new_password,
    };
    console.log(form);
    dispatch(resetPasswordChange(form, token, resetRequestHandler));
  };

  const resetRequestHandler = (data, status) => {
    if (status < 300) {
      dispatch({type: LOGIN_SUCCESS, payload: data});
    }
    console.log(status, data);
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={hp(30)} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerBackText}>Back</Text>
      </View>
      {/* Password reset first step */}
      <View>
        <Text style={styles.titleText}>{'Change\nPassword'}</Text>
        <Text style={styles.titleSubtitle}>
          Please enter a new password below.
        </Text>
        <View style={styles.inputWRapper}>
          <Text style={styles.inputTitle}>New Password</Text>
          <Input
            placeholder={'New Password'}
            value={new_password}
            onInput={text => setNewPassword(text)}
          />
          <Text style={styles.inputTitle}>Confirm New Password</Text>
          <Input
            placeholder={'Confirm new Password'}
            value={new_password_again}
            onInput={text => setNewPasswordAgain(text)}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <ButtonV1
            title={'Change Password'}
            onClick={handleChangePassword}
            disabled={disabled || isLoading}
            child={
              isLoading && (
                <ActivityIndicator size={hp(30)} color={colors.primary} />
              )
            }
            buttonStyle={isLoading && 'outline'}
          />
        </View>
        {errorDisplay && (
          <Text style={styles.errorDisplayStyle}>{errorDisplay}</Text>
        )}
      </View>
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
