/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {color} from 'react-native-reanimated';

import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';

// My Package
import colors from '../../../assets/colors/colors';
import Button from '../../components/Button';
import Card from '../../components/Card';
import HeroCard from '../../components/HeroCard';
import SearchBox from '../../components/SearchBox';
import {wp, hp} from '../../config/dpTopx';

import ButtonV1 from '../../components/ButtonV1';
import Header from '../../components/Header';
import {useIsFocused} from '@react-navigation/native';

const Item = ({item, onReadBook}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => onReadBook(item.book)}
      style={styles.readRecentWrapper}>
      <TouchableOpacity
        style={styles.bookCoverRecent}
        activeOpacity={0.5}
        onPress={() => onReadBook(item.book)}>
        <Image
          source={{uri: item.book.book_cover}}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{width: '100%', height: '100%'}}
        />
      </TouchableOpacity>
      <View style={styles.bookTitleWrapper}>
        <Text style={styles.bookTitleText}>{item.book.title}</Text>
        <Text style={styles.bookAuthorText}>{item.book.author}</Text>
      </View>
    </TouchableOpacity>
  );
};

function ReadingNow({navigation}) {
  const isFocused = useIsFocused();

  const [refreshList, setRefreshList] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(1);

  const [activityItem, setActivityItem] = useState([
    {id: 1, title: 'Recent'},
    {id: 2, title: 'Likes'},
    {id: 3, title: 'Saved'},
  ]);

  const _renderBooks = ({item}) => (
    <Item item={item} onReadBook={handleReadBook} />
  );
  const user = useSelector(state => state.auth.user);
  const reading_list = useSelector(state => state.books.reading_list);
  const like_books = useSelector(state => state.books.like_books);

  // const reading_now = reading_list.books[0];
  const data =
    selectedActivity === 1
      ? reading_list
      : selectedActivity === 2
      ? like_books
      : [];

  const reading_now = reading_list[0];

  const handleContinueReading = () => {
    navigation.navigate('BookReader', {
      book: reading_now.book,
    });
  };

  const handleReadBook = book => {
    navigation.navigate('BookViewer', {
      book: book,
    });
  };

  return (
    <View style={styles.container}>
      {/* Header Wrapper  */}

      <Header
        user={user}
        onCLickSearch={() => navigation.navigate('SearchBox')}
        onProfileClick={() => navigation.navigate('Profile')}
        onCartClick={() => navigation.navigate('ShoppingCart')}
        onNotificationClick={() => navigation.navigate('Notifications')}
      />

      {reading_list.length !== 0 && (
        <TouchableOpacity
          onPress={handleContinueReading}
          style={styles.readingNowContainer}
          activeOpacity={0.8}>
          <View style={styles.bookCover}>
            <Image
              source={{uri: reading_now.book.book_cover}}
              style={{width: '100%', height: '100%'}}
            />
          </View>
          <View style={styles.readingNowInfoWrapper}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: hp(12),
                color: colors.secondary,
              }}>
              Continue Reading
            </Text>
            <Text style={styles.bookTitle} numberOfLines={2}>
              {reading_now.book.title}
            </Text>
            <Text style={styles.bookAuthor}>{reading_now.book.author}</Text>
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                backgroundColor: '#eeeeee',
                width: wp(160),
                height: hp(5),
                marginTop: hp(5),
              }}>
              <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  width: '72%',
                  height: '100%',
                  backgroundColor: colors.black,
                }}
              />
            </View>
            <Text style={styles.readingPercentText}>72% Completed</Text>
          </View>
        </TouchableOpacity>
      )}
      <View style={styles.activityContainer}>
        {activityItem.map(item => (
          <TouchableOpacity
            onPress={() => setSelectedActivity(item.id)}
            activeOpacity={0.7}
            style={[
              styles.activityItem,
              selectedActivity === item.id && {
                borderBottomWidth: 2,
                borderBottomColor: '#000',
              },
            ]}
            key={item.id}>
            <Text style={styles.activityItemText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <>
        {data.length === 0 ? (
          <View style={styles.containerWrapper}>
            <Text style={styles.activityEmptyText}>
              You have not{' '}
              <Text style={styles.activityItemTextTitle}>
                {selectedActivity.title}
              </Text>{' '}
              Book
            </Text>
          </View>
        ) : (
          <FlatList
            extraData={data}
            data={data}
            renderItem={_renderBooks}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        )}
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: colors.white,
    paddingHorizontal: 25,
  },

  readingNowHeader: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    color: colors.textBlack,
  },
  readingNowContainer: {
    marginTop: hp(30),
    height: hp(200),
    backgroundColor: '#fafafa',

    width: '100%',
    // borderRadius: 10,
    // justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: wp(17),
    paddingLeft: wp(10),
  },
  bookCover: {
    backgroundColor: colors.black,
    width: wp(124),
    height: hp(190),
    borderRadius: 10,
    marginBottom: 20,
  },
  readingNowInfoWrapper: {
    height: hp(200),
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingHorizontal: wp(15),
    paddingVertical: hp(15),
    // backgroundColor: 'red',
    // justifyContent: 'space-between',
  },
  bookTitle: {
    color: colors.black,
    fontFamily: 'Poppins-Medium',
    fontSize: hp(16),
    // backgroundColor: 'red',
    width: wp(180),
  },
  bookAuthor: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(12),
    color: '#8f8b8b',
  },
  bookStatisticWrapper: {
    flexDirection: 'row',
    marginBottom: hp(15),
  },
  statisticWrapper: {
    marginTop: hp(25),
    marginRight: wp(9),
    flexDirection: 'row',
    width: wp(50),
    height: hp(30),
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  readingPercentText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    marginLeft: hp(95),
  },
  activityContainer: {
    marginTop: hp(20),
    // backgroundColor: 'red',
    height: hp(50),
    borderBottomWidth: 3,
    flexDirection: 'row',
    borderBottomColor: '#fafafa',
  },
  activityItem: {
    marginTop: 2,
    height: '100%',
    marginRight: wp(20),
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  activityItemText: {
    fontFamily: 'Poppins-Medium',
    color: colors.textBlack,
  },
  containerWrapper: {
    marginTop: hp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityEmptyText: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(18),
    color: colors.black,
  },
  activityItemTextTitle: {
    color: colors.secondary,
  },
  statisticText: {
    marginLeft: wp(2),
    marginTop: hp(2),
    fontFamily: 'Poppins-Medium',
    fontSize: hp(10),
    color: colors.black,
  },
  readRecentHeader: {
    marginTop: hp(33),
    fontFamily: 'Poppins-Regular',
    fontSize: hp(20),
    // backgroundColor: 'red',
  },
  readRecentWrapper: {
    marginTop: hp(10),
    height: hp(90),
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingLeft: hp(5),
  },
  bookCoverRecent: {
    width: wp(70),
    height: hp(70),
    borderRadius: 10,
    backgroundColor: colors.black,
    overflow: 'hidden',
    shadowColor: colors.black,
    elevation: 30,
  },
  bookTitleWrapper: {
    height: '100%',
    paddingLeft: 10,
    justifyContent: 'center',
  },
  bookTitleText: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(14),
    marginBottom: hp(5),
    color: colors.textBlack,
    // backgroundColor: 'red',
    width: '100%',
  },
  bookAuthorText: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(14),
  },
  readProgressWrapper: {
    marginTop: hp(7),
    flexDirection: 'row',
    width: wp(132),
    alignItems: 'center',
  },
  progressBar: {
    backgroundColor: '#606B96',
    width: hp(110),
    height: hp(5),
  },
  progressBarText: {
    fontFamily: 'Poppins-Regular',
    fontSize: hp(10),
    marginRight: wp(7),
  },
});

export default ReadingNow;
