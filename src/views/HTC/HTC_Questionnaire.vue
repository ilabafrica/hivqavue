<template>
<app-layout>
  <div class="dashboard">

    <v-container class="my-5">      
      <h1 class="subheading grey--text">Home/Surveys/HTC Register Checklist/Questionaire</h1>

      <v-row > 
          <v-col class="lg12">
            <v-btn class="primary" to = "htc_collected_data" >View Collected Data</v-btn>
            <v-btn class="success">View Reports</v-btn>
            <v-btn class="info">Import Collected Data</v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="lg12">
          <v-form ref="form" v-model="valid" lazy-validation>
            <div v-for="question in questions">
              {{question.name}}
              <v-text-field v-if ="question.question_type ==2"  :counter="10":rules="nameRules" required ></v-text-field>
              <v-radio-group v-else-if ="question.question_type ==0" >
                <v-radio label="Yes"></v-radio>
                <v-radio label="No"></v-radio>
                <v-radio label="Partial"></v-radio>
              </v-radio-group>
              <v-textarea v-else-if ="question.question_type ==3" hint="Add a comment" ></v-textarea>
            </div>

      <v-btn :disabled="!valid" color="success" class="mr-4" > Validate </v-btn>
      <v-btn color="error" class="mr-4" > Reset Form </v-btn>
      <v-btn color="warning" > Submit </v-btn>
    </v-form>
    </v-col>
        </v-row>
      
    </v-container>

  </div>
</app-layout>

</template>

<script>
  import DefaultLayout from '@/components/layouts/DefaultLayout.vue';
  import apiCall from '@/utils/api';

  export default {
    // vuetify: new Vuetify(),
    components: {
      'app-layout': DefaultLayout,
    },
    mounted(){
      this.getQuestions();
    },
    data () {
    return {
      questions: '',

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
        apiCall({url: "question_per_checklist/1", method: "GET"}).then(response => (this.questions = response.data))
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
