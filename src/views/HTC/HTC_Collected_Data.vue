<template>
<app-layout>
  <div class="dashboard">

    <v-container class="my-5">
      <h1 class="subheading grey--text">Home/Surveys/HTC Register Checklist</h1>
        <v-layout row wrap>
          <v-flex >
          <h2 class="subheading ">Collected Data</h2>
            <v-btn class="primary">Fill Questionaire</v-btn>
            <v-btn class="success">View Reports</v-btn>
            <v-btn class="info">Import Collected Data</v-btn>
          <v-data-table :headers="headers":items="desserts" :items-per-page="5" class="elevation-1"></v-data-table>
        </v-flex>
        </v-layout>

    </v-container>

  </div>
</app-layout>

</template>

<script>
  import DefaultLayout from '@/components/layouts/DefaultLayout.vue';

  export default {
    components: {
      'app-layout': DefaultLayout,
    },
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
