import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import colors from '../../assets/colors/colors';
import {hp, wp} from '../config/dpTopx';

export default function ImagePickerOption({
  hideOption = () => {},
  onOptionSelect = () => {},
}) {
  return (
    <>
      <Pressable style={styles.container} onPress={() => hideOption(false)}>
        <View style={styles.optionWrapper}>
          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => onOptionSelect('camera')}>
            <Text style={styles.optionText}>Take a photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => onOptionSelect('gallery')}>
            <Text style={styles.optionText}>Choose existing photo</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    // zIndex: 99,
  },
  optionWrapper: {
    backgroundColor: colors.white,
    padding: hp(10),
  },
  optionItem: {
    width: wp(250),
    margin: 10,
  },
  optionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: hp(16),
  },
});
