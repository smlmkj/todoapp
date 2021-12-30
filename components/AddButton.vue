<template>
<v-dialog v-model="dialog" persistent max-width="600px">
  <template v-slot:activator="{ on, attrs }">
    <v-btn color="success" dark v-bind="attrs" v-on="on">
      <v-icon>
        mdi-plus
      </v-icon>
    </v-btn>
  </template>
  <v-form v-model="valid">
    <v-card>
      <v-card-title>
        <span class="text-h5">New Task</span>
      </v-card-title>
      {{ this.data}} <br />
      {{ this.formData }} <br />
      {{ this.goalList }} <br />
      {{ this.goalPriority }}<br />
      {{ this.goal_priority}}
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="data.title" label="Title" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select v-model="formData.goal_id" :items="goalList" item-text="goal_title" item-value="goal_id" label="Goal" required></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select v-model="data.milestone_id" :items="milestoneList" item-text="title" item-value="id" label="Milestones" required></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-menu ref="menu" v-model="selectDate" :close-on-content-click="false" :return-value.sync="formData.date" transition="scale-transition" offset-y min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="formData.date" label="Picker in menu" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="formData.date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="selectDate = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="setDate()">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="11" sm="6">
              <v-dialog ref="dialog" v-model="selectTime" :return-value.sync="formData.time" persistent width="290px">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="formData.time" label="Picker in dialog" prepend-icon="mdi-clock-time-four-outline" readonly v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-time-picker v-if="selectTime" v-model="formData.time" full-width>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="selectTime = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="setTime()">
                    OK
                  </v-btn>
                </v-time-picker>
              </v-dialog>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="submitForm()">
          Save
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-form>
</v-dialog>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      valid: false,
      dialog: false,
      selectDate: false,
      selectTime: false,
      data: {
        title: '',
        milestone_id: '',
        due: ''
      },
      formData: {
        date: '',
        time: '',
        goal_id: ''
      },
      goalList: '',
      goal_priority: ''
    }
  },

  mounted() {
    axios.get('http://localhost:3005/task-post-goals-get')
      .then((res) => {
        this.goalList = res.data
      })

  },
  methods: {
    setDate() {
      this.$refs.menu.save(this.formData.date)
      if (this.formData.time === '') {
        this.data.due = this.formData.date + "T00:00:00." + new Date().getTimezoneOffset() + "Z"
      } else {
        this.data.due = this.formData.date + "T" + this.formData.time + ":00." + new Date().getTimezoneOffset() + "Z"
      }
    },
    setTime() {
      this.$refs.dialog.save(this.formData.time)
      const currentDateRaw = new Date()
      const currentDate = currentDateRaw.toISOString().split('T')[0]
      this.selectTime = false
      if (this.formData.time === '') {
        this.data.due = "0000" + this.formData.time
      } else {
        this.data.due = currentDate + "T" + this.formData.time + ":00." + new Date().getTimezoneOffset() + "Z"
      }
    },
    submitForm() {
      this.dialog = false
      axios
        .post('http://localhost:3005/task-post', {
          "due": this.data.due,
          "milestone_id": this.data.milestone_id,
          "goal_priority": this.goalPriority,
          "title": this.data.title
        })
        .then((res) => {
          this.response = res
        })
    }
  },
  computed: {
    milestoneList() {
      const arr = this.goalList;
      if (this.goalList === '') {
        return 'loading'
      } else {
        const obj = arr.find(o => o.goal_id === this.formData.goal_id);
        if (this.formData.goal_id === '') {
          return 'loading'
        } else {
          return obj.milestones
        }
      }

    },
    goalPriority() {
      const arr = this.goalList;
      if (this.goalList === '') {
        return 'loading'
      } else {
        const obj = arr.find(o => o.goal_id === this.formData.goal_id);
        if (this.formData.goal_id === '') {
          return 'loading'
        } else {
          return obj.goal_priority
        }
      }
    }
  }

}
</script>
