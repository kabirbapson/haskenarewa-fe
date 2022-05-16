import {StyleSheet, Text, View, Dimensions, StatusBar} from 'react-native';
import React from 'react';
import Pdf from 'react-native-pdf';

export default function BookReaderPdf() {
  // https://www.orimi.com/pdf-test.pdf
  // https://agroecology.ucsc.edu/about/publications/Teaching-Organic-Farming/PDF-downloads/TOFG-all.pdfhttps://agroecology.ucsc.edu/about/publications/Teaching-Organic-Farming/PDF-downloads/TOFG-all.pdf
  const source = {
    uri: 'https://agroecology.ucsc.edu/about/publications/Teaching-Organic-Farming/PDF-downloads/TOFG-all.pdf',
    cache: false,
  };

  return (
    <View style={styles.container}>
      <Pdf
        enablePaging={true}
        horizontal={true}
        trustAllCerts={false}
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={[styles.pdf, {backgroundColor: '#fff'}]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: 'black',
  },
  pdf: {
    flex: 1,

    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
