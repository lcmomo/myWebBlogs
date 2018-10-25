import Vue from 'vue'

Promise.prototype.finally = function (callback) {
  return this.then(
    value => Promise.resolve(callback()).then(() => value),
    reason => Promise.resolve(callback()).then(() => {
      throw reason
    })
  )
}

export default{

    login({commit}, payload) {
        console.log("lig");
    return Vue.$axios.post('/api/login',payload)
      .then(response => {
        if (response.data.state === 1) {
          commit('SET_USER', payload)
        } else {
          return Promise.reject(response.data.msg)
        }
      })
  }
}