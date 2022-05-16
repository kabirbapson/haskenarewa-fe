import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {hp, wp} from '../config/dpTopx';
import Button from '../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../components/Loading';
import {getAuthorProfile} from '../redux/actions/books';
import ButtonV1 from '../components/ButtonV1';
import {followUser, unFollowUser} from '../redux/actions/auth';

const BooksItem = ({item, onBookClick}) => (
  <View style={styles.bookItemWrapper}>
    <TouchableOpacity
      style={styles.bookCover}
      onPress={() => onBookClick(item)}>
      <Image
        source={{uri: item.book_cover}}
        style={{width: '100%', height: '100%'}}
      />
    </TouchableOpacity>
    <Text style={styles.bookName} numberOfLines={1}>
      {item.title}
    </Text>
    <Text style={styles.bookAuthor}>{item.author}</Text>
  </View>
);

export default function AuthorProfile({route, navigation}) {
  const Books = ({item}) => (
    <BooksItem item={item} onBookClick={handleBookClick} />
  );
  const renderBooks = ({item}) => <Books item={item} />;

  const dispatch = useDispatch();
  const [author, setAuthor] = useState({});
  const [author_books, setAuthorBooks] = useState([]);
  const [following, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const follow = useSelector(state => state.auth.follow);
  const {book_id} = route.params;

  const handleBookClick = book => {
    navigation.navigate('BookViewer', {
      book: book,
    });
  };
  useEffect(() => {
    setIsLoading(true);
    fetchUserProfile();
  }, []);

  const fetchUserProfile = () => {
    dispatch(getAuthorProfile(book_id, handleResp));
  };

  const handleFollow = () => {
    const isFollow = follow.filter(item => item.following.id === author.id);
    if (isFollow.length !== 0) {
      dispatch(unFollowUser(author.id));
      setIsFollowing(false);
      const new_author = {...author, followers: author.followers - 1};
      setAuthor(new_author);
      return;
    }

    dispatch(followUser(author.id));
    const new_author = {...author, followers: author.followers + 1};
    setAuthor(new_author);
    setIsFollowing(true);
  };

  const handleResp = (data, status) => {
    if (status < 300) {
      setAuthor(data.author);
      setAuthorBooks(data.books);
      const isFollow = follow.filter(
        item => item.following.id === data.author.id,
      );
      if (isFollow.length !== 0) {
        setIsFollowing(true);
      }
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading title={'Loading...'} />;
  }
  return (
    <View style={styles.container}>
      {/* header wrapper  */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButtonWrapper}
          onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" color={colors.white} size={hp(25)} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {author.first_name} {author.last_name}
        </Text>
        <TouchableOpacity style={styles.backButtonWrapper}>
          <Entypo
            name="dots-three-vertical"
            size={hp(25)}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.authorProfileIcon}>
        <Image
          source={{uri: author.profile_picture}}
          style={{width: '100%', height: '100%'}}
        />
      </View>
      <View style={styles.authorNameWrapper}>
        <Text style={styles.authorName}>
          {author.first_name} {author.last_name}
        </Text>
        {author.is_verified && (
          <MaterialIcons name="verified" size={20} color={colors.primary} />
        )}
      </View>
      <Text style={styles.authorBio}>{author.about_me}</Text>

      <View style={styles.followBookLikeWrapper}>
        <View style={styles.textWrapper}>
          <Text style={styles.textAmount}>{author.followers}</Text>
          <Text style={styles.textTitle}>Follower</Text>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.textAmount}>{author.my_books}</Text>
          <Text style={styles.textTitle}>Books</Text>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.textAmount}>{author.likes}</Text>
          <Text style={styles.textTitle}>Likes</Text>
        </View>
      </View>
      <View style={styles.underline} />

      <ButtonV1
        title={following ? 'Unfollow' : 'Follow'}
        textStyle={{fontFamily: 'Poppins-SemiBold', fontSize: hp(14)}}
        style={{borderRadius: 10}}
        buttonStyle={following && 'outline'}
        onClick={handleFollow}
      />
      <View style={styles.listItemWrapper}>
        <Text style={styles.bookListHeaderTitle}>Recent Books</Text>
        <FlatList
          data={author_books}
          renderItem={renderBooks}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
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
    fontFamily: 'Poppins-Medium',
    fontSize: hp(16),
    // marginLeft: wp(80),
  },
  authorProfileIcon: {
    marginTop: hp(40),
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.secondary,
    borderWidth: 2,
    borderColor: colors.white,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  authorNameWrapper: {
    marginTop: hp(10),
    // backgroundColor: 'red',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorName: {
    fontFamily: 'Poppins-Bold',
    fontSize: hp(20),
    textAlign: 'center',
    // backgroundColor: 'red',
    marginRight: wp(2),
    marginTop: hp(3),
    color: colors.black,
  },
  authorBio: {
    width: wp(275),
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'Poppins-light',
    color: colors.black,
    fontSize: hp(14),
    marginTop: hp(13),
    marginBottom: hp(17),
  },
  underline: {
    width: '100%',
    height: hp(1),
    backgroundColor: '#c4c4c4',
    marginVertical: hp(10),
  },
  followBookLikeWrapper: {
    flexDirection: 'row',
    marginTop: hp(12),
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp(242),
    alignSelf: 'center',
  },
  textWrapper: {
    alignItems: 'center',
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
  bookItemWrapper: {
    width: wp(82),
    marginRight: wp(15),
  },
  bookCover: {
    width: wp(82),
    height: hp(126),
    borderRadius: 10,
    backgroundColor: colors.secondary,
    overflow: 'hidden',
  },
  bookName: {
    marginTop: hp(4),
    fontFamily: 'Poppins-Medium',
    fontSize: hp(12),
    color: colors.black,
  },
  bookAuthor: {
    fontFamily: 'Poppins-Regular',
    fontSize: hp(12),
    color: '#9d9d9d',
  },
  listItemWrapper: {},
  bookListHeaderTitle: {
    marginTop: hp(18),
    marginBottom: hp(7),
    fontFamily: 'Poppins-Medium',
    fontSize: hp(16),
    color: colors.black,
  },
});
