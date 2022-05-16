import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import React, {useEffect, useState} from 'react';
import WebView from 'react-native-webview';
import colors from '../../assets/colors/colors';
import {hp, wp} from '../config/dpTopx';
import ButtonV1 from '../components/ButtonV1';
import Input from '../components/Input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import GenreSelection from '../components/GenreSelection';
import ImagePickerOption from '../components/ImagePickerOption';

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

const checkCameraPermission = async () => {
  try {
    const permissionStatus = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    return permissionStatus;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export default function StartNewBook({route, navigation}) {
  const [book_cover, setBookCover] = useState(null);
  const [book_title, setBookTitle] = useState('');
  const [book_description, setBookDescription] = useState('');
  const [isFormCompleted, setFormCompleted] = useState(false);
  const [selectedBookGenre, setSelectedBookGenre] = useState([]);
  const [showGenreSelection, setShowGenreSelection] = useState(false);

  const [showImagePickerOption, setShowImagePickerOption] = useState(false);

  useEffect(() => {
    if (
      book_cover !== null &&
      book_title.length > 3 &&
      selectedBookGenre.length !== 0 &&
      book_description.length > 3
    ) {
      setFormCompleted(true);
    } else {
      setFormCompleted(false);
    }
  }, [book_cover, book_title, selectedBookGenre, book_description]);

  const handleNextPage = () => {
    const book = {
      title: book_title,
      genre: selectedBookGenre,
      book_cover: book_cover,
      description: book_description,
    };
    navigation.navigate('BookPreview', {book: book});
  };

  const handleImagePicker = async () => {
    // check for permission first
    const permissionStatus = await checkCameraPermission();
    if (!permissionStatus) {
      const result = await requestCameraPermission();
      if (result === false) {
        alert('you need to grant camera permission');
        return;
      }
    }

    setShowImagePickerOption(true);
    // then alert modal for camera or image library
  };

  const handleLaunchImageLibrary = async () => {
    let options = {
      mediaType: 'photo',
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
        setBookCover(image);
      }
    });
  };

  const handleLaunchCamera = async () => {
    let options = {
      mediaType: 'image',
      maxWidth: 500,
      maxHeight: 500,
      quality: 1,
    };

    launchCamera(options, response => {
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
        setBookCover(image);
      }
    });
  };

  const handleSetSelectedGenre = genre => {
    setSelectedBookGenre(genre);
    setShowGenreSelection(false);
  };

  const handleImagePickerOption = result => {
    setShowImagePickerOption(false);
    if (result === 'camera') {
      handleLaunchCamera();
    } else {
      handleLaunchImageLibrary();
    }
  };

  return (
    <>
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
          {book_cover !== null && (
            <Image
              source={{uri: book_cover.uri}}
              style={{width: '100%', height: '100%'}}
            />
          )}
          {book_cover === null && (
            <Text style={styles.bookCoverWrapperText}>Book Cover</Text>
          )}
        </View>
        <Text style={styles.uploadTextHelper}>
          Click button below to add your book cover
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
          onInput={setBookTitle}
          autoCapitalize={'words'}
        />
        <Text />
        {/* list of selected genre */}

        <Pressable
          style={styles.genrePlaceHolder}
          onPress={() => setShowGenreSelection(true)}>
          {selectedBookGenre.length !== 0 ? (
            <View style={styles.genreWrapper}>
              {selectedBookGenre.map(item => (
                <Text key={item.id} style={styles.genreListText}>
                  {item.name}
                </Text>
              ))}
            </View>
          ) : (
            <Text style={styles.genreText}>Genre</Text>
          )}
        </Pressable>
        {/* <Input
        style={{backgroundColor: colors.white, color: colors.textBlack}}
        placeholder={'Genre'}
        onInput={setBookGenre}
      /> */}
        <Text />
        <Input
          style={{backgroundColor: colors.white, color: colors.textBlack}}
          placeholdeprofiler={'Book Description'}
          multiline={true}
          numberOfLines={5}
          onInput={setBookDescription}
        />
        <ButtonV1
          disabled={isFormCompleted ? false : true}
          title={'NEXT'}
          style={{marginTop: hp(10), marginBottom: hp(30), borderRadius: 5}}
          onClick={handleNextPage}
        />
      </ScrollView>
      {showGenreSelection && (
        <GenreSelection
          onAddBookGenre={handleSetSelectedGenre}
          onCloseClick={() => setShowGenreSelection(false)}
          selected_genre={selectedBookGenre}
        />
      )}
      {showImagePickerOption && (
        <ImagePickerOption
          onOptionSelect={handleImagePickerOption}
          hideOption={setShowImagePickerOption}
        />
      )}
    </>
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
    overflow: 'hidden',
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
  genrePlaceHolder: {
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 2,
    paddingVertical: 10,
    borderColor: colors.grey,
    borderRadius: 10,
  },
  genreText: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(14),
    color: colors.grey,
    paddingHorizontal: wp(20),
    backgroundColor: '#FAFAFA',
  },
  genreWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  genreListText: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(12),
  },
});
