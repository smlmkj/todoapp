<template>
<div>
  <!-- header bar start -->
  <v-app-bar elevation="4">
    <v-toolbar-title>Today</v-toolbar-title>

    <v-spacer></v-spacer>
    <div class="text-center">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="#708090" dark v-bind="attrs" v-on="on" class="mr-16">
            Sort By: Importance
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <AddButton />
  </v-app-bar>

  <!--  task list start -->
  <v-list v-for="item in getTask" :key="item.id" flat subheader two-line>
    <Task :id="item.id" :title="item.title" :due="item.due" :link="item.link"> </Task>
  </v-list>
</div>
</template>
<script>
export default {
  data() {

    return {


    }
  },
  methods: {


  },
  mounted() {
    /* if (localStorage.getItem('tasks'))
            {
             this.tasks = JSON.parse(localStorage.getItem('tasks'));
           }
           console.log(this.tasks);
         }

    */
    this.$store.dispatch("getTaskInfo")
    this.$store.dispatch('getGoalMemberInfo')
  },
  computed: {

    getTask() {

      const storeState = this.$store.state.tasks
      return storeState;

    }
  }
}
</script>
