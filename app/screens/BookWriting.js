/* eslint-disable react-native/no-inline-styles */
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  FlatList,
  Pressable,
  Alert,
  Modal,
  BackHandler,
  ActivityIndicator,
  TextInput,
  Animated,
} from 'react-native';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import DocumentPicker, {types} from 'react-native-document-picker';
import Pdf from 'react-native-pdf';
import colors from '../../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {hp, wp} from '../config/dpTopx';
import {useDispatch, useSelector} from 'react-redux';
import ButtonV1 from '../components/ButtonV1';
import Input from '../components/Input';
import {
  addBookContent,
  getBookContent,
  publishBook,
  updateBookType,
  uploadBook,
} from '../redux/actions/books';
import BottomInputAlert from '../components/BottomInputAlert';
import Loading from '../components/Loading';

const Item = ({item, onItemClick}) => {
  return (
    <TouchableOpacity
      style={styles.bookChapterWrapper}
      activeOpacity={0.5}
      onPress={() => onItemClick(item)}>
      <Text style={styles.bookChapterTitle}>{item.chapter}</Text>
      <Feather name="chevron-right" size={hp(30)} color={colors.black} />
    </TouchableOpacity>
  );
};

export default function BookWriting({route, navigation}) {
  const dispatch = useDispatch();
  const {book} = route.params;
  const [books, setBooks] = useState(book);

  const user = useSelector(state => state.auth.user);
  const translation = useRef(new Animated.Value(0)).current;

  const renderPart = ({item}) => (
    <Item item={item} onItemClick={handleOnItemClick} />
  );

  const [bookPart, setBookPart] = useState([]);
  const [bookPrice, setBookPrice] = useState(book.book.price);
  const [isLoading, setIsLoading] = useState(false);
  const [book_part_title, setBookPartTitle] = useState('');
  const [show_add_part, setShowAddPart] = useState(false);
  const [show_publish, setShowPublish] = useState(false);
  const [publishLoading, setPublishIsLoading] = useState(false);

  const [ctIsLoading, setCtIsLoading] = useState(false);
  const [ctSelection, setCtSelection] = useState(false);

  const [pdf_file, setPdfFile] = useState(null);
  const [pdfNumberOfPage, setPdfNumberOfPage] = useState(0);
  const [thumbNail, setThumbNail] = useState(false);
  const source = pdf_file !== null ? {uri: pdf_file[0].uri} : null;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleGetBookContent(book.book.id);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    Animated.timing(translation, {
      toValue: 100,
      useNativeDriver: true,
    }).start();
  }, []);

  // handle back button for models
  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        if (!show_add_part) {
          // If we don't have any model open, then we don't need to do anything
          navigation.dispatch(e.data.action);
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();
        setShowAddPart(false);
      }),
    [navigation, show_add_part],
  );

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [types.pdf],
        copyTo: 'cachesDirectory',
      });
      setPdfFile(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const handleOnItemClick = book_part => {
    navigation.navigate('Writing', {
      book_part: book_part,
    });
  };
  const handleAddPart = () => {
    setShowAddPart(false);
    setIsLoading(true);
    dispatch(
      addBookContent({id: book.id, title: book_part_title}, handleResponse),
    );
    // if (bookPart.length < 1) {
    //   setBookPart([{id: 1, title: title}]);
    //   return;
    // }
    // const last_id = bookPart[bookPart.length - 1].id;
    // setBookPart([...bookPart, {id: last_id + 1, title: title}]);
  };

  const handleResponse = (data, status) => {
    if (status < 300) {
      setBookPart([...bookPart, data]);
      setIsLoading(false);
      return;
    }

    alert('an error occur try again');
    setIsLoading(false);
  };

  const handleGetBookContent = book_id => {
    setIsLoading(true);
    dispatch(getBookContent(book_id, handleOnRequest));
  };

  const handleOnRequest = (data, status) => {
    setIsLoading(false);
    if (status < 300) {
      setBookPart(data);
    }
  };

  const handlePublishBook = () => {
    const data = {
      user_book_id: book.id,
      book_price: bookPrice,
      book_type: books.book.content_type,
    };
    setPublishIsLoading(true);
    dispatch(publishBook(data, handleResStat));
  };

  const handleResStat = (res_data, res_status) => {
    if (res_status === 200) {
      setShowPublish(false);
      alert('your have successfully added a book');
      setPublishIsLoading(false);
      return;
    }
    alert('something went wrong please try again');
    setPublishIsLoading(false);
  };

  const handleAddBookType = book_type => {
    setCtIsLoading(true);
    dispatch(
      updateBookType(
        {user_book_id: book.id, book_type: book_type},
        handleResponseStatus,
      ),
    );
  };

  const handleResponseStatus = (res_data, res_status) => {
    setCtIsLoading(false);
    if (res_status < 300) {
      setBooks(res_data);
    }
  };

  const handleActionButton = () => {
    if (books.book.content_type === 'write') {
      setShowAddPart(!show_add_part);
      return;
    }

    handleDocumentSelection();
  };

  const handleUploadPdf = () => {
    const data = {
      user_book_id: book.id,
      book_pdf: pdf_file,
    };
    dispatch(uploadBook(data, pdfUPloadStatus));
  };

  const pdfUPloadStatus = (res_data, res_status) => {
    console.log(res_data, res_status);
  };

  const visible = books.book.content_type === null ? true : false;

  return (
    <>
      <BottomInputAlert visibility={visible} overlayOpacity={0.9}>
        <View style={styles.ctContainer}>
          <>
            {ctIsLoading ? (
              <ActivityIndicator />
            ) : (
              <>
                <TouchableOpacity
                  style={styles.ctItemWrapper}
                  activeOpacity={0.5}
                  onPress={() => handleAddBookType('pdf')}>
                  <Text style={styles.ctTitleText}>Upload A Book PDF</Text>
                  <Feather
                    name="chevron-right"
                    color={colors.secondary}
                    size={25}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.ctItemWrapper, {marginTop: hp(13)}]}
                  activeOpacity={0.5}
                  onPress={() => handleAddBookType('write')}>
                  <Text style={styles.ctTitleText}>Use Hasken Arewa Tool</Text>
                  <Feather
                    name="chevron-right"
                    color={colors.secondary}
                    size={25}
                  />
                </TouchableOpacity>
              </>
            )}
          </>
        </View>
      </BottomInputAlert>

      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate('Write')}>
            <Feather name={'arrow-left'} size={hp(25)} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate('Write')}>
            <Feather name={'type'} size={hp(25)} color={colors.white} />
          </TouchableOpacity>
        </View>
        {true && (
          <View style={styles.bookWorkingWrapper}>
            <View style={styles.bookCoverWrapper}>
              <Image
                source={{uri: book.book.book_cover}}
                style={{width: '100%', height: '100%'}}
              />
            </View>
            <View style={styles.infoWrapper}>
              <Text style={styles.bookTitle}>{book.book.title}</Text>
              {/* <Text style={styles.bookGenre}>{''}</Text> */}
              <Text style={styles.bookAuthor}>
                {user.first_name} {user.last_name}
              </Text>
              <ButtonV1
                title={'Publish'}
                onClick={() => setShowPublish(!show_publish)}
                style={{borderRadius: 10, marginTop: 10, marginRight: 20}}
                buttonStyle={'outline'}
              />
            </View>
            {/* <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() =>
                navigation.navigate('EditBook', {
                  user_book: book,
                })
              }>
              <Text style={styles.editButtonText}>Edit</Text>
              <Feather name="chevron-right" size={25} color={colors.black} />
            </TouchableOpacity> */}
          </View>
        )}
        <Text style={styles.listOfChapterHeaderText}>
          {books.book.content_type === 'write'
            ? 'Table of content:'
            : 'PDF BOOK'}
        </Text>
        {isLoading ? (
          <View style={{marginTop: 20}}>
            <ActivityIndicator size={'large'} />
          </View>
        ) : books.book.content_type !== 'write' ? (
          // pdf display view components

          <View style={{flex: 1, flexDirection: 'row'}}>
            {source !== null && (
              <>
                <Pressable>
                  <Pdf
                    enablePaging={true}
                    horizontal={true}
                    trustAllCerts={false}
                    source={source}
                    onLoadComplete={(numberOfPages, filePath) => {
                      setPdfNumberOfPage(numberOfPages);
                      setThumbNail(true);
                    }}
                    // singlePage={thumbNail}
                    onError={error => {
                      console.log(error);
                    }}
                    style={styles.bookThumbnail}
                  />
                </Pressable>
                <View
                  style={{
                    height: hp(230),
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <MaterialCommunityIcon
                    name="book-open-page-variant-outline"
                    size={60}
                    color={colors.primary}
                  />
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: colors.secondary,
                      fontSize: hp(18),
                    }}>
                    {pdfNumberOfPage} pages
                  </Text>
                  <ButtonV1
                    onClick={handleUploadPdf}
                    title={'Upload PDF'}
                    style={{
                      paddingHorizontal: wp(16),
                      borderRadius: 10,
                      marginTop: 10,
                    }}
                  />
                </View>
              </>
            )}
          </View>
        ) : (
          // chapter display components
          <FlatList
            data={bookPart}
            renderItem={renderPart}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: hp(100)}}
          />
        )}

        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            position: 'absolute',
            width: '100%',
            bottom: 0,
            paddingVertical: hp(15),
            alignSelf: 'center',
            backgroundColor: colors.background,
          }}>
          {!isLoading && (
            <ButtonV1
              title={
                books.book.content_type === 'write'
                  ? 'Create a new chapter'
                  : pdf_file === null
                  ? 'Pick Book Pdf'
                  : 'Change Book Pdf'
              }
              style={{borderRadius: 10}}
              onClick={handleActionButton}
            />
          )}
        </View>
      </View>

      {/* for adding book part */}

      <BottomInputAlert
        visibility={show_add_part}
        onBlankPress={() => setShowAddPart(!show_add_part)}>
        <View
          style={{
            paddingHorizontal: 30,
            paddingTop: 10,
            justifyContent: 'space-evenly',
            height: '100%',
          }}>
          <Text style={styles.newPartLable}>Add a new part:</Text>
          <Input
            placeholder={'Name of the chapter...'}
            onInput={setBookPartTitle}
          />
          <ButtonV1
            title={'ADD'}
            style={{borderRadius: 10}}
            onClick={handleAddPart}
          />
        </View>
      </BottomInputAlert>

      {/* end */}

      {/* publish price add */}
      <BottomInputAlert
        visibility={show_publish}
        onBlankPress={() => setShowPublish(!show_publish)}>
        {publishLoading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator />
          </View>
        ) : (
          <View style={{paddingHorizontal: 30}}>
            <Text style={styles.bookPriceHelp}>
              Please specify the price of the book, for free books just leave
              the price as zero
            </Text>
            <View style={styles.priceInputWrapper}>
              <Text style={styles.nairaSign}>₦</Text>
              <TextInput
                onChangeText={text => setBookPrice(text)}
                style={styles.priceInputStyle}
                value={bookPrice}
                keyboardType={'numeric'}
              />
            </View>
            <ButtonV1
              title={'Continue'}
              style={{borderRadius: 10}}
              onClick={handlePublishBook}
            />
          </View>
        )}
      </BottomInputAlert>

      {/* end */}
    </>
  );
}

