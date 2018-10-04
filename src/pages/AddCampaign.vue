<template>
<form novalidate  @submit.prevent="validateUser">
    <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title"> Addcompaigner</h4>
 <!--           <p class="category">Created using Roboto Font Family</p>    -->
          </md-card-header>
         <md-card-content>
            <div id="typography">
               <div class="title">

               
              
                              
                
                 
                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <div class="picker">
                  <md-field :class="getValidationClass('description')">
                    <label for="description">Description</label>
                    <md-input name="description" id="description"   :disabled="sending" />
                    <span class="md-error" v-if="!$v.form.description.required">This field is required</span>
                  </md-field>
                    </div>
                </div>
                 <div class="md-layout-item md-small-size-100 md-size-100">
                 <div class="picker">  
               <md-field :class="getValidationClass('uploadimage')">
             
              <label for="uploadimage">uploadimage</label>
                    <md-file name="uploadimage" type= "string" id="uploadimage"  v-model="form.uploadimage" :disabled="sending" />
                    <span class="md-error" v-if="!$v.form.uploadimage.required">This field is required</span>
            </md-field>
          </div>
            </div>

            <div class="md-layout-item md-small-size-100 md-size-40">
                  <md-field :class="getValidationClass('title')">
                    <label for="title">Title</label>
                    <md-input name="title" id="title"  :disabled="sending" />
                    <span class="md-error" v-if="!$v.form.title.required">This field is required</span>
                  </md-field>
                </div>
                 <div class="md-layout-item md-small-size-100 md-size-40">
                  <md-field :class="getValidationClass('Category')">
                    <label for="Category">Category</label>
                    
                    <md-input name="Category" id="Category"   :disabled="sending" />
                    <span class="md-error" v-if="!$v.form.Category.required">This field is required</span>
                  </md-field>
                </div>

      

      

                <div class="md-layout-item md-small-size-100 md-size-100">   
   <div class="picker"> 
                  <md-field :class="getValidationClass('sponseramount')">
                    <label for="sponseramount">sponseramount</label>
                    <md-input name="sponseramount" type= "number" id="to"  v-model="form.sponseramount" :disabled="sending" />
                    <span class="md-error" v-if="!$v.form.sponseramount.required">This field is required</span>
                  </md-field>
                 </div>
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <div class="picker">
                   <md-datepicker :class="getValidationClass('enddate')">
                   

                   <label for="enddate">end date</label>
                    <span class="md-error" v-if="!$v.form.enddate.required">This field is required</span>
                 </md-datepicker>
                 </div>
               </div>
                
              
             <div class="md-layout-item md-small-size-100 md-size-40">
                  <md-field :class="getValidationClass('city')">
                    <label for="city">City</label>
                    <md-input name="city" id="city"   :disabled="sending" />
                    <span class="md-error" v-if="!$v.form.city.required">This field is required</span>
                  </md-field>
                </div>

<div class="md-layout-item md-small-size-100 md-size-40">
                   <md-datepicker :class="getValidationClass('startdate')">
                   

                   <label for="startdate">start date</label>
                    <span class="md-error" v-if="!$v.form.startdate.required">This field is required</span>
                 </md-datepicker>
               </div>
                  
            


                
          

               
                <button class="button">Addcompaingers</button>
                
                

                




                

                   
              
               
               
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
  import { validationMixin } from 'vuelidate'
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
      form: {
        title: null,
        description: null,
        Category: null,
        sponseramount: null,
        city: null,
        startdate: null,
          enddate: null,
          uploadimage: null
      },
      userSaved: false,
      sending: false,
      lastUser: null
    }),
    validations: {
      form: {
        title: {
          required
        },
        description: {
          required
         
        },
        Category: {
          required
         
        },
        city: {
          required
        },
       
        startdate: {
          required
        }, 
        enddate: {
          required
        },
        sponseramount: {
          required
        },
        uploadimage:{
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
      clearForm () {
        this.$v.$reset()
        this.form.title= null
        this.form.description = null
        this.form.amount = null
        this.uploadimage = null
      },
      
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveUser()
        }
      }
    }
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

</style>
