<template>
<div>
  <v-app-bar elevation="4">
    <v-toolbar-title v-text="goalId.title"></v-toolbar-title>
    <v-spacer></v-spacer>
    <AddButton />
  </v-app-bar>
  {{this.milestones}}
  <v-list-group v-for="(milestone) in milestones" :key="milestone.id" :value="true">
    <template v-slot:activator>
      <v-list-item-title v-text="milestone.title"></v-list-item-title>
    </template>
    <v-progress-linear color="blue" height="10" value="10"></v-progress-linear>
    <v-progress-linear height="10" value="45" color="yellow"></v-progress-linear>
    <!-- <v-list v-for="item in this.tasks" :key="item.id" flat subheader two-line>
      <Task :id="item.id" :title="item.title" :due="item.due" :link="item.link" :page="item.page"> </Task>
    </v-list> -->
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
import axios from 'axios';
export default {
  data() {
    return {
      goalId:{
        id:`${this.$route.params.index}`,
        title:`${this.$route.query.g}`
    },

      toggleAddTask: false,
      tasks: "",
      milestones: ""
    }
  },
  methods: {
    submitEditor() {
      return this.toggleAddTask === true
    }
  },
  mounted() {
    axios.get('http://localhost:3005/task-post-goals-get',{
      headers: {
        'goal_id': this.goalId.id
      }


    })
      .then((res) => {
    console.log(res.data);
      })

  }

}
</script>
