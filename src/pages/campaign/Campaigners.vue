<template>
  <div class="content">
        <md-card class="md-card-plain">
          <md-card-header data-background-color="green">
            <h4 class="title">Campaigners</h4>
          </md-card-header>        
        </md-card>
    <div class="md-layout" >
<div v-for="item in campaigns" :key="item._id" class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
  <div class="md-card md-card-product md-theme-default" data-count="">
    <div class="md-card-header md-card-header-image animated" data-header-animation="true">
      <img :src="getImage(item.campaignImage)" class="img">
      </div>
      <div class="md-card-content">
        <div class="md-card-action-buttons text-center">
          <button @click="edit(item._id)"  v-if="item.status=='Pending'" class="md-button md-success md-simple md-just-icon md-theme-default">
            <div class="md-ripple">
              <div class="md-button-content">
                <i class="md-icon md-icon-font md-theme-default ">edit</i>
              </div>
            </div>
          </button>
           <button @click="view(item._id)" class="md-button md-success md-simple md-just-icon md-theme-default">
            <div class="md-ripple">
              <div class="md-button-content">
               <i class="md-icon md-icon-font md-theme-default">art_track</i>
              </div>
            </div>
          </button>
        </div>
        <h4 class="title">
          <a href="#pablo">{{item.title}}</a>
        </h4>
        <div class="card-description">
      {{item.description}}
      </div>
      </div>
      <div class="md-card-actions md-alignment-space-between">
        <div class="price">
          <h4>${{item.value}}</h4>
        </div>
        <div class="stats">
          <p class="category">
            <i class="md-icon md-icon-font md-theme-default">place</i>
           {{item.place}}
          
          </p>
        </div>
      </div>
            <div class="md-card-actions md-alignment-space-between">
        <div class="price">
          <h4>{{ item.startdate | moment(" MMMM Do YYYY") }}</h4>
        </div>&emsp;&emsp;&emsp;&emsp;
        <div class="stats">
         
            <h4>{{ item.enddate | moment(" MMMM Do YYYY") }}</h4>
       
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
</template>
<script>
import {
    ChartCard,
   
  } from '@/components'
import axios from 'axios';
import AddCampaignVue from './AddCampaign.vue';
export default{
  components: {
      ChartCard,
      },
  data: () =>{
    return {
      info: '',
      id:0,
      item:{
          title: null,
          description: null,
          category: null,
          value:null,   
          place: null,
          startdate:null,
          enddate:null,
          campaignImage:null,
          status:null
        },
        campaigns:[],
        userSaved: false,
        sending: false,
        lastUser: null,
      }
    },
  created: function() {
  
       const status = JSON.parse(window.localStorage.getItem('User'));
       console.log(status)
       var data=this.form
       var token=status.token
       console.log(status.data)
       axios.get('http://localhost:3200/api/mycampaigns',{headers:{'x-access-token': token}})
         .then(response=> {
          console.log(response.data.data[0])
          this.campaigns=response.data.data;
          this.status=response.data.data;
          }).catch (function(e){
           console.log('errwhen uploading')
         })
  },
methods:{
    getImage:function (camimg) {
      const url='http://localhost:3200/static/img/' + camimg;
      return url;
    },
  edit(editcampaign){
     let path1='/editcampaign/'+editcampaign
     this.$router.push({path:path1})
     },
     view(viewCampaign){
     let path1='/viewcampaign/'+viewCampaign
     this.$router.push({path:path1})
     console.log(path1)
    },
},
 }
</script>
<style>
  .md-card .md-card-header.md-card-header-image img {
    border-radius: 6px;
    box-shadow: 0 5px 15px -8px rgba(0,0,0,.24), 0 8px 10px -5px rgba(0,0,0,.2);
    pointer-events: none;
    width: 100%;
    }
  .md-card .md-card-header.md-card-header-image {
    border-radius: 6px;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: -30px;
    padding: 0;
    position: relative;
    z-index: 2;
}
</style>
