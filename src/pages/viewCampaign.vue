<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">View Campaign</h4>
          </md-card-header>
          <md-card-content>
            <div id="typography">
              <div class="row">
               <div class="column">
                <div class="w3-round-large" style="width:45%">
                  <img :src="getImage(form.campaignImage)" class="img">
                </div><br>
                <h3 style="color:blue;"><b>&nbsp; {{form.title}}</b></h3>
                <h4 style="color:#9c27b0;"><b>&emsp;${{form.value}}</b> </h4>
               <md-card-content> {{form.description}} </md-card-content>
                 <h4 style="color:black;">  &nbsp;<b>&nbsp; &nbsp;{{ form.startdate | moment(" MMMM Do YYYY") }}</b>&nbsp;&nbsp; to <b>&nbsp;&nbsp;{{ form.enddate | moment(" MMMM Do YYYY") }}</b></h4>
                </div>
                <div class="column">
                  <h3><b> {{account}} </b></h3>
                  <h4><li>Name : {{form.firstName}} {{form.lastName}}</li></h4>
                  <h4><li>Address : {{form.address}}</li></h4>
                      <h4 style = "text-indent: 30px;"> City : {{form.city}} </h4>
                      <h4 style = "text-indent: 30px;"> Country : {{form.country}} </h4>
                  <h4><li>Email : {{form.email}}</li></h4>
                  <h4><li>phoneNumber : {{form.phoneNumber}}</li></h4>
                  <h4><li>Pincode : {{form.pincode}}</li></h4>  <br>
                  <button class="button" @click="sponser" v-if="form.status=='Pending'"> Sponsor</button>
                </div>
              </div>
           </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Add Event</md-dialog-title>
      <md-tabs md-dynamic-height>
        <md-tab>
          <md-field>
            <label>Title</label>
            <md-input v-model="title" ></md-input>
          </md-field>
          <md-field>
            <label>Description</label>
            <md-textarea v-model="description" md-autogrow></md-textarea>
          </md-field>
          <md-field>
            <label>Upload Event Image</label>
            <md-file @change="onSelected" v-model="img" accept="image/*" />
          </md-field>
        </md-tab>
      </md-tabs>
      <md-dialog-actions>
        <md-button class="md-primary close" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="addevent">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-button class="md-primary md-raised" @click="showDialog = true" v-if="Uemail==Semail">Add Event</md-button>
    <br>
    <br>
    <div class="bubble" v-for="item in viewEvent" :key="item._id" v-if="user==item.from">
      <img :src="getImage(item.image)"  class="imgi">
      <span class="posted"  >Posted by you at {{ item.date | moment(" h:mm:ss a,dddd, MMMM Do YYYY") }}</span>    <h3 class="ititle"> {{item.title}}  </h3>
      <span> {{item.description}} </span>
      <br>
    </div>
    <div class="bubble2" v-for="item in viewEvent" :key="item._id" v-if="user!=item.from">
      <img :src="getImage(item.image)" class="imgi">
      <span class="posted">Posted by {{name}} at {{ item.date | moment(" h:mm:ss a,dddd, MMMM Do YYYY") }}</span>
      <h3 class="ititle"> {{item.title}}  </h3>
      <span> {{item.description}} </span>
      <br>
    </div>
   <br>
  </div>
