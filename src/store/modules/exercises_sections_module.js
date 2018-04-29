import { HTTP } from '../../http/ApiClient'
import { BUS } from '../../bus/EventBus'

const state = {
  sections: [],
  activeSection: null,
}

const getters = {
  sections (state) {
    return state.sections
  },
  activeSection (state) {
    return state.activeSection
  }
}

const mutations = {
  setSections (state, payload) {
    state.sections = payload
  },
  setActiveSection (state, payload) {
    state.activeSection = payload
  },
  removeExercise (state, payload) {
    state.activeSection.exercises.splice(
      state.activeSection.exercises.findIndex(el => el.id === payload), 1
    )
  },
  pushSection (state, payload) {
    state.sections.push(payload)
  }
}

const actions = {
  fetchSectionList ({ commit, state }) {
    HTTP.get('sections')
      .then(response => {
        console.log(`fetch section list`, response)
        if (response.status !== 200) {
          // handle non success response
        } else {
          commit('setSections', response.data)
        }
      })
      .catch (error => {
        console.log(error)
        // handle error
      })
  },
  fetchSection ({ commit, state }, payload) {
      HTTP.get('sections/' + payload)
      .then(response => {
        console.log(`fetch section id: ${payload}`, response)
        if (response.status !== 200) {
          // handle non success response
        } else {
          commit('setActiveSection', response.data)
        }
      })
      .catch (error => {
        console.log(error)
        // handle error
      })
  },
  addSection ({ commit, state }, payload) {
    HTTP.post(
      'sections',
      {
        title: payload.title,
        image: payload.image
      })
      .then(response => {
        console.log('add section response', response)
        if (response.status === 200 || response.data === 201) {
          commit('pushSection', response.data)
          BUS.$emit('clean-add-section-form')
          BUS.$emit('show-notify', {
            title: 'Success',
            message: 'Saving new Section successfully!',
            type: 'success'
          })
        } else {
          BUS.$emit('show-notify', {
            title: 'ERROR',
            message: 'Saving new Section FAILED check console!',
            type: 'error'
          })
        }
      })
      .catch(error => {
        BUS.$emit('show-notify', {
          title: 'ERROR',
          message: `msg: ${error.message}`,
          type: 'error'
        })
      })
  },
  deleteExercise ({ commit, state }, payload) {
    HTTP.delete(`sections/${payload.sectionId}/exercises/${payload.exerciseId}`)
      .then(response => {
        if (response.status !== 200) {
          // handle non success repsonse
        } else {
          BUS.$emit('show-notify', {
            title: 'Success',
            message: 'Exercise was deleted',
            type: 'success'
          })
          commit('removeExercise', payload.exerciseId)
        }
      })
      .catch(error => {
        BUS.$emit('show-notify', {
          title: 'Validation error',
          message: error.response.data,
          type: 'error'
        })
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}