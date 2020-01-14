<template>
  <v-app id="inspire" class="app dashboard">
    <app-drawer class="app--drawer" :show-drawer="showDrawer"></app-drawer>
    <app-toolbar class="app--toolbar" @side-icon-click="handleDrawerVisiable"></app-toolbar>
    <v-content>
      <!-- Page Header -->
      <div class="page-wrapper">
      <!-- <page-header></page-header> -->
        <!-- <router-view></router-view> -->
        <div class="app-layout-main">
          <div class="column is-8">
            <slot/>          
          </div>
        </div>
      </div>
      <!-- App Footer -->
      <v-footer height="auto" class="white pa-3 app--footer">
        <span class="caption">Ministry of Health - National Public Health Laboratory  &copy; {{ new Date().getFullYear() }}</span>
        <v-spacer></v-spacer>
      </v-footer>
    </v-content>
    <!-- Go to top -->
    <app-fab></app-fab>
  </v-app>
</template>

<script>
import AppDrawer from "@/components/navsettings/AppDrawer"
import AppToolbar from "@/components/navsettings/AppToolbar"
import AppFab from "@/components/navsettings/AppFab"
import PageHeader from "@/components/navsettings/PageHeader"

export default {
  components: {
    AppDrawer,
    AppToolbar,
    AppFab,
    PageHeader
  },

  data() {
    return {
      showDrawer: true
    }
  },
  methods: {
    handleDrawerVisiable() {
      this.showDrawer = !this.showDrawer
    }
  },
  created() {}
};
</script>

<style scoped>
.page-wrapper {
  min-height: calc(100vh - 64px - 50px - 81px);
}
</style>