</template>
<script>
import axios from 'axios'
export default{
  props: {
    dataBackgroundColor: {
      type: String,
      default: ''
    }
  },
  data: () => {
    return {
      showDialog: false,
      account: null,
      info: '',
      id: 0,
      img: null,
      fname: null,
      title: null,
      active: false,
      name: null,
      description: null,
      viewEvent: [],
      user: null,
      from: null,
      Uemail: null,
      Semail: null,
      add: null,
      form: {
        title: null,
        description: null,
        category: null,
        value: null,
        place: null,
        startdate: null,
        enddate: null,
        campaignImage: null,
        firstName: null,
        lastName: null,
        email: null,
        name: null,
        address: null,
        phoneNumber: null,
        pincode: null,
        city: null,
        country: null,
        accountType: '',
        status: null
      }
    }
  },
  methods: {
    sponser: function () {
      let id = this.$route.params.id
      const status = JSON.parse(window.localStorage.getItem('User'))
      var token = status.token
      var app = this
      const url = 'http://192.168.0.104:3200/api/sponsercampaign/' + id
      axios.post(url, { headers: { ' x-access-token': token } })
        .then(res => {
          app.$toasted.show('Sponsered', {
            icon: 'check',
            fullWidth: false,
            theme: 'bubble',
            position: 'bottom-right',
            duration: 5000 })
        }).catch(function (err) {
          console.log('error in sponser page : ', err)
          app.$toasted.show('Not sponsered.Try again', {
            icon: 'error_outline',
            fullWidth: false,
            theme: 'bubble',
            position: 'bottom-right',
            duration: 5000 })
        })
    },
    getImage: function (camimg) {
      const url = 'http://192.168.0.104:3200/static/img/' + camimg
      return url
    },
    onSelected () {
      this.fname = event.target.files[0]
      this.img = this.fname.name
    },
    addevent: function () {
      this.showDialog = false
      var status = JSON.parse(window.localStorage.getItem('User'))
      var token = status.token
      this.by = status.data.address
      let id = this.$route.params.id
      var formData = new FormData()
      formData.append('id', id)
      formData.append('title', this.title)
      formData.append('description', this.description)
      formData.append('eventimg', this.fname)
      axios.post('http://192.168.0.104:3200/api/addevent', formData, { headers: { 'x-access-token': token, 'Content-Type': 'multipart/form-data' } })
        .then(res => {
          console.log('saved Event')
          window.location.reload()
          let id = this.$route.params.id
          const status = JSON.parse(window.localStorage.getItem('User'))
          var token = status.token
          const url = 'http://192.168.0.104:3200/api/campaigndetails/' + id
          axios.get(url, { headers: { 'x-access-token': token, 'Content-Type': 'multipart/form-data' } })
            .then(res => {
              this.viewEvent = res.data.data.events
            })
        })
    }
  },
  created () {
    let id = this.$route.params.id
    const status = JSON.parse(window.localStorage.getItem('User'))
    var token = status.token
    const url = 'http://192.168.0.104:3200/api/campaigndetails/' + id
    axios.get(url, { headers: { 'x-access-token': token, 'Content-Type': 'multipart/form-data' } })
      .then(response => {
        this.viewEvent = response.data.data.events
        axios.get('http://192.168.0.104:3200/api/user', { headers: { 'x-access-token': token } })
          .then(res => {
            this.user = res.data.data.walletaddress
            this.Semail = res.data.data.email
          })
      })
    axios.get('http://192.168.0.104:3200/api/user', { headers: { 'x-access-token': token } })
      .then(res => {
        if (res.data.data.accountType === 'sponsers') {
          this.account = 'Campaigner Details'
          const url2 = 'http://192.168.0.104:3200/api/campaigndetails/' + id
          axios.get(url2, { headers: { 'x-access-token': token, 'Content-Type': 'multipart/form-data' } })
            .then(res => {
              this.form.firstName = res.data.data.user.firstName
              this.form.lastName = res.data.data.user.lastName
              this.form.accountType = res.data.data.user.accountType
              this.form.email = res.data.data.user.email
              this.form.city = res.data.data.user.city
              this.form.phoneNumber = res.data.data.user.phoneNumber
              this.form.pincode = res.data.data.user.pincode
              this.form.country = res.data.data.user.country
              this.form.address = res.data.data.user.address
              this.name = res.data.data.user.firstName + ' ' + res.data.data.user.lastName
              this.form.campaignImage = res.data.data.campaignImage
              this.form.startdate = res.data.data.startdate
              this.form.enddate = res.data.data.enddate
              this.form.value = res.data.data.value
              this.form.title = res.data.data.title
              this.form.description = res.data.data.description
              const urlt = 'http://192.168.0.104:3200/api/usercampaigndetails/' + id
              axios.get(urlt, { headers: { 'x-access-token': token, 'Content-Type': 'multipart/form-data' } })
                .then(res => {
                  this.Uemail = res.data.data.user.email
                })
            })
        } else {
          this.account = 'Sponser Details'
          const urls = 'http://192.168.0.104:3200/api/usercampaigndetails/' + id
          axios.get(urls, { headers: { 'x-access-token': token, 'Content-Type': 'multipart/form-data' } })
            .then(res => {
              this.form.firstName = res.data.data.user.firstName
              this.form.lastName = res.data.data.user.lastName
              this.form.accountType = res.data.data.user.accountType
              this.form.email = res.data.data.user.email
              this.form.city = res.data.data.user.city
              this.form.phoneNumber = res.data.data.user.phoneNumber
              this.form.pincode = res.data.data.user.pincode
              this.form.country = res.data.data.user.country
              this.form.address = res.data.data.user.address
              this.name = res.data.data.user.firstName + ' ' + res.data.data.user.lastName
              this.form.campaignImage = res.data.data.campaignImage
              this.form.startdate = res.data.data.startdate
              this.form.enddate = res.data.data.enddate
              this.form.value = res.data.data.value
              this.form.title = res.data.data.title
              this.form.description = res.data.data.description
              const urls = 'http://192.168.0.104:3200/api/campaigndetails/' + id
              axios.get(urls, { headers: { 'x-access-token': token, 'Content-Type': 'multipart/form-data' } })
                .then(res => {
                  this.Uemail = res.data.data.user.email
                })
            })
        }
      })
  }
}
</script>
<style scoped>
.bubble {
  position: relative;
  background: mediumseagreen;
  border: 6px solid lightgray;
  max-width:91%;
  padding:10px;
  color: whitesmoke;
  font-family:arial;
  margin:0 auto;
  font-size:14px;
  border-radius:25px;
}
.bubble:after,
.bubble:before {
  right: 100%;
  top: 50%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.bubble:after {
  border-color: rgba(255, 255, 204, 0);
  border-width: 15px;
  margin-top: -15px;
}
.bubble:before {
  border-color: rgba(255, 204, 0, 0);
  border-right-color: mediumseagreen;
  border-width: 16px;
  margin-top: -16px;
}
.bubble2 {
  position: relative;
  background: darkgray;
  border: 6px solid lightgray;
  max-width:91%;
  padding:10px;
  color: whitesmoke;
  font-family:arial;
  margin:0 auto;
  font-size:14px;
  border-radius:25px;
}
.bubble2:after,
.bubble2:before {
  right: 100%;
  top: 50%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.bubble2:after {
  border-color: rgba(255, 255, 204, 0);
  border-width: 15px;
  margin-top: -15px;
}
.bubble2:before {
  border-color: rgba(255, 204, 0, 0);
  border-right-color: darkgray;
  border-width: 16px;
  margin-top: -16px;
}
.by {
  float:right
}
.md-title {
    font-size: 25px;
    font-weight: 500;
    letter-spacing: .005em;
    line-height: 47px;
}
.md-dialog {
    width: 53%;
}
.md-dialog-title {
    margin-bottom: 5%;
    padding: 14px 27px 0;
}
.md-tab {
    width: 100%;
    flex: 1 0 100%;
    padding: 16px;
}
.md-tabs-container {
    display: flex;
    align-items: flex-start;
    flex-wrap: nowrap;
    transform: translateZ(0);
    transition: transform .35s cubic-bezier(.4,0,.2,1);
    will-change: transform;
    padding-left: 8%;
}
.md-tabs-navigation {
    display: none;
    position: relative;
}
.md-dialog-container {
    display: flex;
    /* flex-flow: wrap-reverse; */
}
.imgi {
   border-radius: 50%;
   width: 160px;
  height: 80px;
}
.column {
    float: left;
    width: 50%;
    padding: 10px;
}
.close {
  float: left;
}
.posted {
 float: right;
}
.md-datepicker-header{
    background: black;
}
.button {
    padding: 15px 25px;
    font-size: 15px;
    text-align: center;
    cursor: pointer;
    outline: none;
    color: #fff;
    background-color: #4CAF50;
    border: none;
    border-radius: 15px;
}
.ititle {
      color: black;
    text-transform: uppercase;
    font-family: monospace;
}
</style>
