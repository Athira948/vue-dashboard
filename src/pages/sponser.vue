<template>
<form>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Sponser</h4>
          </md-card-header>
         <md-card-content>
            <div id="typography">
               <div class="title">
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>From</label>
                    <md-input v-model="from" disabled type="text"></md-input>
                    <span class="md-helper-text">Eth address</span>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>To</label>
                    <md-input v-model="to" disabled type="text"></md-input>
                    <span class="md-helper-text">Eth address</span>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Amount</label>
                    <md-input v-model="amount" disabled type="number"></md-input>
                  </md-field>
                </div>
                <button class="button" @click="transfer">Sponsor</button>
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
export default{
      data: () => {
        return {
          from: null,
          to: null,
          amount: null
        }
      },
   created: function() {
    let id=this.$route.params.id
    const status = JSON.parse(window.localStorage.getItem('User'));
    var token=status.token
    const url='http://192.168.0.104:3200/api/sponsercampaign/'+id
    console.log(url)
    axios.post(url,{headers:{'x-access-token': token }})
      .then(res => {
           console.log(res)
      }).catch(function(err) {
           console.log('error in sponser page')
      })
   },
    methods:  {
     transfer: function (){
         window.location.href = "http://localhost:8080/#/transfer"
     }
 }
}
</script>
