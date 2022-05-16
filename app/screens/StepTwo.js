import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import colors from '../../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';
import {hp, wp} from '../config/dpTopx';
import Input from '../components/Input';
import ButtonV1 from '../components/ButtonV1';
import {useSelector} from 'react-redux';
import PhoneInput from 'react-native-phone-number-input';

export default function StepTwo({route, navigation}) {
  const {email} = route.params;
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [disable, setButtonDisable] = useState(true);

  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef(null);

  useEffect(() => {
    if (first_name.length > 3 && last_name.length > 3 && phone_number > 3) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [first_name, last_name, phone_number]);

  const validatePhone = () => {
    console.log(phoneInput.current?.isValidNumber(phone_number));
    if (!phoneInput.current?.isValidNumber(phone_number)) {
      alert('Not a valid phone number');
      return false;
    }
    return true;
  };

  const handleSetPhoneNumber = text => {
    if (Number(text) || text === '' || text === '0') {
      setPhoneNumber(text);
    }
  };

  const handleContinue = () => {
    if (!validatePhone()) {
      return;
    }

    navigation.navigate('StepThree', {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone_number: phone_number,
    });
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      {/* Password reset first step */}

      <>
        <Text style={styles.titleText}>{'Personal\nInformation'}</Text>
        <Text style={styles.titleSubtitle}>
          Fill in your personal information
        </Text>
        <View style={styles.inputWRapper}>
          <Input
            placeholder={'First Name'}
            value={first_name}
            onInput={text => setFirstName(text)}
            type={'default'}
          />
          <Text />
          <Input
            placeholder={'Last Name'}
            type={'default'}
            value={last_name}
            onInput={text => setLastName(text)}
          />
          <Text />
          {/* <Input
            placeholder={'Phone Number'}
            type={'numeric'}
            value={phone_number}
            onInput={text => handleSetPhoneNumber(text)}
          />
          <Text /> */}
          <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="NG"
            layout="first"
            containerStyle={styles.phoneNumberInputContainer}
            textContainerStyle={styles.phoneNumberTextStyle}
            textInputStyle={styles.phoneNumberStyleInput}
            onChangeText={text => {
              handleSetPhoneNumber(text);
            }}
            onChangeFormattedText={text => {
              setFormattedValue(text);
            }}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <ButtonV1
            title={'Continue'}
            onClick={handleContinue}
            disabled={disable}
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
    flexDirection: '',
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
  phoneNumberInputContainer: {
    width: '100%',
    borderRadius: hp(10),
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.grey,
  },
  phoneNumberStyleInput: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(14),
    height: hp(50),
    marginTop: hp(7),
    color: colors.textBlack,
    backgroundColor: '#FAFAFA',
  },
  phoneNumberTextStyle: {
    padding: 0,
    height: hp(50),
    backgroundColor: '#FAFAFA',
  },

  // password reset code verify
});
