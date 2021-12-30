<template>
<v-list-item>
  <template v-slot:default="{ active }">
    <v-list-item-action>
      <v-checkbox :input-value="active"></v-checkbox>
    </v-list-item-action>
    <v-list-item-title v-text="title"></v-list-item-title>
    <v-list-item-subtitle v-if="page === 'goals'" v-text="'due: ' + due + 'd' + ' Completed:    (-1)' "></v-list-item-subtitle>
    <v-list-item-subtitle v-else v-text="'due: ' + due + 'd'"></v-list-item-subtitle>
    <spacer></spacer>
    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on" class="mr-3">
              <v-icon>
                mdi-pencil
              </v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">User Profile</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field label="Name" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select :items="['goal1']" label="Goal" required></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select :items="['1','2','3']" label="importance*" multiple></v-select>
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
              <v-btn color="blue darken-1" text @click="dialog = false">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
</template>
</v-list-item>
</template>
<script>
export default {
  props: {
    id: {
      type: Number
    },
    title: {
      type: String
    },
    due: {
      type: String
    },
    link: {
      type: String
    },
    page: {
      type: String
    }



  },
  data: () => ({
    dialog: false
  })



}
</script>
