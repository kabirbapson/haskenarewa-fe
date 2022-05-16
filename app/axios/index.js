import axios from 'axios';

// for development server

export default axios.create({
  baseURL: 'http://192.168.43.90:8000',
  headers: {
    'X-Platform': 'android',
    'X-App-Build-Number': '1.0.0',
  },
});

// for production server
// export default axios.create({
//   baseURL: 'https://ha-test-baps01.herokuapp.com',
//   headers: {
//     'X-Platform': 'android',
//     'X-App-Build-Number': '1.0.0',
//   },
// });
