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
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field v-model="firstname" :counter="10" label="First name" required></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="lastname" :counter="10" label="Last name" required></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="email" label="E-mail" required></v-text-field>
              </v-col>
              <v-col>
                <v-btn color="#708090" @click="closeEditor = false">
                  Cancel
                </v-btn>
                <v-btn color="primary" @click="submitEditor = false">
                  add
                </v-btn>
              </v-col>
            </v-row>
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

      valid: "",
      firstname: "",
      lastname: "",
      email: "",
      toggleAddTask: false,
      tasks: [{
          id: "1",
          title: "name1",
          due: "3",
          link: "no",
          page: "goals"
        },
        {
          id: "2",
          title: "name21",
          due: "1",
          link: "no",
          page: "goals"
        }

      ],
      milestones: "",
    }
  },
  methods: {
    submitEditor() {
      return this.toggleAddTask === true
    }
  },
  mounted() {
    axios.get('http://localhost:3005/milestones-get',{
      headers: {
        'goal_id': this.goalId.id
      }


    })
      .then((res) => {
        this.milestones = res.data
      })

  }

}
</script>
