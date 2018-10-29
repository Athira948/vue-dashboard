<template>
<form novalidate  @submit.prevent="validateUser">
    <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header data-background-color="green">
          <h4 class="title">Edit Campaigner</h4>
        </md-card-header>
         <md-card-content>
            <div id="typography">
               <div class="title">
                <div class="left">
                  <md-field :class="getValidationClass('title')">
                    <label for="title">Title</label>
                    <md-input name="title" id="title" type= "text" v-model="form.title" :disabled="sending"  />
                    <span class="md-error" v-if="!$v.form.title.required">This field is required</span>
                  </md-field>
                </div>
                  <div class="">
                  <div class="right">  
                    <md-field :class="getValidationClass('campaignImage')">
                     <label for="campaignImage">CampaignImage</label>
                     <md-file name="campaignImage" type= "String" id="campaignImage" @change="onSelected" v-model="form.campaignImage" :disabled="sending" />
                     <span class="md-error" v-if="!$v.form.campaignImage.required">This field is required</span>
                    </md-field>
                  </div>
                </div>
                 <div class="">
                   <div class="left">
                     <md-field :class="getValidationClass('description')">
                      <label for="description">Description</label>
                      <md-input name="description" id="description" type= "text"  v-model="form.description"  :disabled="sending" />
                      <span class="md-error" v-if="!$v.form.description.required">This field is required</span>
                     </md-field>
                   </div>
                  </div>
                 <div class="right">
                  <md-field :class="getValidationClass('category')">
                    <label for="category">Category</label>
                    <md-input name="category" id="category" type= "String" v-model="form.category"  :disabled="sending" />
                    <span class="md-error" v-if="!$v.form.category.required">This field is required</span>
                  </md-field>
                </div>
                <div class="">   
                  <div class="left"> 
                  <md-field :class="getValidationClass('value')">
                    <label for="value">Value</label>
                    <md-input name="value" type= "Number" id="value"  v-model="form.value" :disabled="sending" />
                    <span class="md-error" v-if="!$v.form.value.required">This field is required</span>
                  </md-field>
                 </div>
                  </div>
                   <div class="right">
                  <md-field :class="getValidationClass('place')">
                    <label for="place">Place</label>
                    <md-input name="place" id="place" type= "string" v-model="form.place"   :disabled="sending" />
                    <span class="md-error" v-if="!$v.form.place.required">This field is required</span>
                  </md-field>
                </div>
                  <div class="">
                    <div class="left">
                     <md-datepicker :class="getValidationClass('enddate')"
                      type= "String" id="enddate" v-model="form.enddate"   :disabled="sending" >
                       <label for="enddate">End Date</label>
                       <span class="md-error" v-if="!$v.form.enddate.required">This field is required</span>
                    </md-datepicker>
                  </div>
               </div>
               <div class="right">
                  <md-datepicker :class="getValidationClass('startdate')"
                    type= "String" id="startdate" v-model="form.startdate"   :disabled="sending" >
                    <label for="startdate">Start Date</label>
                    <span class="md-error" v-if="!$v.form.startdate.required">This field is required</span>
                 </md-datepicker>
                 </div>
              <button class="button">Update Campaigners</button>
              </div>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
  </form>
</template>
<script>
import axios from 'axios';
  import { validationMixin } from 'vuelidate'
  import {
    required,
    email,
    minLength,
    maxLength,
   } from 'vuelidate/lib/validators'
export default {
    name: 'FormValidation',
    mixins: [validationMixin],
    data: () => ({
      form:{
        title: '',
        description: '',
        category: null,
        value: null,
        place: null,
        startdate: null,
        enddate: null,
        campaignImage: null,
      },
      userSaved: false,
      sending: false,
      lastUser: null,
      fname:null,
    }),
    validations: {
      form: {
        title: {
          required
        },
        description: {
          required         
        },
        category: {
          required         
        },
        place: {
          required
        },       
        startdate: {
          required
        }, 
        enddate: {
          required
        },
        value: {
          required
        },
        campaignImage:{
          required
        }
      }
    },
    methods: {
       getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]
        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      onSelected() {
       this. fname = event.target.files[0]
       console.log(this.fname)
       this.form.campaignImage=this.fname.name
       console.log(this.form.campaignImage)
       },
      clearForm () {
        this.$v.$reset()
        this.form.amount = null
        this.form.campaignImage = null
        this.form.value = null
        this.form.enddate = null
        this.form. startdate = null
        this.form.place = null
      },
      validateUser () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.saveUser(this.form)
        }
      },
    saveUser(value) {
        let id=this.$route.params.id
        const status = JSON.parse(window.localStorage.getItem('User'));
        var token=status.token
        var app= this
        var formData = new FormData();
        formData.append('title',value.title)
        formData.append('description',value.description)
        formData.append('category',value.category)
        formData.append('startdate',value.startdate)
        formData.append('enddate',value.enddate)
        formData.append('value',value.value)
        formData.append('place',value.place)
        formData.append('camimg',this.fname)
        console.log(formData)
        const urll="http://localhost:3200/api/updateCampaign/"+id
        axios.post(urll,formData,{headers:{'x-access-token':token,'Content-Type' : 'multipart/form-data'}})
        .then(res=> {
            console.log(res)
              app.$router.push('/campaigners');
              console.log('saving...')
        }).catch (function(e){
          console.log('error when uploading')
        })
       }
     },
      created(){
         let id=this.$route.params.id
         const status = JSON.parse(window.localStorage.getItem('User'));
         var token=status.token
         const url="http://localhost:3200/api/campaign/"+id
         axios.get(url,{headers:{'x-access-token': token}})
         .then (res =>{
              this.campaign=res.data.data;
              this.form.title = res.data.data.title
              this.form.category = res.data.data.category
              this.form.startdate = res.data.data.startdate
              this.form.enddate = res.data.data.enddate
              this.form.value = res.data.data.value
              this.form.description = res.data.data.description
              this.form.campaignImage = res.data.data.campaignImage
              this.form.place = res.data.data.place
              console.log('saving...')
         })
         },
         }
</script>
<style>
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
.picker{
  width:60%;
  float:right;
  padding-left:120px;
  padding-right:80px;
}
.space{
  padding-left:120px;
}
.hii{
  font-weight:600px;
  color: red;
  padding: 219px;
  }
.left {
  width: 50%;
  float: left;
}
.right {
      float:right;
      width:45%;
}
</style>