const styles = StyleSheet.create({
  ctContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(50),
  },
  ctItemWrapper: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.secondary,
    paddingVertical: hp(10),
    paddingHorizontal: wp(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
  },
  ctTitleText: {
    fontFamily: 'Poppins-Regular',
    fontSize: hp(14),
    color: colors.secondary,
  },
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
  publishText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: hp(14),
    color: colors.secondary,
  },
  bookWorkingWrapper: {
    flexDirection: 'row',
    width: '100%',
    height: hp(200),
    backgroundColor: '#fafafa',
    marginTop: hp(30),
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
    fontSize: hp(13),
    color: colors.black,
  },
  bookAuthor: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp(14),
    color: colors.secondary,
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
  listOfChapterHeaderText: {
    marginTop: hp(20),
    fontFamily: 'Poppins-Bold',
    fontSize: hp(16),
    color: '#4B4B4B',
  },
  newPartLable: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: hp(16),
    color: colors.grey,
  },
  bookPriceHelp: {
    marginVertical: 4,
    fontFamily: 'Poppins-SemiBold',
    fontSize: hp(14),
    color: colors.grey,
  },
  priceInputWrapper: {
    width: '100%',
    borderBottomWidth: 2,
    // backgroundColor: 'green',
    borderBottomColor: colors.grey,
    marginBottom: 10,
    flexDirection: 'row',
    // alignItems: 'center',
  },
  nairaSign: {
    position: 'absolute',
    // marginTop: 4,
    fontFamily: 'Poppins-Medium',
    color: colors.secondary,
    fontSize: hp(30),
    // backgroundColor: 'red',
  },
  priceInputStyle: {
    height: 60,
    width: '100%',
    paddingVertical: 0,
    paddingHorizontal: 40,
    fontFamily: 'Poppins-Medium',
    color: colors.secondary,
    fontSize: hp(30),
  },
  bookChapterWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
    padding: 10,
  },
  bookChapterTitle: {
    fontFamily: 'Poppins-Bold',
    color: colors.black,
  },

  // modal
  overLay: {
    position: 'absolute',
    backgroundColor: colors.black,
    opacity: 0.8,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    position: 'absolute',
    // opacity: 0.5,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'baseline',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  bookThumbnail: {
    width: wp(150),
    height: hp(230),
  },
});
