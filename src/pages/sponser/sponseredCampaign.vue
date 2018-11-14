<template>
  <div class="content">
    <div class="md-layout">
      <div v-for="item in campaigns" :key="item._id" class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
        <chart-card :chart-image='loadImage(item.campaignImage)'>
          <template slot="content">
            <h4 class="title"><a @click="viewcamp">{{item.title}}</a></h4>
            <span class="category"><p>{{ item.category}}</p></span><br> <br>
            <div class="card-description">{{item.description}}</div> <br>
            <div>
              <div>From : {{ item.startdate|moment("DD-MM-YYYY")}}&emsp;&emsp;&emsp;&emsp;&emsp;
                      To : {{ item.enddate|moment("DD-MM-YYYY")}}
              </div>
              <div class="md-card-actions md-alignment-space-between">
                <div class="price"><h4>${{item.value}}</h4></div>
                  <div class="stats">
                    <p class="category">
                      <i class="md-icon md-icon-font md-theme-default">place</i>
                      {{item.place}}
                    </p>
                  </div>
              </div>
            </div>
          </template>
          <template slot="footer">
            <div class="status">
              {{item.status}}</div>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
          <md-button class="md-dense md-raised md-primary" @click="view(item._id)">view</md-button>
          </template>
          </chart-card>
       </div>
     </div>
   </div>
</template>
<script>
import {
  StatsCard,
  ChartCard,
  NavTabsCard,
  NavTabsTable,
  OrderedTable
} from '@/components'
import axios from 'axios'
export default {
  components: {
    StatsCard,
    ChartCard,
    NavTabsCard,
    NavTabsTable,
    OrderedTable
  },
  data () {
    return {
      item: {
        title: null,
        description: null,
        category: null,
        value: null,
        place: null,
        startdate: null,
        enddate: null,
        campaignImage: null,
        status: null
      },
      campaigns: []
    }
  },
  created: function () {
    const status = JSON.parse(window.localStorage.getItem('User'))
    var token = status.token
    axios.get('http://192.168.0.104:3200/api/sponseredCampaign', { headers: { 'x-access-token': token } })
      .then(response => {
        this.campaigns = response.data.data
      }).catch(function (e) {
        console.log('error when uploading')
      })
  },
  methods: {
    view: function (views) {
      let path1 = '/viewcampaign/' + views
      this.$router.push({
        path: path1
      })
    },
    sponser: function () {
      window.location.href = 'http://192.168.0.104:8080/#/sponser'
    },
    loadImage (camimg) {
      const url = 'http://192.168.0.104:3200/static/img/' + camimg
      return url
    },
    viewcamp: function () {
      var app = this
      app.$router.push('/viewcampaign')
    }
  }
}
</script>
<style scoped>
    .md-card-img {
        width: 100%;
        height: 170px;
    }
    .md-card .md-card-actions {
        margin: 0px 10px 10px;
        padding: 10px 0 0 0;
    }
    .category {
        float: right;
    }
    .title {
        float: left;
    }
    .md-card {
        display: inline-block;
        position: relative;
        width: 100%;
        margin: 25px 0;
        overflow: unset;
        min-height: 91%;
        -webkit-box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
        border-radius: 3px;
        color: rgba(0, 0, 0, 0.87);
        background: #fff;
    }
    .status {
        color: blueviolet;
        font-size: large;
    }
</style>
