import Vuex from 'vuex'
import Cookie from 'js-cookie'

const cookieparser = process.server ? require('cookieparser') : undefined

const createStore = () => {
  return new Vuex.Store({
    state: {
      auth: null,
      error: null,
      songs: null,
    },
    mutations: {
      setAuth(state, auth) {
        state.auth = auth
      },
      setSongs(state, songs) {
        state.songs = songs
      },
      setError(state, err) {
        state.error = err
      }
    },
    actions: {
      nuxtServerInit({ commit }, { req }) {
        let auth = null
        if (req.headers.cookie) {
          const parsed = cookieparser.parse(req.headers.cookie)
          try { 
            auth = JSON.parse(parsed.auth)
            if (process.client) {
              localStorage.setItem('cookie', auth);
            }
            Cookie.set('cookie', auth)
          } catch (err) {
            // No valid cookie found
          }
        }
        commit('setAuth', auth)
      }
    }
  })
}

export default createStore
