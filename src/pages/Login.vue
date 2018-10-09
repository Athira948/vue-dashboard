<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="top">
        <div class="md-layout">
          <div class="layout md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto">
            <form header-color="green" @submit.prevent="onSubmit()">
              <h4 slot="title" class="card-title"></h4>
              <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-49">
                <md-card>
                  <md-card-header data-background-color="green">
                    <h4 class="title">Login</h4>
                    <p class="category"></p>
                  </md-card-header>
                  <md-card-content>
                    <!-- <ordered-table table-header-color="orange"></ordered-table> -->
                  </md-card-content>
                </md-card>
              </div>
              <!-- <md-field class="md-form-group" slot="inputs">
                              <md-icon>face</md-icon>
                              <label>First Name...</label>
                              <md-input v-model="firstname" class="input"></md-input>
                            </md-field> -->
              <md-field class="md-form-group" slot="inputs" :class="{error: errors.has('email')}">
                <md-icon>email</md-icon>
                <label>Email...</label>
                <md-input autocomplete="email" type="email" name="email" class="input" v-validate="'required|email'" v-model="user.email"></md-input>
              </md-field>
              <div class="error" v-if="errors.has('email')">&emsp; {{errors.first('email')}}</div>
              <md-field class="md-form-group" slot="inputs" :class="{error: errors.has('password')}">
                <md-icon>lock_outline</md-icon>
                <label>Password...</label>
                <md-input autocomplete="email" v-validate="'required'" name="password" v-model="user.password" type="password" class="input"></md-input>
              </md-field>
              <div class="error" v-if="errors.has('password')">{{errors.first('password')}}</div>
              <md-button class=" forgot md-simple md-success ">
                Forgot password?
              </md-button>
              <md-button class=" pos1 md-simple md-success md-lg" @click="signup">
                create new account?
              </md-button>
              <br>
              <br>
  
              <md-button type="submit" class=" pos2 ">
                <strong>LOGIN</strong>
              </md-button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import loginService from './loginService.js';
  export default {
    bodyClass: 'login-page',
    data() {
      return {
        user: {
          email: '',
          password: '',
          submitted: false,
          msg: 'fdr'
        }
      }
    },
    methods: {
      signup () {var app = this;
        app.$router.push('/signup');
      },
      onSubmit() {
        console.log("here")
        this.$validator.validateAll()
          .then(res => {
              console.log("res", res, this.errors)
              if (res) {
                console.log('true res')
  
                const authUser = {}
                var app = this;
  
                loginService.login(this.user)
                  .then(res => {
                    if (res.data === 200) {
                      console.log('dashboard')
                      authUser.data = res.data;
                      authUser.token = res.token;
                      app.$store.state.isLoggedIn = true
                      window.localStorage.setItem('User', JSON.stringify(authUser));
  
                      if (authUser.data.accountType === 'sponser') {
                        app.$router.push('/dashboard');
                      } else {
                        app.$router.push('/signUp');
                      }
                    } else {
                      app.$store.state.isLoggedIn = false;
                      console.log('hello')
                    }
                  })
                  .catch(function(err) {
                    console.log(err.data)
                  })
  
              } else {
                console.log('false res')
              }
            },
            err => {
              console.log("err", err)
            })
       
      },
  
  
  
      loginAuth: function() {
        var app = this;
        const status = JSON.parse(window.localStorage.getItem('User'));
        if (status === null || status === undefined) {
          app.$router.push('/login');
        } else if (status.data.accountType === 'sponser') {
          app.$router.push('/dashboard');
        } else {
          app.$router.push('/signUp');
        }
      },
  
      // signup: function() {
      //   window.location.href = 'http://localhost:8080/#/signup'
      // },
      submitForm() {
        this.submitted = true
      }
  
    },
    props: {
      header: {
        type: String,
        default: require('@/assets/img/profile_city.jpg')
      }
    },
    created: function() {
      this.loginAuth();
    },
    computed: {
      headerStyle() {
        return {
          backgroundImage: `url(${this.header})`
        }
      }
    }
  }
</script>

<style scoped>
  .top {
    padding-left: 25%;
    display: -ms-flexbox;
    -ms-flex-pack: justify;
    padding-top: 100px;
    padding-bottom: 150px;
  }
  
  .align {
    display: flex;
    flex-wrap: wrap;
  }
  
  .layout {
    min-width: 65.3333%;
    max-width: 66.3333%;
    flex: 0 1 33.3333%;
    background: white;
    border-radius: 2%;
  }
  
  .description {
    padding-left: 33%;
    color: #999999;
  }
  
  .md-button.md-fab,
  .md-button.md-just-icon {
    font-size: 24px;
    height: 41px;
    width: 41px;
    padding: 0;
    overflow: hidden;
    position: relative;
    line-height: 41px;
    border-radius: 50%;
  }
  
  .md-icon {
    padding-left: 2%;
  }
  
  .md-field>.md-icon~label {
    left: 79px;
  }
  
  .pos {
    padding-left: 41%;
  }
  
  .section {
    height: auto;
  }
  
  .input {
    padding-left: 2% !important;
  }
  
  .pos2 {
    margin-left: 14%;
    background: linear-gradient(60deg, #66bb6a, #43a047) !important;
  }
  
  .pos1 {
    float: left;
    line-height: 1;
    text-transform: capitalize;
  }
  
  .forgot {
    float: right;
    text-transform: capitalize;
    font-size: inherit;
  }
  
  .error {
    color: red;
    padding-left: 5%;
  }
</style>
