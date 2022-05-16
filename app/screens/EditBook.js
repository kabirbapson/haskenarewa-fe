import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import React, {useState} from 'react';
import WebView from 'react-native-webview';
import colors from '../../assets/colors/colors';
import {hp, wp} from '../config/dpTopx';
import ButtonV1 from '../components/ButtonV1';
import Input from '../components/Input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {launchImageLibrary} from 'react-native-image-picker';

export default function EditBook({route, navigation}) {
  const [book, setBook] = useState({});

  const {user_book} = route.params;

  const handleImagePicker = async () => {
    let options = {
      mediaType: 'image',
      maxWidth: 500,
      maxHeight: 500,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
        // alert(response.customButton);
      } else {
        //let source = response;
        // You can also display the image using data:

        let image = {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
        };
        // setBookCover(image);
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}>
          <Feather name={'arrow-left'} size={hp(25)} color={colors.white} />
        </TouchableOpacity>
        {/* <ButtonV1
            title={'Next'}
            style={{width: wp(80), borderRadius: 5, backgroundColor: 'grey'}}
          /> */}
      </View>
      <View style={styles.bookCoverWrapper}>
        <Image
          source={{uri: user_book.book.book_cover}}
          style={{width: '100%', height: '100%'}}
        />
      </View>
      <Text style={styles.uploadTextHelper}>
        Click button below to edit your book cover
      </Text>
      <View
        style={{
          width: '60%',
          justifyContent: 'center',
          alignSelf: 'center',
          marginTop: hp(5),
        }}>
        <ButtonV1
          style={{borderRadius: 5, backgroundColor: colors.secondary}}
          onClick={handleImagePicker}
        />
        <Feather
          name="camera"
          color={colors.white}
          size={30}
          style={{position: 'absolute', alignSelf: 'center'}}
        />
      </View>
      <Text />
      <Input
        style={{backgroundColor: colors.white, color: colors.textBlack}}
        placeholder={'Book Title'}
        value={user_book.book.title}
        autoCapitalize={'words'}
      />
      <Text />
      <Input
        style={{backgroundColor: colors.white, color: colors.textBlack}}
        placeholder={'Genre'}
      />
      <Text />
      <Input
        style={{backgroundColor: colors.white, color: colors.textBlack}}
        placeholder={'Book Description'}
        multiline={true}
        value={user_book.book.book_summary}
        numberOfLines={5}
      />
      <ButtonV1
        title={'Update Book'}
        style={{marginTop: hp(10), marginBottom: hp(30), borderRadius: 5}}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: colors.background,
    paddingHorizontal: 25,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0, 0.25)',
  },
  headerText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: hp(16),
    color: colors.textBlack,
  },
  bookCoverWrapper: {
    marginTop: hp(21),
    width: wp(150),
    height: hp(200),
    backgroundColor: colors.primary,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  bookCoverWrapperText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: hp(16),
    color: colors.white,
  },
  uploadTextHelper: {
    marginTop: hp(15),
    fontFamily: 'Poppins-Regular',
    fontSize: hp(16),
    color: colors.grey,
    textAlign: 'center',
    paddingHorizontal: 30,
  },
});
