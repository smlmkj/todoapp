<template>
<v-app dark>

  <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>

    <v-list>    
      <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
      <v-list-group>
        <template v-slot:activator>
          <v-list-item-title>Goals</v-list-item-title>
        </template>
        <v-list v-for="goal in getGoal" :key="goal.id">
          <v-list-item :to="{path:'/goals/'+goal.id, query:{g: goal.title}}">
            <v-list-item-content>
              <v-list-item-title v-text="goal.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <template>
          <v-list>
            <v-row justify="center">
              <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon ark v-bind="attrs" v-on="on">
                    mdi-plus
                  </v-icon>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">New Goal</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field label="Name" v-model="goalItemPost.name" required>
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-select :items="['1','2','3']" label="importance*" multiple v-model="goalItemPost.importance"></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                      Close
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="saveData">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
          </v-list>
        </template>

      </v-list-group>
      <v-list-group>

        <template v-slot:activator>
          <v-list-item-title>Labels</v-list-item-title>
        </template>
      </v-list-group>

      <v-list-group>
        <template v-slot:activator>
          <v-list-item-title>Filters</v-list-item-title>
        </template>
      </v-list-group>

    </v-list>
  </v-navigation-drawer>
  <v-app-bar :clipped-left="clipped" fixed app>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    <v-btn icon @click.stop="miniVariant = !miniVariant">
      <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
    </v-btn>
    <v-btn icon @click.stop="clipped = !clipped">
      <v-icon>mdi-application</v-icon>
    </v-btn>
    <v-btn icon @click.stop="fixed = !fixed">
      <v-icon>mdi-minus</v-icon>
    </v-btn>
    <v-toolbar-title v-text="title" />
    <v-spacer />
    <v-btn icon @click.stop="rightDrawer = !rightDrawer">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </v-app-bar>
  <v-main>
    <v-container>
      <Nuxt />
    </v-container>
  </v-main>
  <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
    <v-list>
      <v-list-item @click.native="right = !right">
        <v-list-item-action>
          <v-icon light>
            mdi-repeat
          </v-icon>
        </v-list-item-action>
        <v-list-item-title>Switch drawer (click me)</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  {{ submitGoalRes }}
  <v-footer :absolute="!fixed" app>
    <span>&copy; {{ new Date().getFullYear() }}</span>
  </v-footer>
</v-app>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      dialog: false,
      goalItemPost: {
        name: '',
        importance: ''
      },
      items: [{
          title: 'Inbox',
          to: '/inbox'
        },
        {
          title: 'Today',
          to: '/today'
        },
        {
          title: 'Upcoming',
          to: '/upcoming'
        }
      ],
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Success',
      tasks: {
        title: ''
      }
    }
  },
  methods: {
    submitGoal() {
      console.log(this.tasks[0].id)
      console.log(this.milestones)
      console.log(this.goalItemPost.importance)
      axios.post('http://localhost:3005/goals-post', this.goalItemPost).then(res => {
        this.submitGoalRes = res
      })
    }

    /* getGoal(){
      this.goalItems = store.state.count.goalItems

    },
    getMilestone(){
      this.milestones = store.state.count.milestones

    },
    getTask(){
      this.tasks = store.state.count.tasks

    },
    getGoalMember(){
      this.goalMember = store.state.count.goalMember

    },
    getMilestoneMember(){
      this.milestoneMember = store.state.count.milestoneMember

    }
    */
    /* saveData(){
    const parsedTasks = JSON.stringify(this.tasks);
    const parsedMilestones = JSON.stringify(this.milestones);
    const parsedGoals = JSON.stringify(this.goalItems);
    const parsedMilestoneMembers = JSON.stringify(this.milestoneMember);
    const parsedGoalMembers = JSON.stringify(this.goalMember);
    localStorage.setItem('tasks', parsedTasks);
    localStorage.setItem('milestones', parsedMilestones);
    localStorage.setItem('goals', parsedGoals);
    localStorage.setItem('milestoneMembers', parsedMilestoneMembers);
    localStorage.setItem('goalMembers', parsedGoalMembers);
    }
    */
  },
  /* mounted() {
      axios.get('http://localhost:3005/goals-get')
        .then((goalRes) => {
          this.goalItems = goalRes.data
        })
        axios.get('http://localhost:3005/milestone-get-all')
          .then((milestoneRes) => {
            this.milestones = milestoneRes.data
          })
          axios.get('http://localhost:3005/task-get')
            .then((taskRes) => {
              this.tasks = taskRes.data
            })
            axios.get('http://localhost:3005/milestone-member-get')
              .then((milestoneMemberRes) => {
                this.milestoneMember = milestoneMemberRes.data
              })
              axios.get('http://localhost:3005/goal-member-get')
                .then((goalMemberRes) => {
                  this.goalMember = goalMemberRes.data
                })
          this.saveData();

                 if (localStorage.getItem('goals'))
                           {
                            this.cats = JSON.parse(localStorage.getItem('goals'));
                          }
              if (localStorage.getItem('milestones'))
                                {
                                 this.cats = JSON.parse(localStorage.getItem('milestones'));
                               }
      if (localStorage.getItem('milestoneMembers'))
                                                 {
                                                  this.cats = JSON.parse(localStorage.getItem('milestoneMembers'));
                                                }
                                                if (localStorage.getItem('goalMembers'))
                                                                                           {
                                                                                            this.cats = JSON.parse(localStorage.getItem('goalMembers'));
                                                                                          }
  */
  mounted() {
    this.$store.dispatch('getGoalInfo')
  },
  computed: {
    getGoal() {
      const storeState = this.$store.state.goalItems

      return storeState
    }
  }
}
</script>
