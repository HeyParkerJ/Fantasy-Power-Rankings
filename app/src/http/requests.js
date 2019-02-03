import Axios from 'axios'

let prodUrl = 'https://heyparkerj.com/'
let devUrl = 'http://localhost:1337/'
let url = process.env.NODE_ENV === 'production' ? prodUrl : devUrl

export default {
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

  getDataForSeason: (seasonId) => {
    return new Promise((resolve, reject) => {
      Axios.get(url + 'data/' + seasonId).then(response => {
        resolve(response.data)
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
          resolve(response)
        })
        .catch(err => {
          resolve(err.response)
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
