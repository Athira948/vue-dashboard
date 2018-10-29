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
                  <h3><b> Campaign Details: </b></h3>
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
      <div class="md-layout-item md-size-100 text-left">
        <button class="button" @click="addevent">Add Event</button>
      </div>
  </div>
</template>
<script>
import axios from 'axios';
import {eModal} from 'vue-eagle-modal'
export default{
  props: {
    dataBackgroundColor: {
      type: String,
      default: ''
    }
  },data: () =>{
    return {
      info: '',
      id:0,
      form:{
          title: null,
          description: null,
          category: null,
          value:null,   
          place: null,
          startdate:null,
          enddate:null,
          campaignImage:null,
          firstName:null,
          lastName:null,
          email:null,
          name:null,
          address:null,
          phoneNumber:null,
          pincode:null,
          city:null,
          country:null,
          accountType:'',
          status:null
        },
        fname: null
    }
  },
  methods:  {
     sponser: function (){
        //  var id=this.$route.params.id
        //   let path1 = '/sponser/' + id
        //         this.$router.push({
        //             path: path1
        //         })
    let id=this.$route.params.id
    const status = JSON.parse(window.localStorage.getItem('User'));
    var token=status.token
    var app=this
    const url='http://192.168.0.104:3200/api/sponsercampaign/'+id
    console.log(url)
    axios.post(url,{headers:{'x-access-token': token }})
      .then(res => {
          console.log(res)
              app.$toasted.show('Sponsered',{ 
              icon : 'check',
              fullWidth:false,
	            theme: "bubble", 
	            position: "bottom-right", 
	            duration : 5000})
      }).catch(function(err) {
            console.log('error in sponser page')
            app.$toasted.show('Not sponsered.Try again',{ 
            icon : 'error_outline',
            fullWidth:false,
	          theme: "bubble", 
	          position: "bottom-right", 
	          duration : 5000})
      })
     },   
      getImage:function (camimg){
      const url='http://192.168.0.104:3200/static/img/' + camimg;
      return url;
    },  
    addevent:function () {
      var app=this
      let m = app.$modals.open({
      title: 'Add Event',
      theme: 'osx',
      items: [{
                label: 'Title',
                name: 'title',
                type: 'text',
                attr: {
                        required: true
                      }
              },
              {
                label:'Description',
                name: 'description',
                type: 'textarea',
                attr: {
                        required: true
                      }
              },
              {
                name: "file",
                type: "file",
                label: "Image",
                attr: {
                        required: true,
                        multiple: false
                      }
              }
              ]
              });
               m.onopen(() => {
                  console.log('Open')
            })

                m.onsave((m) => {
                m.loading(); // add class load
                setTimeout(() => {
                  console.log(m.formData())
      	          console.log(m.getItems())
                  m.loaded() // remove class load
                  // var status=JSON.parse(window.localStorage.getItem('User'))
                  // var token=status.token
                  // console.log(item.title)
                  // var formData = new FormData();
                  // formData.append('title',item.title)
                  // formData.append('description',item.description)
                  // formData.append('image',item.file)
                  console.log('Saved')
                }, 500)
            })
            m.onclose(() => {
                  console.log('Close')
            })
        }
     },
 created(){
        let id=this.$route.params.id
        const status = JSON.parse(window.localStorage.getItem('User'));
        var token=status.token
        const url="http://192.168.0.104:3200/api/campaign/"+id
        axios.get(url,{headers:{'x-access-token': token}})
         .then (res =>{
               console.log(res)
               this.form.title = res.data.data.title
               this.form.category = res.data.data.category
               this.form.startdate = res.data.data.startdate
               this.form.enddate = res.data.data.enddate
               this.form.value = res.data.data.value
               this.form.description = res.data.data.description
               this.form.campaignImage = res.data.data.campaignImage
               this.form.place = res.data.data.place
               this.form.status=res.data.data.status
               console.log('saving...')
         })
        axios.get('http://192.168.0.104:3200/api/user',{headers:{'x-access-token': token}})
        .then(response => {
          console.log(response.data)
          this.form.firstName=response.data.data.firstName
          this.form.lastName=response.data.data.lastName
          this.form.accountType = response.data.data.accountType
          this.form.email=response.data.data.email
          this.form.city=response.data.data.city
          this.form.country=response.data.data.country
          this.form.address=response.data.data.address
          this.form.pincode=response.data.data.pincode
          this.form.phoneNumber=response.data.data.phoneNumber 
        })
   }
}
</script>
<style>
.column {
    float: left;
    width: 50%;
    padding: 10px;
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
</style>
