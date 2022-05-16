import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import colors from '../../assets/colors/colors';
import SearchBoxFull from '../components/SearchBoxFull';
import {hp} from '../config/dpTopx';
import {searchBook} from '../redux/actions/books';

const DATA = [
  {id: 1, text: 'Mai Tafiya'},
  {id: 2, text: 'My Name is Khan'},
  {id: 3, text: 'Mr India'},
  {id: 4, text: 'Bello Sani'},
  {id: 5, text: 'Ismail Yakubu'},
  {id: 6, text: 'Suwaga Babban Gaye'},
  {id: 7, text: 'Lawan Yau'},
  {id: 8, text: 'Bur Kuce Yazo'},
  {id: 9, text: 'Wai ma dai'},
  {id: 10, text: 'Sharring Kwaya'},
];

export default function Search({navigation}) {
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const dispatch = useDispatch();

  const handleBackButton = () => {
    navigation.navigate('Home');
  };

  const handleClearText = () => {
    setSearch('');
  };

  const handleSearch = () => {
    if (search === '') {
      return;
    }
    setIsSearching(true);

    dispatch(searchBook(search, handleSearchFinish));

    // const result = DATA.filter(data =>
    //   data.text.toLowerCase().includes(search.toLowerCase()),
    // );
    // navigation.navigate('SearchResult', {
    //   search: search,
    //   result: result,
    // });
  };

  const handleSearchFinish = (data, status) => {
    setIsSearching(false);
    if (status < 300) {
      navigation.navigate('SearchResult', {
        search: search,
        result: data,
      });
    }
  };

  return (
    <View style={styles.container}>
      <SearchBoxFull
        value={search}
        onBackButtonClick={handleBackButton}
        onInput={setSearch}
        onInputFocus={() => setIsSearching(false)}
        onClearClick={handleClearText}
        onSubmitClick={handleSearch}
      />
      {isSearching && (
        <View style={styles.bodyWrapper}>
          <ActivityIndicator size={hp(40)} color={colors.primary} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  bodyWrapper: {
    flex: 1,
    // backgroundColor: 'red',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
