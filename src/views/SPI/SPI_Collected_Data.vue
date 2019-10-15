<template>
  <div class="dashboard">
  	<v-container class="my-5">  		
      <h1 class="subheading grey--text">Home/Surveys/SPI-RT Checklist/Collected Data</h1>
        <v-row > 
          <v-col class="lg12">
            <v-btn class="primary">Fill Questionaire</v-btn>
            <v-btn class="success">View Reports</v-btn>
            <v-btn class="info">Import Collected Data</v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="lg12">
           <v-data-table :headers="headers":items="desserts" :items-per-page="5" class="elevation-1"></v-data-table>
          </v-col>
        </v-row>  		
  	</v-container>

  </div>
</template>

<script>
  export default {    
    mounted(){
      console.log(this.$state)
    },
    data () {
    return {
      headers: [
        {
          text: 'QA Officer',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'Facility', value: 'fat' },
        { text: 'SDP', value: 'carbs' },
        { text: 'Action', value: 'protein' },
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
        }
      ]
    }
    }
  }
</script>
