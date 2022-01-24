<template>
<div>
  <v-app-bar elevation="4">
    <v-toolbar-title v-text="goalId.title"></v-toolbar-title>
    <v-spacer></v-spacer>
    <AddButton />
  </v-app-bar>
  {{this.getMember}}</br></br>
  Tasks: {{this.test1}}
  <v-list-group v-for="(milestone) in getMember" :key="milestone.id" :value="true" v-on:click="getTasks(milestone.id)" >
    <template v-slot:activator>
      <v-list-item-title v-text="milestone.title"></v-list-item-title>
    </template>

    <v-progress-linear color="blue" height="10" value="10"></v-progress-linear>
    <v-progress-linear height="10" value="45" color="yellow"></v-progress-linear>
    <v-list v-for="item in test1" :key="item.id" flat subheader two-line>
      <Task :id="item.id" :title="item.title" :due="item.due" :link="item.link" :page="item.page"> </Task>
    </v-list>
    <v-btn fab @click="toggleAddTask === false" v-if="toggleAddTask">

      <v-icon>
        mdi-plus
      </v-icon>
    </v-btn>
    <v-list v-if="!toggleAddTask" flat subheader two-line>
      <v-list-item>
        <v-form v-model="valid">
          <v-container>

          </v-container>
        </v-form>
      </v-list-item>
    </v-list>
  </v-list-group>
</div>
</template>
<script>

export default {
  data() {
    return {
      goalId:{
        id:`${this.$route.params.index}`,
        title:`${this.$route.query.g}`
    },

      valid: "",
      firstname: "",
      lastname: "",
      email: "",
      toggleAddTask: false,
      tasks: "",
      milestones: "",
      test1: []
    }
  },
  methods: {
    submitEditor() {
      return this.toggleAddTask === true
    },
    test(){
      console.log("hello")
    },
    getTasks(e){
      this.test1 = this.$store.getters.getTaskFromGoal(e)
    }
  },
  mounted() {
    this.$store.dispatch('getGoalMemberInfo', {header:this.goalId.id})
this.$store.dispatch('getTaskInfo')


}
,
computed: {

    getMember() {


      const storeMembers = this.$store.state.goalMember
      return storeMembers;

    }
  }

}
</script>
