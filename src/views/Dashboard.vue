<template>
  <div class="dashboard">
  	<h1 class="subheading grey--text">Dashboard</h1>

  	<v-container class="my-5">
  			<v-layout row wrap>
  				<v-flex xs6 sm4 md3>
  					<v-card app class="pa-3 ma-1">
  						<div class="caption grey--text">User Card</div>
  					</v-card>
  				</v-flex>
  				<v-flex xs12 md6>
  					<v-card class="pa-3 ma-1">
  						<div class="caption  grey--text">Recommended Jobs</div>
  					</v-card>
            <v-card class="pa-3 ma-1">
              <div class="caption grey--text">Other Jobs</div>
            </v-card>
  				</v-flex>
  				<v-flex xs12 md3>
  					<v-card class="pa-3 ma-1">
  						<div class="caption grey--text">Top Jobs</div>
  					</v-card>
  					<v-card class="pa-3 ma-1">
  						<div class="caption grey--text">Most Viewed Companies</div>
  					</v-card>
  				</v-flex>
  			</v-layout>
  	</v-container>
  </div>
</template>

<script>

  export default {
    mounted(){
      //console.log(this.$state)
    }
  }
</script>
