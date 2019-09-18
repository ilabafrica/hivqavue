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
              <td class="text-xs-left"><v-btn color="blue lighten-2" dark @click = "dialog = true">
            Click Me
          </v-btn></td>
            </template>   
           </v-data-table>
          </v-col>
        </v-row>
<!--Dialog to view SDPs -->
        <v-dialog
        v-model="dialog"
        width="500"
      ><v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >
            View SDPs in Facility
          </v-card-title>
  
          <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              I accept
            </v-btn>
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
      
      orgunits_list: [],
      dialog: false,
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%',
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%',
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%',
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%',
        },
        
      ],

    }
    },

    methods: {
      getOrgunits() {
        //get api end point
        apiCall({url: "org_units", method: "GET"})
            // .then(response => {
            //     Vue.set(this.orgunits_list, "data", response.data.data)
            //     console.log("Counties request", response)
            // })
            // .catch(error => {
            //     console.log("Error is ", error.response)
            // })
            .then(response => (this.orgunits_list = response.data))
      },

    }
  }
</script>
