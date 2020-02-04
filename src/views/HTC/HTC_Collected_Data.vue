<template>

  <div class="dashboard">
    <v-container class="my-5">      
      <h1 class="subheading grey--text">Home/Surveys/HTC Register Checklist/Collected Data</h1>

      <v-row > 
          <v-col class="lg12">
            <v-btn class="primary" to="facilities">Fill Questionaire</v-btn>
            <v-btn class="info">Import Collected Data</v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="lg12">
           <v-data-table :headers="survey_headers":items="survey_list" :items-per-page="5" class="elevation-1">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.qa_officer }}</td>
              <td class="text-xs-left">{{ props.item.facility_name }}</td>
              <td class="text-xs-left">{{ props.item.sdp_name }}</td>
              <td class="text-xs-left">{{ props.item.score }}</td>
              <td class="text-xs-left">{{ props.item.date_submitted }}</td>
              <td class="text-xs-left"><v-btn color="blue lighten-2" dark :to="{name:'htc_filled_survey', params: { survey_id: props.item.id }}">View Survey</v-btn></td>
            </template>   
           </v-data-table>
          </v-col>
        </v-row>
    </v-container>

  </div>


</template>

<script>
  import DefaultLayout from '@/components/layouts/DefaultLayout.vue';
  import apiCall from '@/utils/api';

  export default {    
    mounted(){
      this.getSurveys()

    },
    data () {
    return {
      survey_headers: [
        {
          text: 'QA Officer',
          align: 'left',
          sortable: false,
        },
        { text: 'Facility' },
        { text: 'SDP'},
        { text: 'Score'},
        { text: 'Date Submitted'},
        { text: 'Action'},
      ],
      survey_list:[],
    }
    },
    methods:{

      getSurveys(){
       //get api end point
        apiCall({url: "specific_checklist_survey/1", method: "GET"}).then(response => (this.survey_list = response))

      }  
    }
  }
</script>
