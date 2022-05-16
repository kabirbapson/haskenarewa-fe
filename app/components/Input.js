import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {hp, wp} from '../config/dpTopx';
import colors from '../../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';

export default function Input({
  placeholder,
  is_password = false,
  icon = false,
  value,
  onInput = () => {},
  iconColor,
  onIconClick,
  type,
  max,
  style,
  multiline,
  numberOfLines,
  autoCapitalize = 'none',
  containerStyle = {},
}) {
  const [isFocus, setFocus] = useState(false);

  return (
    <View
      style={[
        styles.container,
        containerStyle,
        isFocus && {borderColor: colors.secondary},
      ]}>
      <TextInput
        autoCapitalize={autoCapitalize}
        placeholder={placeholder}
        keyboardType={type}
        placeholderTextColor={'#B9B9B9'}
        style={[
          styles.inputStyle,
          style,
          icon !== false && {paddingRight: wp(45)},
        ]}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        secureTextEntry={is_password}
        value={value}
        maxLength={max}
        onChangeText={input => onInput(input)}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={'top'}
      />
      {icon !== false && (
        <TouchableOpacity style={styles.inputIcon} onPress={onIconClick}>
          <Feather
            name={icon}
            color={iconColor ? iconColor : '#B9B9B9'}
            size={30}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    borderRadius: hp(10),
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.grey,
  },
  inputStyle: {
    height: '100%',
    width: '100%',
    fontFamily: 'Poppins-Medium',
    fontSize: hp(14),
    color: colors.textBlack,
    paddingHorizontal: wp(20),
    backgroundColor: '#FAFAFA',
    // backgroundColor: '#4F4F4F',
  },
  inputIcon: {
    position: 'absolute',
    right: 0,
    paddingRight: wp(16),
  },
});
