import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import colors from '../../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';
import {hp, wp} from '../config/dpTopx';
import Input from '../components/Input';
import ButtonV1 from '../components/ButtonV1';
import Loading from '../components/Loading';
import {useDispatch, useSelector} from 'react-redux';
import {signUp} from '../redux/actions/auth';
import {REGISTER_SUCCESS} from '../redux/constants/auth';

export default function StepThree({route, navigation}) {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [disable, setDisable] = useState(true);
  const [eye, setEye] = useState(false);
  const [eye1, setEye1] = useState(false);

  useEffect(() => {
    if (password.length > 4 && passwordAgain.length > 4) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [password, passwordAgain]);

  const isLoading = useSelector(state => state.auth.isLoading);

  const {first_name, last_name, email, phone_number} = route.params;
  const handleRegister = () => {
    if (password !== passwordAgain) {
      alert('password are not the same');
      return;
    }
    dispatch(
      signUp(
        {first_name, last_name, email, phone_number, password},
        onRegSuccess,
      ),
    );
  };
  const onRegSuccess = (data, status) => {
    if (status < 300) {
      dispatch({type: REGISTER_SUCCESS, payload: data});
    }
    console.log(status);
  };
  return (
    <KeyboardAwareScrollView style={styles.container}>
      {/* Password reset first step */}
      {isLoading && <Loading title={'Sign Up'} />}
      <>
        <Text style={styles.titleText}>{'Password'}</Text>
        <Text style={styles.titleSubtitle}>
          Please type a strong password for your own protection
        </Text>
        <View style={styles.inputWRapper}>
          <Input
            placeholder={'Password'}
            value={password}
            is_password={eye ? false : true}
            onInput={text => setPassword(text)}
            icon={eye ? 'eye' : 'eye-off'}
            iconColor={eye && colors.secondary}
            onIconClick={() => setEye(!eye)}
          />
          <Text />
          <Input
            placeholder={'Re-type Password'}
            value={passwordAgain}
            is_password={eye1 ? false : true}
            icon={eye1 ? 'eye' : 'eye-off'}
            iconColor={eye1 && colors.secondary}
            onIconClick={() => setEye1(!eye1)}
            onInput={text => setPasswordAgain(text)}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <ButtonV1
            title={'Sign Up'}
            disabled={disable}
            onClick={handleRegister}
          />
        </View>
        {/* <Text style={styles.wrongEmail}>Skip</Text> */}
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
    position: 'absolute',
    bottom: hp(20),
    alignSelf: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: hp(16),
    color: colors.primary,
  },

  // password reset code verify
});
