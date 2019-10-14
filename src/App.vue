<template>
  <div class="app-root mt-3">
     <!-- <Navbar v-if="['Login', 'Register'].indexOf($route.name) == -1"/> -->
     <router-view></router-view>

    <!-- <v-btn small fab dark falt fixed top="top" right="right" class="setting-fab" color="red" @click="openThemeSettings">
      <v-icon>settings</v-icon>
    </v -btn>

     <v-navigation-drawer class="setting-drawer" temporary right v-model="rightDrawer" hide-overlay fixed>
      <theme-settings></theme-settings>
    </ v-navigation-drawer>

    <v-snackbar :timeout="3000" bottom right :color="snackbar.color" v-model="snackbar.show">
      {{ snackbar.text }}
      <v-btn dark flat @click.native="snackbar.show = false" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar> -->
  </div>
</template>

<script>

import ThemeSettings from '@/components/ThemeSettings'
// import Navbar from  '@/components/Navbar'
import AppEvents from "./event"

export default {
  name : 'App',
  // data() {
  //   return {
  //     rightDrawer: false,
  //     snackbar: {
  //       show: false,
  //       text: "",
  //       color: ""
  //     }
  //   }
  // },  
};
</script>

