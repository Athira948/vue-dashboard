<template class="wrapper">
  <div>
    <div class="section page-header header-filter" :style="headerStyle">
      <div>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
        <form-wizard class="wizard" title="Signup" subtitle="" color="#616161" @on-complete="onComplete">
          <tab-content title="Basic Details" :before-change="beforeTabSwitch">
            <div class="input" :class="{error: errors.has('email')}"><input class="al" v-validate="'required|email'" v-model="user.email" type="email" name="email" placeholder="Email" required></div>
             <span class="error" v-if="errors.has('email')">
              {{msg}}
              &emsp; &emsp;&emsp;
              {{errors.first('email')}} </span>
            <br> {{user.msg}}
            <div class="input" :class="{error: errors.has('accountType')}">
              <select aria-placeholder="Account Type" v-model="user.accountType" class="al" v-validate="'required'" name="accountType">
                <option value="center" disabled selected>Account Type</option>
                <option value="sponsers">Sponsers</option>
                <option value="campaigners">Campaigners</option>
              </select>
            </div>
             <span class="error" v-if="errors.has('accountType')">
               &emsp; &emsp; &emsp;
              {{errors.first('accountType')}}</span>
            <div class="input" autocomplete="off"> <br> <input v-validate="'required|min:6|max:35|confirmed:confirm_password'" class="al" type="password" v-model="user.password" name="password" placeholder="Password"></div>
            <span class="error" v-if="errors.has('password')">
              &emsp; &emsp;&emsp;
              {{errors.first('password')}}</span>
            <div class="input" autocomplete="off"> <br>
              <input class="al" ref="confirm_password" v-validate="'required'" type="password" v-model="user.confirmPassword" name="confirm_password" placeholder="Re enter password"></div>
            <span class="error" v-if="errors.has('confirm_password')">
              &emsp; &emsp;&emsp;
              {{errors.first('confirm_pasedsword')}}</span>
          </tab-content>
          <tab-content style=" padding: 2% 1% 1%;" title="Copy the string" class="pos">
            <textarea class="textcls " name="key" id="key" v-model="random"></textarea>
            <input class="save" type="submit" value="Save">
          </tab-content>
          <template slot="footer" scope="props">
            <div class=wizard-footer-left>
              <wizard-button  v-if="props.activeTabIndex > 0 && !props.isLastStep" :style="props.fillButtonStyle">Previous</wizard-button>
            </div>
                    <div class="wizard-footer-right">
                      <wizard-button v-if="!props.isLastStep" @click.native="props.nextTab()" class="wizard-footer-right" :style="props.fillButtonStyle">Next</wizard-button>

                      <wizard-button v-else @click.native="onComplete" class="wizard-footer-right finish-button" :style="props.fillButtonStyle">{{props.isLastStep ? 'Done' : 'Next'}}</wizard-button>
                    </div>
</template>
        </form-wizard>
    </div>
    </div>
</div>
</template>
<script>
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import signupService from './signupService.js'
export default {
  bodyClass: 'signup-page',
  data () {
    return {
      count: 0,
      status: false,
      random: 'Copy and save the seed',
      msg: '',
      user: {
        email: '',
        accountType: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  props: {
    header: {
      type: String,
      default: require('@/assets/img/profile_city.jpg')
    }
  },
  methods: {
    onComplete: function () {
      var app = this
      const status = JSON.parse(window.localStorage.getItem('User'))
      if (status) {
        if (this.user.accountType === 'sponsers') {
          app.$router.push('/dashboard')
        } else if (this.user.accountType === 'campaigners') {
          app.$router.push('/transactions')
        }
      } else {
        this.random = 'User already exists with this email id.Select another one'
      }
    },
    beforeTabSwitch: function () {
      let self = this
      return new Promise((resolve, reject) => {
        if (self.count < 1) {
          self.$validator.validateAll()
            .then(res => {
              console.log('res', res, self.errors)
              if (res) {
                resolve(true)
                const authUser = {}
                signupService.signup(self.user)
                  .then(function (res) {
                    if (res.status === 200) {
                      console.log(' logged in')
                      authUser.data = res.data
                      authUser.seed = res.seed
                      authUser.token = res.token
                      self.random = authUser.seed
                      window.localStorage.setItem('User', JSON.stringify(authUser))
                    } else {
                      console.log('not logged in')
                      self.msg = 'User already exists with the same email'
                      alert('user exists already with the same email.')
                      self.$refs.wizard.changeTab(0)
                    }
                  })
                  .catch(function (err) {
                    console.log(err.data)
                    reject('')
                  })
                this.count++
              } else {
                reject('')
              }
            })
        } else {
          self.count = 0
        }
      })
    },
    isLastStep () {
      if (this.$refs.wizard) {
        return this.$refs.wizard.isLastStep
      }
      return false
    },
    signupAuth: function () {
      var app = this
      const status = JSON.parse(window.localStorage.getItem('aUser'))
      if (status === null || status === undefined) {
        app.$router.push('/signup')
      } else if (status.data.accountType === 'sponsers') {
        app.$router.push('/table')
      } else {
        app.$router.push('/transactions')
      }
    }
  },
  created: function () {
    this.signupAuth()
  },
  computed: {
    headerStyle () {
      return {
        backgroundImage: `url(${this.header})`
      }
    }
  }
}
</script>
<style scoped>
  .wizard {
    padding-left: 5%;
    padding-top: 2%;
    padding-right: 2%;
    background-color: white;
    margin-left: 15%;
    margin-right: 15%;
    margin-top: 2%;
    border-radius: 2%;
  }
  .al {
    width: 73%;
    text-align-last: left;
    border-top-style: hidden;
    border-left-style: hidden;
    border-right-style: hidden;
    padding-top: 25px;
    border-bottom-color: #4CAF50!important;
    border-bottom: 2px solid #4CAF50!important;
  }
  .input {
    padding-left: 6%;
  }
  select {
    text-align-last: center;
    color: gray;
  }
  .textcls {
    border: #4CAF50!important;
    border: 2px solid #4CAF50!important;
    margin: 0px;
    width: 100%;
    height: 91px;
  }
  .save {
    background: #4CAF50;
    width: 20%;
    color: white;
    border: none;
    cursor: pointer;
  }
  .section {
    height: 100vh !important;
    padding-top: 3%;
  }
  .wrapper {
    margin: 0 !important;
  }
  .error {
    color: red;
  }
  .select {
    text-align: left;
    color: gray;
  }
</style>
