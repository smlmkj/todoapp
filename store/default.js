import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const state = () => ({


    goalItems: [],

    milestones:[
    ],
    tasks:[
      1
    ],
    milestoneMember:[],
    goalMember:[]

  })
export const getters =  {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }

export const mutations = {
    SET_GOALS(state, payload) {
      state.goalItems = payload
    },


    SET_MILESTONES(state, payload) {
      state.milestones = payload
    },
    SET_TASKS(state, payload) {
      state.tasks = payload
    },
    SET_MILESTONE_MEMBER(state, payload) {
      state.milestoneMember = payload
    },
    SET_GOAL_MEMBER(state, payload) {
      state.goalMember = payload
    }
}

export const actions = {
  async  getGoalInfo({ commit }, { token, userType })
  {
await    axios.get('http://localhost:3005/goals-get')
      .then((goalRes) => {
          commit('SET_GOALS', goalRes.data)
      })
    },
    async getMilestoneInfo({ commit }, { token, userType })
{
await      axios.get('http://localhost:3005/milestone-get-all')
        .then((milestoneRes) => {
          commit('SET_MILESTONES', milestoneRes.data)
        })
      },
  async  getTaskInfo({ commit }, { token, userType })
    {
await      axios.get('http://localhost:3005/task-get')
          .then((taskRes) => {
            commit('SET_TASKS', taskRes.data)
          })
        },
  async getMilestoneMemberInfo({ commit }, { token, userType })
  {
await          axios.get('http://localhost:3005/milestone-member-get')
            .then((milestoneMemberRes) => {
              commit('SET_MILESTONE_MEMBER', milestoneMemberRes.data)
            })
          },
  async getGoalMemberInfo({ commit }, { token, userType }){
await            axios.get('http://localhost:3005/goal-member-get')
              .then((goalMemberRes) => {
                commit('SET_GOAL_MEMBER', goalMemberRes.data)
              })
            },
            getInitialInfo({ dispatch }, { token, userType }) {
              dispatch('getGoalInfo', { token, userType })
              dispatch('getMilestoneInfo', { token, userType })
              dispatch('getTaskInfo', { token, userType })
              dispatch('getMilestoneMemberInfo', { token, userType })
              dispatch('getGoalMemberInfo', { token, userType })
            },


}
