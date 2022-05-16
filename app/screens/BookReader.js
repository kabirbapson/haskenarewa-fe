import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Pressable,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import colors from '../../assets/colors/colors';
import {hp, wp} from '../config/dpTopx';
import Button from '../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../components/Loading';
import {getBookContent, readBook} from '../redux/actions/books';

const fontStyleItem = [
  {id: 1, top: 'Aa', bottom: 'Default', value: 'Poppins-Regular'},
  {id: 2, top: 'Aa', bottom: 'Serif', value: 'serif'},
  {id: 3, top: 'Aa', bottom: 'Mono', value: 'mono'},
];

const BookRender = ({item, textStyle, textSize, isDarkMode}) => (
  <View style={{width: '100%', marginTop: hp(20)}}>
    <Text style={[styles.bookTitle, isDarkMode && {color: colors.secondary}]}>
      {item.chapter}
    </Text>
    <Text
      style={[
        styles.bookBody,
        {fontFamily: textStyle.value, fontSize: textSize[0]},
        isDarkMode && {color: colors.white},
      ]}>
      {item.content}
    </Text>
    {/* <Text>Footer</Text> */}
  </View>
);

export default function BookViewer({route, navigation}) {
  const [textStyle, setTextStyle] = useState(fontStyleItem[0]);
  const [fontSize, setFontsize] = useState([16]);
  const [darkMode, setDarkMode] = useState(false);
  const renderBookContent = ({item}) => (
    <BookRender
      item={item}
      textSize={fontSize}
      textStyle={textStyle}
      isDarkMode={darkMode}
    />
  );
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [book_content, setBookContent] = useState([]);
  const [edit, setEdit] = useState(false);

  const {book} = route.params;

  useEffect(() => {
    addToReadingList();
    fetchBookContent();
  }, []);

  const addToReadingList = () => {
    dispatch(readBook(book.id));
    // setIsLoading(false);
  };

  const fetchBookContent = () => {
    dispatch(getBookContent(book.id, handleBookContent));
  };

  const handleBookContent = (data, status) => {
    if (status < 300) {
      setBookContent(data);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading title={`${'Loading your book\nPlease wait...'}`} />;
  }

  return (
    <>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={[styles.backButtonWrapper]}
          onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" color={colors.black} size={25} />
          <Text style={styles.backButtonTitle} numberOfLines={1}>
            {book.title}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.backButtonWrapper]}
          onPress={() => setEdit(!edit)}>
          <Text style={styles.backButtonTitle}>Aa</Text>
          <Text style={styles.backButtonTitle}>Adjust</Text>
        </TouchableOpacity>
      </View>

      <View
        style={[styles.container, darkMode && {backgroundColor: colors.black}]}>
        {/* <View style={styles.headerTitleWrapper}>
          <Text
            style={[styles.bookTitle, darkMode && {color: colors.secondary}]}>
            {book.title}
          </Text>
          <Text
            style={[styles.bookAuthor, darkMode && {color: colors.secondary}]}>
            <Text
              style={darkMode ? {color: colors.white} : {color: colors.black}}>
              by
            </Text>{' '}
            {book.author}
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Italic',
              fontSize: hp(15),
              color: colors.textBlack,
              textAlign: 'center',
              marginVertical: hp(30),
            }}>
            Book Content goes here
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: hp(15),
              color: colors.textBlack,
              paddingHorizontal: 10,
            }}></Text>
        </View> */}
        <FlatList
          data={book_content}
          renderItem={renderBookContent}
          keyExtractor={item => item.id}
          snapToAlignment="start"
          decelerationRate={'fast'}
          snapToInterval={Dimensions.get('window').width}
        />
      </View>
      {edit && (
        <>
          <Pressable
            style={styles.fullScreenOverlay}
            onPress={() => setEdit(!edit)}
          />
          <View style={styles.bottomEditor}>
            <Text style={styles.editorCategoryText}>SIZE</Text>
            <View style={styles.themeSizeWrapper}>
              <Text style={styles.themeSizeTextLeft}>Aa</Text>
              <MultiSlider
                min={13}
                max={23}
                values={fontSize}
                onValuesChange={value => setFontsize(value)}
                sliderLength={hp(260)}
                selectedStyle={{backgroundColor: colors.primary, height: hp(5)}}
                // eslint-disable-next-line react-native/no-inline-styles
                trackStyle={{height: hp(4), borderRadius: 20}}
                // eslint-disable-next-line react-native/no-inline-styles
                markerStyle={{
                  backgroundColor: colors.primary,
                  height: 14,
                  width: 14,
                  marginTop: hp(3),
                }}
              />
              <Text style={styles.themeSizeTextRight}>Aa</Text>
            </View>
            <Text style={styles.editorCategoryText}>STYLE</Text>
            <View style={styles.themeStyleWrapper}>
              {fontStyleItem.map(item => (
                <Pressable
                  key={item.id}
                  style={styles.themeStyleItemWrapper}
                  onPress={() => setTextStyle(item)}>
                  <Text
                    style={[
                      styles.themeStyleItemTop,
                      textStyle.id === item.id && {color: colors.black},
                    ]}>
                    {item.top}
                  </Text>
                  <Text
                    style={[
                      styles.themeStyleItemBottom,
                      textStyle.id === item.id && {color: colors.black},
                    ]}>
                    {item.bottom}
                  </Text>
                </Pressable>
              ))}
            </View>
            <Text style={styles.editorCategoryText}>THEME</Text>
            <View style={styles.themeWrapper}>
              <Text style={styles.themeTitle}>Dark Mode</Text>
              <View style={styles.themeToggleWrapper}>
                <Text style={styles.themeValue}>{darkMode ? 'On' : 'Off'}</Text>
                <TouchableOpacity onPress={() => setDarkMode(!darkMode)}>
                  {darkMode ? (
                    <Feather
                      name="toggle-right"
                      color={colors.primary}
                      size={hp(26)}
                    />
                  ) : (
                    <Feather
                      name="toggle-left"
                      color={colors.black}
                      size={hp(30)}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal: 15,
    paddingBottom: hp(10),
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: hp(70),
    backgroundColor: colors.background,
  },
  backButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    width: wp(140),
    height: hp(40),
    borderRadius: 40,
    paddingHorizontal: 13,
  },
  backButtonTitle: {
    flexWrap: 'wrap',
    fontFamily: 'Poppins-Regular',
    fontSize: hp(14),
    color: colors.black,
    marginLeft: wp(8),
    shadowColor: colors.black,
    shadowOpacity: 0.25,
    elevation: 10,
  },
  headerTitleWrapper: {
    alignSelf: 'center',
    marginTop: hp(28),
  },
  bookTitle: {
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    fontSize: hp(16),
    paddingHorizontal: 30,
    color: colors.primary,
  },
  bookAuthor: {
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    fontSize: hp(14),
    color: colors.primary,
  },
  bookBody: {
    marginTop: hp(32),
    fontFamily: 'Poppins-Regular',
    fontSize: hp(16),
    padding: 5,
    color: colors.black,
    paddingBottom: 150,
  },
  fullScreenOverlay: {
    zIndex: 3,
    position: 'absolute',
    backgroundColor: colors.black,
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  bottomEditor: {
    zIndex: 4,
    width: '100%',
    height: hp(293),
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    paddingTop: hp(42),
    paddingHorizontal: 25,
    backgroundColor: colors.white,
  },
  editorCategoryText: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(14),
    color: '#C4C4C4',
  },
  themeSizeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  themeSizeTextLeft: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(13),
    color: colors.black,
  },
  themeSizeTextRight: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(23),
    color: colors.black,
  },
  themeStyleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  themeStyleItemWrapper: {
    alignItems: 'center',
  },
  themeStyleItemTop: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(30),
    color: '#C4C4C4',
  },
  themeStyleItemBottom: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(13),
    color: '#C4C4C4',
  },
  themeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  themeTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(16),
    color: colors.black,
  },
  themeToggleWrapper: {
    flexDirection: 'row',
  },
  themeValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(16),
    color: colors.black,
    marginTop: hp(1),
    marginRight: wp(5),
  },
});
