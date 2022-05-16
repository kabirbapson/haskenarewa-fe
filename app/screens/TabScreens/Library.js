import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import React, {useEffect} from 'react';
import WebView from 'react-native-webview';
import colors from '../../../assets/colors/colors';
import {hp, wp} from '../../config/dpTopx';
import ButtonV1 from '../../components/ButtonV1';
import {useDispatch, useSelector} from 'react-redux';
import {getUserBooks} from '../../redux/actions/books';

const WorkingOnItem = ({item, onItemClick}) => (
  <TouchableOpacity
    style={styles.continueWorkinOnWrapper}
    activeOpacity={0.5}
    onPress={() => onItemClick(item)}>
    <View style={styles.bookCoverWrapperList}>
      <Image
        source={{uri: item.book.book_cover}}
        style={{width: '100%', height: '100%'}}
      />
    </View>
    <Text style={styles.bookTitleList} numberOfLines={1}>
      {item.book.title}
    </Text>
    <Feather name="chevron-right" color={colors.black} size={30} />
  </TouchableOpacity>
);

export default function Library({route, navigation}) {
  const dispatch = useDispatch();

  const renderContinueWorking = ({item}) => (
    <WorkingOnItem item={item} onItemClick={handleContinueWorking} />
  );
  const user_books = useSelector(state => state.books.user_books);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      dispatch(getUserBooks());
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const handleContinueWorking = book => {
    navigation.navigate('BookWriting', {
      book: book,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}>
          <Feather name={'arrow-left'} size={hp(25)} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerText} numberOfLines={1}>
          Writer space
        </Text>
        <TouchableOpacity
          style={[styles.headerButton, {backgroundColor: colors.background}]}>
          {/* <Feather name={'search'} size={hp(25)} color={colors.white} /> */}
        </TouchableOpacity>
      </View>

      {/* create new book button  */}
      <ButtonV1
        title={'Start new Book'}
        style={{marginTop: hp(20), borderRadius: 5}}
        onClick={() => navigation.navigate('StartNewBook')}
      />

      {/* working on */}
      <Text style={styles.workingOnTitle}>Working on</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={user_books.length < 1 ? true : false}
        onPress={() => handleContinueWorking(user_books[0])}>
        <ImageBackground
          // resizeMode="cover"
          blurRadius={80}
          resizeMethod="scale"
          // source={
          //   user_books.length !== 0 && {uri: user_books[0].book.book_cover}
          // }
          style={styles.bookWorkingWrapper}>
          {user_books.length !== 0 && (
            <>
              <View style={styles.bookCoverWrapper}>
                <Image
                  source={{uri: user_books[0].book.book_cover}}
                  style={{width: '100%', height: '100%'}}
                />
              </View>
              <View style={styles.infoWrapper}>
                <Text style={styles.bookTitle}>{user_books[0].book.title}</Text>

                <Text style={styles.bookGenre}>
                  Genre:{' '}
                  {user_books[0].book.genre.map(genre => `${genre.name}, `)}
                </Text>
                <Text style={styles.bookAuthor}>
                  {user.first_name} {user.last_name}
                </Text>
              </View>
            </>
          )}
        </ImageBackground>
      </TouchableOpacity>

      {/* Continue Working on */}
      <Text style={styles.workingOnTitle}>Continue Working on</Text>
      <FlatList
        data={user_books}
        renderItem={renderContinueWorking}
        keyExtractor={item => item.id}
      />
    </View>
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
  workingOnTitle: {
    marginTop: hp(12),
    fontFamily: 'Poppins-Medium',
    fontSize: hp(14),
    color: colors.textBlack,
  },

  workingOnWrapper: {
    marginTop: hp(5),
    width: '100%',
    height: hp(200),
    backgroundColor: colors.white,
  },

  bookWorkingWrapper: {
    flexDirection: 'row',
    width: '100%',
    height: hp(200),
    backgroundColor: colors.white,
    marginTop: hp(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: wp(17),
  },
  bookCoverWrapper: {
    width: wp(100),
    height: hp(142),
    borderWidth: 2,
    borderColor: colors.background,
    borderRadius: 10,
    marginHorizontal: wp(17),
    overflow: 'hidden',
  },
  infoWrapper: {
    flex: 1,
  },
  bookTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(16),
    color: colors.black,
  },
  bookGenre: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(10),
    color: colors.black,
  },
  bookAuthor: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(14),
    color: colors.grey,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButtonText: {
    fontFamily: 'Poppins-Regular',
  },
  continueWorkinOnWrapper: {
    marginTop: hp(10),
    flexDirection: 'row',
    width: '100%',
    paddingVertical: hp(10),
    paddingHorizontal: wp(15),
    borderRadius: 0,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  bookCoverWrapperList: {
    width: wp(40),
    height: hp(60),
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'black',
  },
  bookTitleList: {
    flex: 1,
    fontFamily: 'Poppins-Medium',
    fontSize: hp(13),
    color: colors.black,
    paddingLeft: 10,
  },
});
