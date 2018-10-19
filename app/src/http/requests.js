import Axios from 'axios';

let prodUrl = 'http://heyparkerj.com/api'
let devUrl = 'http://localhost:8080/api'
let url = process.env.NODE_ENV === 'prod' ? prodUrl : devUrl
// TODO - Ensure prod env is set up

sendTestData = (dataToSend) => {
  return new Promise((resolve, reject) => {
    Axios.post(url, dataToSend);
  })
} // TODO - Error handle this message

export default sendTestData;

// TODO - next - This is broke
