import Vue from 'vue'
import Vuex from 'vuex'
 import axios from 'axios'

Vue.use(Vuex)

export const state = () => ({


  goalItems: [],

  milestones: [],
  tasks: [

  ],
  milestoneMember: [],
  goalMember: [],
  goalHeader:""

})

export const getters = {
  doneTodos: state => {
    return state.todos.filter(todo => todo.done)
  },
  getTaskFromGoal: (state) => (id) => {
    console.log("ID" + id);
    console.log("LOG" + JSON.stringify(state.tasks));
   const tasks = state.tasks.filter(task => task.milestone_id === id)
   console.log("Tasks" + tasks);
   return tasks
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
  async getGoalInfo({
    commit
  }) {
    await axios.get('http://localhost:3005/goals-get')
      .then((goalRes) => {
        commit('SET_GOALS', goalRes.data)
      })
  },
  async getMilestoneInfo({
    commit
  }) {
    await axios.get('http://localhost:3005/milestone-get-all')
      .then((milestoneRes) => {
        commit('SET_MILESTONES', milestoneRes.data)
      })
  },
  async getTaskInfo({
    commit
  }) {
    await axios.get('http://localhost:3005/task-get')
      .then((taskRes) => {
        commit('SET_TASKS', taskRes.data)
      })
  },

  async getGoalMemberInfo({
    commit
  },{header}) {
    await axios.get('http://localhost:3005/goal-member-get', {headers: {"test":header}})
      .then((goalMemberRes) => {
        commit('SET_GOAL_MEMBER', goalMemberRes.data)
      })
  },



}
