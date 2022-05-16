import {
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
  View,
  FlatList,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';
import {hp} from '../config/dpTopx';
import Loading from '../components/Loading';
import {useDispatch} from 'react-redux';
import {getBookGenre} from '../redux/actions/books';

const Item = ({item, selectedItem, onGenreClick = () => {}}) => {
  const checkIfSelected = id => {
    if (selectedItem.length < 1) {
      return false;
    }

    const isSelected = selectedItem.filter(gen => gen.id === id);
    if (isSelected.length < 1) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <Pressable
      style={[
        styles.genreWrapper,
        checkIfSelected(item.id) && {backgroundColor: colors.primary},
      ]}
      onPress={() => onGenreClick(item.id)}>
      <Text
        style={[
          styles.genreText,
          checkIfSelected(item.id) && {color: colors.textWhite},
        ]}>
        {item.name}
      </Text>
    </Pressable>
  );
};

export default function GenreSelection({
  selected_genre = [],
  onAddBookGenre = () => {},
  onCloseClick = () => {},
}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [bookGenre, setBookGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(selected_genre);

  const renderItem = ({item}) => (
    <Item
      onGenreClick={handleSelection}
      item={item}
      selectedItem={selectedGenre}
    />
  );

  useEffect(() => {
    dispatch(getBookGenre(handleResp));
  }, []);

  const handleSelection = id => {
    if (selectedGenre.length > 0) {
      const isSelected = selectedGenre.filter(
        selected_gen => selected_gen.id === id,
      );
      if (isSelected.length !== 0) {
        const selected_genr = selectedGenre.filter(
          selected_genre => selected_genre.id !== id,
        );
        setSelectedGenre(selected_genr);
        return;
      }
    }
    const book_selected = bookGenre.filter(item => item.id === id);
    if (selectedGenre.length === 3) {
      // max limit of genre selection reach, return and do nothing
      alert('you can only select 3 genre');
      return;
    }
    if (book_selected.length < 1) {
      // if for some reason error occur and data not found
      return;
    }

    const genre = [...selectedGenre, book_selected[0]];
    setSelectedGenre(genre);
  };
  const handleResp = (data, status) => {
    if (status < 300) {
      setBookGenre(data);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.headerWrapper}>
        <TouchableOpacity style={styles.closeButton} onPress={onCloseClick}>
          <Feather name="x" size={hp(30)} color={colors.black} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.closeButton, {flexDirection: 'row'}]}
          onPress={() => onAddBookGenre(selectedGenre)}>
          <Text style={styles.addTextStyle}>ADD</Text>
          <Feather name="chevron-right" size={hp(30)} color={colors.black} />
        </TouchableOpacity>
      </View>

      {/* end */}

      <>
        {bookGenre.length < 1 ? (
          <View style={styles.errorWrapper}>
            <Text style={styles.errorMessage}>Something went wrong</Text>
          </View>
        ) : (
          <View style={{marginTop: 20}}>
            <FlatList
              extraData={selectedGenre}
              data={bookGenre}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 50}}
            />
          </View>
        )}
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: colors.background,
    zIndex: 9999,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {},
  addTextStyle: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(14),
    color: colors.textBlack,
  },
  errorWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    fontFamily: 'Poppins-Regular',
  },

  genreWrapper: {
    backgroundColor: '#f4f4f4',
    margin: 10,
    padding: 10,
    borderRadius: 20,
  },
  genreText: {
    fontFamily: 'Poppins-Regular',
    color: colors.primary,
  },
});
