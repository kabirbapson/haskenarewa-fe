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
  Alert,
  FlatList,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';

// My Package
import colors from '../../../assets/colors/colors';
import {wp, hp} from '../../config/dpTopx';
import ButtonV1 from '../../components/ButtonV1';
import {logUserOut} from '../../redux/actions/auth';

const Item = ({item, onReadBook = () => {}}) => {
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

function Profile({navigation}) {
  const _renderBooks = ({item}) => (
    <Item item={item} onReadBook={handleReadBook} />
  );

  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const user_library = useSelector(state => state.books.user_library);
  const follow = useSelector(state => state.auth.follow);
  const like_books = useSelector(state => state.books.like_books);
  const [selectedCategory, setSelectedCategory] = useState(1);

  const [selectedActivity, setSelectedActivity] = useState(1);

  const [activityItem, setActivityItem] = useState([
    {id: 1, title: 'LIbrary'},
    {id: 2, title: 'Like'},
    // {id: 3, title: 'Whatever'}
  ]);

  const followers = follow.filter(item => item.following.id === user.id);
  const following = follow.filter(item => item.following.id !== user.id);

  const handleUserLogOut = () => {
    Alert.alert('Sign Out', 'You are about to sign out?', [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => dispatch(logUserOut()),
        style: 'default',
      },
    ]);
  };

  const kFormat = num => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
      : Math.sign(num) * Math.abs(num);
  };

  const items = [
    // {id: 2, title: 'Likes', value: user.likes},
    {id: 1, title: 'Following', value: kFormat(following.length)},
    {id: 2, title: 'Books', value: '0'},
    {id: 3, title: 'Followers', value: kFormat(followers.length)},
  ];

  const data =
    selectedActivity === 1
      ? user_library
      : selectedActivity === 2
      ? like_books
      : [];

  const handleReadBook = book => {
    navigation.navigate('BookViewer', {
      book: book,
    });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButtonWrapper}
            onPress={() => navigation.goBack()}>
            <Feather name="x" color={colors.white} size={hp(25)} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity
            style={styles.backButtonWrapper}
            onPress={() => navigation.navigate('EditProfile')}>
            <FontAwesome name="user-edit" color={colors.white} size={hp(20)} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileImageWrapper}>
          <Image
            source={{uri: user.profile_picture}}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.authorNameWrapper}>
          <Text style={styles.userName}>
            {user.first_name} {user.last_name}
          </Text>
          {user.is_verified && (
            <MaterialIcons name="verified" size={20} color={colors.primary} />
          )}
        </View>
        <Text style={styles.userBio}>{user.about_me}</Text>

        <View style={styles.followBookLikeWrapper}>
          {items.map(item => (
            <View key={item.id} style={styles.textWrapper}>
              <Text style={styles.textAmount}>{item.value}</Text>
              <Text style={styles.textTitle}>{item.title}</Text>
            </View>
          ))}
        </View>
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
                <Text style={styles.activityItemTextTitle}>
                  {'You have no Books\nin your library'}
                </Text>
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
      <View style={{position: 'absolute', width: '30%', bottom: 20, right: 20}}>
        <ButtonV1
          onClick={handleUserLogOut}
          title={'Log out'}
          style={{backgroundColor: colors.secondary}}
        />
      </View>
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButtonWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#c4c4c4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: hp(16),
    color: colors.black,
    // textAlign: 'center',
    // marginLeft: wp(80),
  },
  editProfileButton: {
    alignItems: 'center',
    // paddingVertical: hp(5),
    paddingHorizontal: wp(10),
    // backgroundColor: colors.secondary,
    borderWidth: 1,
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginBottom: hp(10),
  },
  editProfileText: {
    fontFamily: 'Poppins-Bold',
    fontSize: hp(14),
    color: colors.textBlack,
  },
  profileImageWrapper: {
    marginTop: hp(20),
    width: 130,
    height: 130,
    borderRadius: 100,
    backgroundColor: colors.black,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.white,
    overflow: 'hidden',
  },
  profileImage: {
    width: 130,
    height: 130,
  },
  authorNameWrapper: {
    marginTop: hp(10),
    // backgroundColor: 'red',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontFamily: 'Poppins-Bold',
    fontSize: hp(20),
    color: colors.black,
    textAlign: 'center',
    marginRight: wp(2),
    marginTop: hp(3),
  },
  userBio: {
    // marginTop: hp(13),
    // marginBottom: hp(12),
    // fontFamily: 'Poppins-Medium',
    // fontSize: hp(14),
    // paddingHorizontal: 20,
    // color: colors.grey,
    // textAlign: 'center',
    width: wp(275),
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'Poppins-light',
    color: colors.black,
    fontSize: hp(14),
    marginTop: hp(13),
    marginBottom: hp(17),
  },
  followBookLikeWrapper: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    marginTop: hp(5),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
  },
  textWrapper: {
    alignItems: 'center',
    marginHorizontal: wp(15),
  },
  textTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: hp(14),
    color: colors.grey,
  },
  textAmount: {
    fontFamily: 'Poppins-Bold',
    fontSize: hp(16),
    color: colors.black,
  },
  categoriesHeader: {
    marginTop: hp(5),
    // height: hp(60),
    flexDirection: 'row',
    borderBottomWidth: 0.3,
    borderBottomColor: colors.grey,
    // backgroundColor: 'red',
    width: '100%',
  },
  categoryItemWrapper: {
    height: '100%',
    paddingHorizontal: wp(10),
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingVertical: hp(15),
  },
  categoryItem: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(14),
    // height: '100%',

    color: colors.black,
    // backgroundColor: 'red',
    paddingVertical: hp(16),
  },
  underline: {
    width: '100%',
    height: 1,
    backgroundColor: colors.grey,
  },
  profileSettingWrapper: {
    backgroundColor: colors.white,
    marginTop: hp(30),
    width: '100%',
    height: hp(200),
    flex: 1,
    borderRadius: 20,
    padding: 20,
  },
  profileItemWrapper: {
    marginTop: hp(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTextTitle: {
    marginTop: hp(4),
    marginLeft: wp(14),
    fontFamily: 'Poppins-Bold',
    fontSize: hp(16),
    color: colors.black,
  },
  iconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 5,
    backgroundColor: '#EFEDF2',
    justifyContent: 'center',
    alignItems: 'center',
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
    textAlign: 'center',
  },
  activityItemTextTitle: {
    color: colors.secondary,
    textAlign: 'center',
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
    backgroundColor: colors.white,
    paddingLeft: hp(5),
  },
  bookCoverRecent: {
    width: wp(50),
    height: hp(70),
    borderRadius: 4,
    backgroundColor: colors.black,
    overflow: 'hidden',
    shadowColor: colors.black,
    elevation: 10,
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

export default Profile;
