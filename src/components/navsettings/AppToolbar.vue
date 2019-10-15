<template>
  <v-toolbar color="primary" fixed dark app>
    <v-toolbar-title>
      <v-toolbar-side-icon @click="handleDrawerToggle"></v-toolbar-side-icon>
    </v-toolbar-title>
    <v-text-field flat solo-inverted prepend-inner-icon="search" label="Search" clearable class="search"></v-text-field>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn icon @click="handleFullScreen()">
        <v-icon>fullscreen</v-icon>
      </v-btn>
      <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
        <v-btn icon large flat slot="activator">
          <v-avatar size="50px">
            <img src="/avatar-1.png" alt="Avator" />
          </v-avatar>
        </v-btn>
        <v-list class="pa-0">
          <v-list-tile
            v-for="(item, index) in items"
            :to="!item.href ? { name: item.name } : null"
            :href="item.href"
            @click="item.click"
            ripple="ripple"
            :disabled="item.disabled"
            :target="item.target"
            rel="noopener"
            :key="index"
          >
            <v-list-tile-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>

import Fullscreen from "@/utils/fullscreen"
import { AUTH_LOGOUT } from '../../store/actions/auth'

export default {
  name: "AppToolbar",  
  data() {
    return {
      items: [
        {
          icon: "account_circle",
          href: "#",
          title: "Profile",
          click: this.handleProfile
        },        
        {
          icon: "fullscreen_exit",
          href: "#",
          title: "Logout",
          click: this.Logout
        }
      ]
    }
  },
  computed: {
    toolbarColor() {
      return this.$vuetify.options.extra.mainNav
    }
  },
  methods: {
    handleDrawerToggle() {
      this.$emit("side-icon-click")
    },
    handleFullScreen() {
      Fullscreen.toggleFullScreen()
    },
    Logout: function () {
        this.$store.dispatch(AUTH_LOGOUT)
        .then((response) => {
          setTimeout(() => {
          console.log(response)
          this.$router.push('/auth/login')
          }, 1000)
        })
     },   
    handleProfile() {

    }
  }
};
</script>


