import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  BackHandler,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {hp, wp} from '../config/dpTopx';
import colors from '../../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';
import LoadingPart from '../components/LoadingPart';
import {useDispatch} from 'react-redux';
import {editBookContent} from '../redux/actions/books';

export default function Writing({route, navigation}) {
  const dispatch = useDispatch();
  const {book_part} = route.params;
  const [content, setContent] = useState(book_part.content);
  const [loading_type, setLoadingType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [auto_focus, setAutoFocus] = useState(false);
  const [hasUnsavedChanges, setUnSaveChanges] = useState(false);

  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        const action = e.data.action;
        if (!hasUnsavedChanges) {
          return;
        }

        e.preventDefault();

        Alert.alert(
          'Discard changes?',
          'You have unsaved changes. Are you sure to discard them and leave the screen?',
          [
            {text: "Don't leave", style: 'cancel', onPress: () => {}},
            {
              text: 'Discard',
              style: 'destructive',
              onPress: () => navigation.dispatch(action),
            },
          ],
        );
      }),
    [hasUnsavedChanges, navigation],
  );

  useEffect(() => {
    if (content !== book_part.content) {
      setUnSaveChanges(true);
    } else {
      setUnSaveChanges(false);
    }
  }, [content]);
  const saveWork = () => {
    setIsLoading(true);
    setLoadingType('Saving...');
    dispatch(editBookContent({...book_part, content: content}, handleSaveResp));
  };

  const handleSaveResp = (data, status) => {
    if (status < 300) {
      setIsLoading(false);
      setLoadingType('');
      setUnSaveChanges(false);
      return;
    }

    setIsLoading(false);
    setLoadingType('');
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={hp(30)} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Writing</Text>
          <TouchableOpacity onPress={saveWork}>
            <Text
              style={[
                styles.headerText,
                {color: colors.secondary, fontFamily: 'Poppins-Bold'},
              ]}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.chapterWrapper}>
          <Text style={styles.chapterTitleText}>{book_part.chapter}</Text>
        </View>

        <TextInput
          placeholder="Start writing"
          style={styles.inputStyle}
          autoFocus={auto_focus}
          multiline={true}
          value={content}
          onChangeText={text => setContent(text)}
          textAlignVertical={'top'}
        />
      </View>
      {isLoading && <LoadingPart title={loading_type} />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal: 25,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(16),
    color: colors.black,
  },
  chapterWrapper: {
    width: '70%',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: hp(10),
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
  },
  chapterTitleText: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(16),
    color: colors.black,
  },
  inputStyle: {
    flex: 1,
    marginTop: hp(20),
    fontFamily: 'Poppins-Medium',
    fontSize: hp(15),
    padding: 10,
    backgroundColor: colors.white,
  },
});
