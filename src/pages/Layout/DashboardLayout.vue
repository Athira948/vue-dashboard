<template>
  <div class="wrapper" :class="{'nav-open': $sidebar.showSidebar}">
    <notifications></notifications>

    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/user">
        <md-icon>person</md-icon>
        <p>My Account</p>
      </sidebar-link>
      <!-- <sidebar-link to="/table">
        <md-icon>content_paste</md-icon>
        <p>User List</p>
      </sidebar-link> -->
      <sidebar-link to="/addcampaign" v-if="type==='campaigners'">
        <md-icon>add</md-icon>
        <p>Add Campaign</p>
      </sidebar-link>
       <sidebar-link to="/recepientlist" v-if="type==='sponsers'">
        <md-icon>library_books</md-icon>
        <p>Recepient List</p>
      </sidebar-link>
       <sidebar-link to="/campaigners" v-if="type==='campaigners'">
        <md-icon>library_books</md-icon>
        <p> My Campaigners</p>
      </sidebar-link>
        <sidebar-link to="/sponseredCampaign" v-if="type==='sponsers'">
        <md-icon>content_paste</md-icon>
        <p> Sponsered Campaigners</p>
      </sidebar-link>
     </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content>

      </dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
import TopNavbar from './TopNavbar.vue'
import ContentFooter from './ContentFooter.vue'
import DashboardContent from './Content.vue'
import MobileMenu from '@/pages/Layout/MobileMenu.vue'

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu
  },
  data(){
    return {
      type : null
    }
  },
  created : function () {
    var status=JSON.parse(window.localStorage.getItem('User'))
    this.type=status.data.accountType
  }
}
</script>
