<template>
  <v-app class="split-bg">
   <Loading v-if='authLoading'/>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-snackbar v-model="errorsnackbar" :timeout="4000" top color="error">
            <span>Wrong Email or Password </span>
            <v-btn flat color="white" @click="errorsnackbar = false">Close</v-btn>
             </v-snackbar>
            <v-card class="elevation-3 pa-3" id="login-card">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="/img/kenya.png" alt="Vue Material Admin" width="120" height="120" />
                  <h1 class="flex my-4 primary--text">
                  HIVQA
                  </h1>
                </div>
                <v-form ref="form"
                   v-model="valid"
                   lazy-validation>
                <v-card-text>
                <v-text-field
                  v-model="username"
                  :rules="emailRules"
                  prepend-icon="person"
                  name="username"
                  label="E-mail"
                  required
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    prepend-icon="lock"
                    :rules="passwordRules"
                    name="password"
                    label="Password"
                    type="password"
                  ></v-text-field>
                </v-card-text>
                </v-form>
              </v-card-text>
              <div class="login-btn">
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="login" :loading="loading">Login</v-btn>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import {AUTH_REQUEST} from '../store/actions/auth'
  import Loading from './loading'
  import { mapState } from 'vuex'
 export default {
    name: 'Login',
    components: {
      Loading
    },
   data: () => {
        return {
          errorsnackbar: false,
          loading: false,
          valid: true,
          password: '',
          passwordRules: [
            v => !!v || 'Password is required'
          ],
          username: '',
          emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid'
          ],
      };
    },

    methods: {
        login: function () {
        console.log(this.$store)
        if (this.$refs.form.validate()) {
            this.loading = true
           const { username, password } = this
           this.$store.dispatch(AUTH_REQUEST, { username, password })
           .then((response) => {
             setTimeout(() => {
              this.$router.push("/dashboard")
              }, 4000)
           }).catch((response) => {
                this.errorsnackbar = true
                this.loading = false
           });
        }
     },
      reset () {
        this.$refs.form.reset()
      },

  },
   computed: {
        ...mapState({
          authLoading: state => state.auth.status === 'loading',
        })
      },
};
</script>

<style scoped lang="css">
.split-bg {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}

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

