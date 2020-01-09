<template>
<app-layout>
  <div class="dashboard">
  	<v-container class="my-5">
      <h1 class="subheading grey--text">Home/Facilities</h1>
      <v-row > 
          <v-col class="lg12">
            <v-btn depressed class="warning text-none">Add Facility</v-btn>
          </v-col>
        </v-row>
        <v-layout column>
          <v-flex xs12 v-for="(unit, index) in allOrgUnits" class="mt-1">
            <v-card
              elevation="0"
            >
              <v-card-text>
                <v-layout column>
                  <v-flex xs12>
                    <v-layout row wrap>
                      <v-flex xs4>
                        Facility Name
                      </v-flex>
                      <v-flex xs8>
                        {{unit.name}}
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12>
                    <v-layout row wrap>
                      <v-flex xs4>
                        Facility Code
                      </v-flex>
                      <v-flex xs8>
                        {{unit.code}}
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12>
                    <v-layout row wrap>
                      <v-flex xs4>
                        County
                      </v-flex>
                      <v-flex xs8>
                        {{unit.county_name}}
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12>
                    <v-layout row wrap>
                      <v-flex xs4>
                        Sub-County
                      </v-flex>
                      <v-flex xs8>
                        {{unit.sub_county_name}}
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12>
                    <v-layout row wrap>
                      <v-flex xs4>
                        No. of SDPs
                      </v-flex>
                      <v-flex xs8>
                        {{unit.id}}
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
                
              </v-card-text>
              <v-card-actions>
                <v-btn block depressed color="blue lighten-2" dark class="text-none" @click = "view_sdp_dialog = true">View SDP</v-btn>
                <v-btn block depressed color="green lighten-2" dark class="text-none" @click = "openQuestionnaireDialog(unit.id)">Fill Questionnaire</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>

        

        <!-- <v-row>
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
        </v-row> -->
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
          <v-form v-model="valid" class="pa-3">
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
          {{selected_sdp}} facility: {{selected_facility}}
          </v-form>
  
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn depressed block color="red" class="text-none" dark @click="fill_qnr_dialog = false" > Cancel </v-btn>
            <v-btn depressed block color="primary" class="text-none" dark :to="{name:'htc_questionnaire', params: {selected_sdp,selected_facility}}" @click="dialog = false" > Go </v-btn>
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
  import {mapGetters, mapActions} from 'vuex'

  export default {
    components: {
      'app-layout': DefaultLayout,
    },
    created(){
      this.initialize()
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
      ...mapActions([
          'fetchorgUnits'
      ]),
      initialize(){
        this.fetchorgUnits(this.orgUnitsPagination.current_page)
      },
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

    },
    computed: {
      ...mapGetters([
        'allOrgUnits',
        'orgUnitsPagination'
      ]),
    }
  }
</script>
