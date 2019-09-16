<template>
<app-layout>
  <div class="dashboard">
  	<v-container class="my-5">
      <h1 class="subheading grey--text">Home/Facilities</h1>

        <v-row > 
          <v-col class="lg12">
            <v-btn class="primary">Add Facility</v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="lg12">
			     <v-data-table :headers="headers":items="orgunits" :items-per-page="5" class="elevation-1"></v-data-table>
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
    mounted(){
      this.getCounties()
    },
    data () {
    return {
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: false,
          value: 'county_name',
        },
        { text: 'Sub-County', value: 'subcounty_name' },
        { text: 'Facility Code', value: 'mfl' },
        { text: 'Facility Name', value: 'facility_name' },
        { text: 'No of SDPs', value: 'no_of_sdps' },
      ],
      orgunits: [
        {
          county_name: 'Frozen Yogurt',
          subcounty_name: 159,
          mfl: 6.0,
          facility_name: 24,
          no_of_sdps: 4.0,
        },
        {
          county_name: 'Frozen Yogurt',
          subcounty_name: 159,
          mfl: 6.0,
          facility_name: 24,
          no_of_sdps: 4.0,
        }
      ],
      orgunits_list: []
    }
    },

    methods: {
      getCounties() {
        //get api end point
        apiCall({url: "question_per_checklist/1", method: "GET"})
            .then(resp => {
                console.log("Counties request", resp)
                Vue.set(this.orgunits_list, "data", resp.data)
            })
            .catch(error => {
                console.log("Error is ", error.response)
            })
      },

    }
  }
</script>
