import DashboardLayout from '@/pages/Layout/DashboardLayout.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/pages/Dashboard.vue'
import UserProfile from '@/pages/UserProfile.vue'
import TableList from '@/pages/TableList.vue'
import AddCampaign from '@/pages/campaign/AddCampaign.vue'
import Icons from '@/pages/Icons.vue'
import Transactions from '@/pages/Transactions.vue'
import RecepientList from '@/pages/sponser/RecepientList.vue'
import Signup from '@/pages/Signup.vue'
import Login from '@/pages/Login.vue'
import viewCampaign from '@/pages/viewCampaign.vue'
import sponser from '@/pages/sponser.vue'
import transfer from '@/pages/transfer.vue'
import campaigners from '@/pages/campaign/Campaigners.vue'
import sponseredCampaign from '@/pages/sponser/sponseredCampaign'
import sponserView from '@/pages/sponser/sponserView'
import EditCampaign from '@/pages/campaign/editcampaign.vue'
Vue.use(VueRouter)
const routes = [{
  path: '/',
  component: DashboardLayout,
  name: 'camp',
  redirect: '/login',
  children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: 'user',
    name: 'User Profile',
    component: UserProfile
  },
  {
    path: 'table',
    name: 'Table List',
    component: TableList
  },
  {
    path: 'addcampaign',
    name: 'AddCampaign',
    component: AddCampaign
  },
  {
    path: 'recepientlist',
    name: 'RecepientList',
    component: RecepientList
  },
  {
    path: 'icons',
    name: 'Icons',
    component: Icons
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: Transactions
  },
  {
    path: '/viewcampaign/:id',
    name: 'viewCampaign',
    component: viewCampaign
  },
  {
    path: '/sponserView',
    name: 'sponserCampaign',
    component: sponserView
  },
  {
    path: '/sponser/:id',
    name: 'sponser',
    component: sponser
  },
  {
    path: '/transfer',
    name: 'transfer',
    component: transfer
  },
  {
    path: '/campaigners',
    name: 'campaigners',
    component: campaigners
  },
  {
    path: '/sponseredCampaign',
    name: 'sponseredCampaign',
    component: sponseredCampaign
  },
  {
    path: '/editcampaign/:id',
    name: 'editcampaign',
    component: EditCampaign
  }
  ]
},
{
  path: '/signup',
  component: Signup
},
{
  path: '/login',
  component: Login,
  name: 'login'
}
]
export default routes
