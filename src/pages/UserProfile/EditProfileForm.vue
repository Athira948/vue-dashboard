<template>
  <form novalidate @submit.prevent="validateUser">
    <div class="content">
      <div class="md-layout">
        <div class="md-layout-item">
          <md-card>
            <md-card-header data-background-color="green">
              <h4 class="title"> Update Profile</h4>
              <!--           <p class="category">Created using Roboto Font Family</p>    -->
            </md-card-header>
            <md-card-content>
              <div id="typography">
                <div class="title">
                  <div class="left">
                    <md-field>
                      <label>Email</label>
                      <md-input v-model="form.email" type="email" disabled></md-input>
                    </md-field>
                  </div>
                  <div class="">
                    <div class="right">
                      <md-field>
                        <label>Account Type</label>
                        <md-input v-model="form.accountType" type="text" disabled></md-input>
                      </md-field>
                    </div>
                  </div>
                  <div class="">
                    <div class="left">
                       <md-field :class="getValidationClass('firstName')">
                      <label for="firstname">Firstname</label>
                      <md-input name="firstname" id="firstname" v-model="form.firstName" :disabled="sending" />
                      <span class="md-error" v-if="!$v.form.firstName.required">This field is required</span>
                    </md-field>
                    </div>
                  </div>
                  <div class="right">
                     <md-field :class="getValidationClass('lastName')">
                        <label for="lastname">Lastname</label>
                        <md-input name="lastname" id="lastname" v-model="form.lastName" :disabled="sending" />
                        <span class="md-error" v-if="!$v.form.lastName.required">This field is required</span>
                      </md-field>
                  </div>
                  <div class="">
                    <div class="">
                      <md-field :class="getValidationClass('address')">
                        <label for="address">Address</label>
                        <md-input name="address" id="address" v-model="form.address" :disabled="sending" />
                        <span class="md-error" v-if="!$v.form.address.required">This field is required</span>
                      </md-field>
                    </div>
                  </div>
                  <div class="left">
                    <md-field :class="getValidationClass('city')">
                      <label for="city">City</label>
                      <md-input name="city" id="city" v-model="form.city" :disabled="sending" />
                      <span class="md-error" v-if="!$v.form.city.required">This field is required</span>
                    </md-field>
                  </div>
                  <div class="">
                    <div class="right">
                      <md-field :class="getValidationClass('pincode')">
                        <label for="postalcode">Postal Code</label>
                        <md-input name="pincode" type="number" id="to" v-model="form.pincode" :disabled="sending" />
                        <span class="md-error" v-if="!$v.form.pincode.required">This field is required</span>
                      </md-field>
                    </div>
                  </div>
                  <div class="left">
                    <md-field :class="getValidationClass('country')">
                      <label for="country">Country</label>
                      <md-input name="country" id="country" v-model="form.country" :disabled="sending" />
                      <span class="md-error" v-if="!$v.form.country.required">This field is required</span>
                    </md-field>
                  </div>
                  <div class="right">
                    <md-field :class="getValidationClass('phoneNumber')">
                      <label for="phonenumber">Phone Number</label>
                      <md-input name="phonenumber" type="number" id="to" v-model="form.phoneNumber" :disabled="sending" />
                      <span class="md-error" v-if="!$v.form.phoneNumber.required">This field is required</span>
                    </md-field>
                  </div>
                    <div class="left">
                     <md-field :class="getValidationClass('filename1')">
                     <label for="filename1">Upload File 1</label>
                     <md-file name="filename1" type= "String" id="filename1" @change="onFileSelected" v-model="form.filename1" :disabled="sending" />
                     <span class="md-error" v-if="!$v.form.filename1.required">This field is required</span>
                    </md-field>
                    </div>
                    <div class="right"> 
                        <md-field :class="getValidationClass('filename2')">
                     <label for="filename2">Upload File 2</label>
                     <md-file name="filename2" type= "String" id="filename2" @change="onFileSelecteds" v-model="form.filename2" :disabled="sending" />
                     <span class="md-error" v-if="!$v.form.filename2.required">This field is required</span>
                    </md-field>
                  </div>
                 <div class="md-layout-item md-size-100 text-right">
                    <button class="button">Submit</button>
                  </div>
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
import axios from 'axios'
  import {
    validationMixin
  } from 'vuelidate'
  import {
    required,
    email,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'
  export default {
    name: 'FormValidation',
    mixins: [validationMixin],
    data: () => ({
      info: '',
       file: [],
      form: {
        firstName: null,
        lastName: null,
        phoneNumber: null,
        pincode: null,
        address: null,
        city: null,
        country: null,
        email:'',
        accountType: '',
        filename1: '',
        filename2: '',
       
       
      },
      userSaved: false,
      sending: false,
      lastUser: null
  }),
    validations: {
      form: {
        firstName: {
          required
        },
        lastName: {
          required
        },
        phoneNumber: {
          required
        },
        address: {
          required
        },
        pincode: {
          required
        },
        city: {
          required
        },
        country: {
          required
        },
        filename1: {
          required
        },
        filename2: {
          required
        }
      }
    },
     created: function () {
       const status = JSON.parse(window.localStorage.getItem('User'));
       var token=status.token
      // console.log(status.data)
       axios.get('http://localhost:3200/api/user',{ headers: { 'x-access-token': token } } )
        .then(response => {
           console.log(response.data)
          this.form.accountType = response.data.data.accountType,
          this.form.email=response.data.data.email
        })
      },
    methods: {
     getValidationClass(fieldName) {
        const field = this.$v.form[fieldName]
        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      onFileSelected (event) {
      this.file[0]=event.target.files[0]
      console.log(event)
      this.form.filename1=this.file[0].name
      console.log(this.form.filename1)
      },
      onFileSelecteds (event) {
        console.log(event)
        this.file[0]=event.target.files[0]
        this.form.filename2=this.file[0].name
       console.log(this.form.filename2)
        
      },
      clearForm() {
        this.$v.$reset()
        this.form.firstName = null
        this.form.lastName = null
        this.form.phoneNumber = null
        this.form.pincode = null
        this.form.city = null
        this.form.address = null
        this.form.country = null
        this.form.filename1 = null
        this.form.filename2 = null
      },
       validateUser() {
        this.$v.$touch()
  
        if (!this.$v.$invalid) {
          this.saveUser(this.form)
        }
      },
      saveUser( value) {
         const status = JSON.parse(window.localStorage.getItem('User'));
         var token=status.token
      // var details=this.form
        var data = new FormData(value);
        //  var data = new FormData();
        //  data.append('file',value)
         axios.post('http://localhost:3200/api/edituser',value,{headers:{'x-access-token':token}})
        .then(res=> {
               console.log('saving...')
               
               this.$toasted.show('User Details saved',{ 
                 icon : 'check',
                 fullWidth:false,
	             theme: "bubble", 
	             position: "bottom-right", 
	             duration : 5000})
               console.log(res)
        }).catch (function(e){
          console.log('error when uploading')
          this.$toasted.show('Error')
        })
     }
    },
  }
</script>
<style scoped>
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
  .piker {
    width: 60%;
    float: right;
    padding-left: 120px;
  }
  .spce {
    float: left;
    width: 40%;
  }
  .left {
    float: left;
    width: 50%
  }
  .right {
    float: right;
    width: 50%;
    padding-left: 5%;
  }
  </style>