<template>
  <app-layout>
  <div class="dashboard">
   <v-container class="my-5">      

      <v-row > 
        <v-col class="lg12">
          <h1 class="subheading grey--text">Home/Surveys/HTC Register Checklist/Collected Data</h1>
          <v-btn align="right" class="primary" to="htc_collected_data">Back</v-btn>
        </v-col>
      </v-row>

        <v-row>
          <v-col class="lg12">
            <v-card max-width="800" >
              <v-system-bar color="#385F73" dark >
                <v-spacer></v-spacer>
              </v-system-bar>
              <div v-for="checklist in survey_questions">
                <v-app-bar dark color="pink">
                  <v-toolbar-title>Filled Survey for Facility Name on 01/01/2019</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-app-bar>
    
                <v-container v-for="section in checklist.section">
                  <v-row dense>
                    <v-col cols="12" >
                      <v-card color="#D6DBDF"  >
                        <v-card-title class="headline">{{section.name}}</v-card-title>
                          <v-card-text>
                            <div v-for="question in section.question">
                              <div v-for="answer in survey_data">
                                <div v-if="question.id == answer.question_id">
                                    &nbsp;&nbsp;&nbsp;&nbsp; {{question.name}} : {{answer.response}}

                                </div>
                              </div>
                            </div>
                          </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </div>
            </v-card>
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
    components: {
      'app-layout': DefaultLayout,
    },
    props: {
      survey_id: '',
    },
    mounted(){
      this.getSurveyData()
    },
    data () {
    return {
      survey_data: [],
      survey_questions: []
    }
    },
    methods:{

      getSurveyData(){
       //get api end point
        apiCall({url: "survey_data/"+this.survey_id, method: "GET"}).then(response => (
          this.survey_data = response.survey.surveydata,
          this.survey_questions = response.questions
        ))

      }  
    }
  }
</script>
