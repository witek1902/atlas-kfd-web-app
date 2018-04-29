import { HTTP } from '../../http/ApiClient'
import { BUS } from '../../bus/EventBus'

const state = {
  exercises: [],
  activeExercise: null
}

const getters = {
  exercises (state) {
    return state.exercises
  },
  activeExercise (state) {
    return state.activeExercise
  }
}

const mutations = {
  setExercises (state, payload) {
    state.exercises = payload
  },
  setActiveExercise (state, payload) {
    state.activeExercise = payload
  },
  pushExercise (state, payload) {
    state.exercises.push(payload)
  }
}

const actions = {
  fetchExerciseList ({ commit, state }, payload) {
    HTTP.get('exercises')
      .then(response => {
        console.log(`fetch exercicses list`, response)
        if (response.status !== 200) {
          // handle non success response
        } else {
          commit('setExercises', response.data)
        }
      })
      .catch (error => {
        console.log(error)
        // handle error
      })
  }, 
  fetchExercise ({ commit, state }, payload) {
    HTTP.get(`exercises/${payload}`)
    .then(response => {
      if (response.status !== 200) {
        // handle non success response
      } else {
        commit('setActiveExercise', response.data)
      }
    })
    .catch (error => {
      console.log(error)
      // handle error
    })
  },
  addExerciseToSection ({ commit, state }, payload) {
    HTTP.post(
        `sections/${payload.exerciseSectionId}/exercises`,
        { exerciseId: payload.exerciseId }
      )
      .then(response => {
        console.log('add excersise response:', response)
        if (response.status === 200 || response.status === 201) {
          BUS.$emit('clean-add-exercise-form')
          BUS.$emit('show-notify', {
            title: 'Success',
            message: 'Adding new Exercise to Section successfully!',
            type: 'success'
          })
        } else {
          BUS.$emit('show-notify', {
            title: 'ERROR',
            message: 'Adding new Exercise to Section FAILED - check console!',
            type: 'error'
          })
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
