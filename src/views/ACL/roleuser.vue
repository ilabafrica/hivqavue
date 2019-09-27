<template>
	<app-layout>
	<h3>role user</h3>
  </app-layout>
</template>

<script>
  import DefaultLayout from '@/components/layouts/DefaultLayout.vue';
  import apiCall from '../../utils/api'
  import _ from 'lodash'
  import Vue from 'vue'

  export default {
    name: 'RoleUser',
    components: {
      'app-layout': DefaultLayout,
    },  
    data: () => ({
      valid: true,
      search: '',
      query: '',
      headers: [
        { text: 'Users', value: 'users' },
      ],
      pagination: {
        page: 1,
        per_page: 0,
        total: 0,
        visible: 10
      },
      rolesusers: [],
      roleUserIds: [],
      users: [],
      roles: [],
    }),

    computed: {

      length: function() {
        return Math.ceil(this.pagination.total / this.pagination.per_page);
      },
    },

    beforeCreate() {
      apiCall({url: '/api/role', method: 'GET' })
        .then(resp => {
          console.log(resp)
          this.roles = resp;
          for (var i = 0; i < resp.length; i++) {
            this.headers.push({
              text: resp[i].name,
              value: resp[i].name
            })
          }
        })
        .catch(error => {
          console.log(error.response)
        })

        apiCall({url: '/api/roleuser', method: 'GET' })
        .then(resp => {
          console.log(resp)
          this.rolesusers = resp;
          this.roleUserIds = _.map(this.rolesusers, 'id');
        })
        .catch(error => {
          console.log(error.response)
        })
    },

    created () {
      this.initialize()
    },

    methods: {

      initialize () {

        this.query = 'page='+ this.pagination.page;
        if (this.search != '') {
            this.query = this.query+'&search='+this.search;
        }

        apiCall({url: '/api/user?' + this.query, method: 'GET' })
        .then(resp => {
          console.log(resp.data)
          this.users = resp.data;
          this.pagination.per_page = resp.per_page;
          this.pagination.total = resp.total;
        })
        .catch(error => {
          console.log(error.response)
        })
      },

      getAssignment (user, role) {
          var value = 0;
          for (var i = this.rolesusers.length - 1; i >= 0; i--) {
            if (user.id == this.rolesusers[i].user_id &&
              role.id == this.rolesusers[i].role_id) {

              value = this.rolesusers[i].id;
              break;
            }else{
              value = user.id+'_'+role.id;
            }
          }
          return value;
      },

      toggleAssignment (user,role) {

        this.query = 'user_id='+ user.id+'&&role_id='+ role.id;

        var roleUserId = this.getAssignment(user, role);
        // if attached
        if (_.includes(this.roleUserIds, roleUserId)) {

          console.log('dettach role-user')
          // detach
          apiCall({
            url: '/api/roleuser/detach?'+this.query,
            method: 'GET'
          })
          .then(response => {
            console.log(response)
            _.remove(this.roleUserIds, item => item === roleUserId);

          })
          .catch(error => {
            console.log(error.response)
          })
        } else {

          console.log('attach role-user')
          // attach
          apiCall({
            url: '/api/roleuser/attach?'+this.query,
            method: 'GET'
          })
          .then(response => {
            console.log(response)
            let roleUserIds = this.roleUserIds
            roleUserIds.push(response.id)
            Vue.set(this,"roleUserIds",roleUserIds)
          })
          .catch(error => {
            console.log(error.response)
          })

        }
      },

    }
  }
</script>