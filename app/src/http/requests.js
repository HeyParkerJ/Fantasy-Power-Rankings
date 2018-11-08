import Axios from 'axios'

let prodUrl = 'http://heyparkerj.com/'
let devUrl = 'http://localhost:1337/'
let url = process.env.NODE_ENV === 'prod' ? prodUrl : devUrl
// TODO - Ensure prod env is set up

export default {
  sendTestData: dataToSend => {
    return new Promise((resolve, reject) => {
      Axios.post(url + 'api', dataToSend)
    })
  }, // TODO - Error handle this message

  loginUser: data => {
    return new Promise((resolve, reject) => {
      Axios.post(url + 'api/login', data)
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  getUsers: () => {
    return new Promise((resolve, reject) => {
      Axios.get(url + 'api/getUsers')
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  getTeams: () => {
    return new Promise((resolve, reject) => {
      Axios.get(url + 'api/getTeams')
        .then(response => {
          console.log('got response', response)
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  postPowerRankings: (powerRankings) => {
    return new Promise((resolve, reject) => {
      Axios.post(url + 'api/postPowerRankings', powerRankings)
        .then(response => {
          console.log('got response', response)
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  getAllPowerRankings: (powerRankings) => {
    return new Promise((resolve, reject) => {
      Axios.get(url + 'api/getAllPowerRankings')
        .then(response => {
          resolve(response.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
