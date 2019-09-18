<template>
	
	<div id="inspire"> 
	<v-card class="elevation-3" id="login-card">
		<v-snackbar v-model="snackbar" :timeout="4000" top color="success">
			<span>Account Created. We've sent you an activation link via email.</span>
			<v-btn flat color="white" @click="errorsnackbar = false">Close</v-btn>
		</v-snackbar>
		<v-snackbar v-model="errorsnackbar" :timeout="4000" top color="error">
			<span>Something went wrong. Kindly try again</span>
			<v-btn flat color="white" @click="errorsnackbar = false">Close</v-btn>
		</v-snackbar>
		<Loading v-if='authLoading'/>
		<v-toolbar class="elevation-0">
        <v-toolbar-title>R-Placement</v-toolbar-title>
        <v-spacer></v-spacer>
      	</v-toolbar>
		  <v-form class="px-3"
		    ref="form"
		    v-model="valid"
		    lazy-validation
		  >
			  <v-card-text>
			  	<v-text-field
			      v-model="userData.name"
			      :rules="nameRules"
			      prepend-icon="person"
			      name="name"
			      label="Username"
			      required
			    ></v-text-field>
			    <v-text-field
			      v-model="userData.email"
			      :rules="emailRules"
			      prepend-icon="mail"
			      name="email"
			      label="E-mail"
			      required
			    ></v-text-field>
			    <v-text-field
			    	v-model="userData.password"
				    prepend-icon="lock"
				    :rules="passwordRules"
				    name="password"
				    label="Password"
				    type="password"
				  ></v-text-field>
				  <v-text-field
			    	v-model="confirmpassword"
				    prepend-icon="lock"
				    :rules="passwordConfirmRules"
				    name="password"
				    label="Confirm Password"
				    type="password"
				  ></v-text-field>
				</v-card-text>
				<v-card-actions>
					<div>
				        <v-btn flat small to="login">Login</v-btn>
				      </div>
		        	<v-spacer></v-spacer>
					<v-btn color="primary" round :disabled="!valid" @click="create" :loading="loading">
				          Create account
				    </v-btn>
				</v-card-actions>
		  </v-form>
	</v-card>
	</div>
</template>
<style>
  main{
    padding-top:0px !important;
  }
  #login-card{
    position: absolute;
    top:20vh;
    right:30vw;
    min-width: 400px;
    width:40vw;
    max-width: 800px;
  }
</style>
<script>
  import apiCall from '../utils/api'
  import Loading from './loading'
  import { mapState } from 'vuex'
  export default {
  	name: 'Register',
    components: {
      Loading
    },
    data: () => {
    	return {
    	  snackbar: false,
    	  errorsnackbar: false,
    	  loading: false,
	      valid: true,

	      confirmpassword: '',

	      passwordConfirmRules: [
	      	v => !!v || 'Password Confirm is required'
	      ],
	      
	      nameRules: [
	        v => !!v || 'Name is required'
	      ],
	      
	      passwordRules: [
	        v => !!v || 'Password is required'
	      ],
	      
	      emailRules: [
	        v => !!v || 'E-mail is required',
	        v => /.+@.+/.test(v) || 'E-mail must be valid'
	      ],
	      userData: {
	      	name: '',
	      	password: '',
	      	email: '',
	      }
	  };
    },

    methods: {
      reset () {
        this.$refs.form.reset()
      },
      create () {
      	if (this.$refs.form.validate()) {
      		this.loading = true
      		apiCall({url: '/api/register', data: this.userData, method: 'POST' })
          .then(resp => {
          	this.loading = false;
            this.snackbar = true;
          })
          .catch(error => {
          	this.loading = false;
            this.errorsnackbar = true;
          })
      	}
	 }
    },
    computed: {
	    ...mapState({
	      authLoading: state => state.auth.status === 'loading',
	    })
	  },
  }
</script>