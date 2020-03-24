<template>
	<nav >
		<v-snackbar v-model="snackbar" :timeout="4000" top color="success">
			<span>Awesome! You added a new project.</span>
			<v-btn flat color="white" @click="snackbar = false">Close</v-btn>
		</v-snackbar>
		<v-snackbar v-model="snackbar" :timeout="4000" top color="success">
			<offline @detected-condition="handleConnectivityChange">
          <!-- Only renders when the device is online -->
          
          	<div slot="online">

        <p>It looks like you're online! Here's all the things you can do...</p>
         ...
        </div>
        <!-- Only renders when the device is offline -->
        <div slot="offline">
      <p>You appear to be offline, that's okay, we can still do things...</p>
      ...
    	</div>
		</offline>
    </v-snackbar>

		<v-toolbar app class="primary">
			<v-toolbar-side-icon class="grey--text" @click="drawer = !drawer"></v-toolbar-side-icon>
			<v-toolbar-title class="text-uppercase grey--text">
			<span class="font-weight-light">HIVQA</span>
			</v-toolbar-title>
			<v-spacer></v-spacer>

			<!--dropdown menu-->
			<v-menu offset-y>
				<v-btn flat slot="activator" color="grey">
					<v-icon left>expand_more</v-icon>
					<span>Menu</span>
				</v-btn>
				<v-list>
					<v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
						<v-list-tile-title>{{link.text}}</v-list-tile-title>
					</v-list-tile>
				</v-list>
			</v-menu>

			<v-btn flat color="grey" @click="signOut">
				<span>Sign Out</span>
				<v-icon right>exit_to_app</v-icon>
			</v-btn>
		</v-toolbar>
        
		<v-navigation-drawer app v-model="drawer" class="primary">
			<v-layout column align-center>
				<v-flex class="mt-5">
					<v-avatar size="100">
						<img src="/img/kenya.png">
					</v-avatar>
					<p class="white--text subheading mt-1">
						    HIVQA
					</p>
				</v-flex>
				<v-flex class="mt-4 mb-3">
					<Popup @projectAdded="snackbar = true"/>
				</v-flex>
			</v-layout>
			<v-list>
				<v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
					<v-list-tile-action>
						<v-icon class="white--text">{{link.icon}}</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title class="white--text">{{link.text}}</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>
	</nav>

</template>

<script>
	import Popup from './Popup';
  	import { AUTH_LOGOUT } from '../store/actions/auth';
  	import offline from 'v-offline';
   
   export default {
	components: {
		Popup,
		offline
	},
	data(){
		return{
			drawer: true,
			links: [
				{icon: 'dashboard', text: 'Dashboard', route: '/'},
				{icon: 'folder', text: 'My Projects', route: '/projects'},
				{icon: 'person', text: 'Team', route: '/team'},
			],
			snackbar: false
		}
	},
	methods: {
      signOut: function () {
        this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push('/login'))
      },
      handleConnectivityChange(status) {
      console.log(status);
     },
    },
}
</script>
