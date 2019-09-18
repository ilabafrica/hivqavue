<template>
<app-layout>
  <div class="dashboard">

    <v-container class="my-5">      
      <h1 class="subheading grey--text">Home/Surveys/HTC Register Checklist/Questionaire</h1>

      <v-row > 
          <v-col class="lg12">
            <v-btn class="primary">View Collected Data</v-btn>
            <v-btn class="success">View Reports</v-btn>
            <v-btn class="info">Import Collected Data</v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="lg12">
          <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="name":counter="10":rules="nameRules"
        label="Name"
        required
      ></v-text-field>
  
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
  
      <v-select
        v-model="select"
        :items="items"
        :rules="[v => !!v || 'Item is required']"
        label="Item"
        required
      ></v-select>
  
      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>
  
      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
      >
        Validate
      </v-btn>
  
      <v-btn
        color="error"
        class="mr-4"
      >
        Reset Form
      </v-btn>
  
      <v-btn
        color="warning"
      >
        Reset Validation
      </v-btn>
    </v-form>
    </v-col>
        </v-row>
      
    </v-container>

  </div>
</app-layout>

</template>

<script>
  import DefaultLayout from '@/components/layouts/DefaultLayout.vue';

  export default {
    // vuetify: new Vuetify(),
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
      ],
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
