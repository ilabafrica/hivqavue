<template>
<app-layout>
  <div class="dashboard">
    <v-container class="my-5">
      <h1 class="subheading grey--text">Home/Facilities</h1>

        <v-row > 
          <v-col class="lg12">
            <v-btn class="warning">Add Facility</v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="lg12">
           <v-data-table :headers="orgunits_headers":items="orgunits_list" :items-per-page="5" class="elevation-1">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.county_name }}</td>
              <td class="text-xs-left">{{ props.item.sub_county_name }}</td>
              <td class="text-xs-left">{{ props.item.code }}</td>
              <td class="text-xs-left">{{ props.item.name }}</td>
              <td class="text-xs-left">{{ props.item.id }}</td>
              <td class="text-xs-left"><v-btn color="blue lighten-2" dark @click = "view_sdp_dialog = true">View SDP</v-btn></td>
              <td class="text-xs-left"><v-btn color="green lighten-2" dark @click = "openQuestionnaireDialog(props.item.id)">Fill Questionnaire</v-btn></td>
            </template>   
           </v-data-table>
          </v-col>
        </v-row>
<!--Dialog to view SDPs -->
      <v-dialog v-model="view_sdp_dialog" width="500" >
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title> View SDPs in Facility </v-card-title>
  
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" text @click="dialog = false" >  Add New SDP </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!--Dialog to fill questionnaire -->
      <v-dialog v-model="fill_qnr_dialog" width="500" >
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title> Choose SDP </v-card-title>
          <v-form v-model="valid">
            <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-radio-group class="row" v-model ="selected_sdp">
              <div v-for="sdp in sdps_list">
                <v-radio :value = "sdp.id" :label="sdp.name"></v-radio>    
               </div>
            </v-radio-group>
          </v-col></v-row>
          </v-form>
  {{selected_sdp}} facility: {{selected_facility}}
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="red" dark @click="fill_qnr_dialog = false" > Cancel </v-btn>
            <v-btn color="primary" dark :to="{name:'htc_questionnaire', params: {selected_sdp,selected_facility}}" @click="dialog = false" > Go </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
    
    mounted(){
      this.getOrgunits()
      this.getSDPs()
    },
    data () {
    return {
      orgunits_headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: false,
          value: 'county_name',
        },
        { text: 'Sub-County', value: 'subcounty_name' },
        { text: 'Facility Code', value: 'code' },
        { text: 'Facility Name', value: 'facility_name' },
        { text: 'No of SDPs', value: 'id' },
        { text: 'Action', value: 'id' },
      ],
      selected_sdp: '',
      selected_facility: '',
      orgunits_list: [],
      sdps_list: [],
      dialog: false,
      fill_qnr_dialog : false,
      view_sdp_dialog:false,
    }
    },
    methods: {
      getOrgunits() {
        //get api end point
        apiCall({url: "org_units", method: "GET"}).then(response => (this.orgunits_list = response.data))
      },
      getSDPs() {
        //get api end point
        apiCall({url: "get_sdps", method: "GET"}).then(response => (this.sdps_list = response.data))
      },
      openQuestionnaireDialog(id){
       this.fill_qnr_dialog = true;
       this.selected_facility = id;
        
      }
    }
  }
</script>