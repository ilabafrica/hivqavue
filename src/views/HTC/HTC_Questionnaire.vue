<template>
  <div class="dashboard">

    <v-container class="my-5">      
      <h1 class="subheading grey--text">Home/Surveys/HTC Register Checklist/Questionaire</h1>

      <v-row > 
          <v-col class="lg12">
            <v-btn class="primary" to = "htc_collected_data" >View Collected Data</v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="lg12">
            <form-wizard v-for="checklist in checklists" @on-complete="submitAnswers()" v-bind:title="checklist_name" subtitle="">
              
              
              <tab-content v-for="section in checklist.section">
                <div v-for="question in section.question">
                  {{question.name}}
                  <v-text-field v-if ="question.question_type ==2"  :counter="10":rules="nameRules" required v-bind:name = 'question.identifier' v-model =answers[question.id]></v-text-field>
                  <v-radio-group v-else-if ="question.question_type ==0" v-bind:name = 'question.identifier' v-model =answers[question.id]>
                    <v-radio value = "2" label="Yes"></v-radio>
                    <v-radio value = "0" label="No"></v-radio>
                    <v-radio value = "1" label="Partial"></v-radio>
                  </v-radio-group>
                  <v-textarea v-else-if ="question.question_type ==3" hint="Add a comment" v-bind:name = 'question.identifier' v-model =answers[question.id]></v-textarea>
                </div>
              </tab-content>

            </form-wizard>
          </v-col>
        </v-row>
    </v-container>

  </div>
</app-layout>
</template>

<script>
  import DefaultLayout from '@/components/layouts/DefaultLayout.vue';
  import apiCall from '@/utils/api';
  import {FormWizard, TabContent} from 'vue-form-wizard'
  import 'vue-form-wizard/dist/vue-form-wizard.min.css'

  export default {
    // vuetify: new Vuetify(),
    components: {
      'app-layout': DefaultLayout,
      FormWizard,
      TabContent
    },
    props: {
      selected_sdp: '',
      selected_facility: '',

    },
    mounted(){
      if (this.selected_sdp) {
            this.sdp = this.selected_sdp    
        }
      if (this.selected_facility) {
          this.facility = this.selected_facility    
      }
      this.getQuestions();
    },
    data () {
    return {
      checklists: '',
      checklist_name: '',
      checklist_id: '',
      facility: '',
      sdp: '',
      answers:{},
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
    checkbox: false,
    
 
}
    },
    methods: {
      getQuestions() {
        //get api end point
        apiCall({url: "question_per_checklist/1/"+ this.facility + "/"+ this.sdp, method: "GET"}).then(response => (
          this.checklists = response.data, 
          this.checklist_name = response.checklist_name,
          this.checklist_id = response.checklist_id
          ))
      },
      submitAnswers() {
        console.log("array to submit is ", this.answers)

        //post data to api end point
        // apiCall({url: "questions", method: "POST", data: this.answers})
        // .then(response => (
        //     console.log('api call response is: ', response)
        //   )
        // )
      },
    validate () {
      // if (this.$refs.form.validate()) {
      //   this.snackbar = true
      // }
    },
    reset () {
      // this.$refs.form.reset()
    },
    resetValidation () {
      // this.$refs.form.resetValidation()
    },
  },
  }
</script>
