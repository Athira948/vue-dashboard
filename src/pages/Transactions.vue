<template>
    <div>
    
    
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
            <stats-card data-background-color="orange">
                <template slot="header">
                            <md-icon >content_copy</md-icon>
</template>

<template slot="content">
    <p class="poison">
        0x05965afbd303de82c7fdd578449ff305bcbe739fb9e97f99023b9b220e4a93a8</p>
    <strong>   <h3 class="title">34,565
                               
                            </h3>
                            </strong>
</template>

        </stats-card>
      </div>



   <md-card>
<md-card-header data-background-color="orange">
<h4 class="title">Transactions</h4>
<p class="category"></p>
</md-card-header>
 <div>
    <vue-good-table
      :columns="columns"
      :rows="rows"
       :search-options="{
    enabled: true
  }"
  :pagination-options="{
    enabled: true
  }"/>
  </div>


</md-card>

  </div>
</template>

<script>
    import {
        StatsCard
    } from '@/components'
    
    const toLower = text => {
        return text.toString().toLowerCase()
    }
    
    const searchByTO = (items, term) => {
        if (term) {
            return items.filter(item => toLower(item.to).includes(toLower(term)))
        }
    
        return items
    }
    
    
    
    
    export default {
    
        name: 'TableSearch',
        data: () => ({
            search: null,
            searched: [],
            pageSize: 3,
            perPage: 3,

            currentPage: 1,
            columns: [
       
         {
          label: 'date',
          field: 'date',
          type: 'date',
          dateInputFormat: 'YYYY-MM-DD',
          dateOutputFormat: 'MMM Do YY',
        },
        {
          label: 'address',
          field: 'address',
          type: 'string',
        },
        {
          label: 'to',
          field: 'to',
          type: 'name',
         
        },
        {
          label: 'transfer',
          field: 'transfer',
          type: 'number',
        },
      ],
      rows: [
        { id:1, date:"08-09-2012", address: '0x05965afbd303de82c7fdd578449ff305bcbe739fb9e97f99023b9b220e4a93a8', to: 'ulric',transfer:1200 },
        { id:2, date:"08-09-2012", address: '0x05965afbd303de82c7fdd578449ff305bcbe739fb9e97f99023b9b220e4a93a8', to: 'saravana', transfer: 0.03343 },
        { id:3, date:"08-09-2012", address:'0x05965afbd303de82c7fdd578449ff305bcbe739fb9e97f99023b9b220e4a93a8', to: 'saravana', transfer: 0.03343 },
        { id:4, date:"08-09-2012", address: '0x5e0077da189486d62d9ffc87014fd8c67c94da0f023dff35fcc9008b6d782e82', to: 'saravana', transfer: 0.03343 },
        { id:5, date:"08-09-2012", address: '0x77b614c6b8f23d5f934712de831f327dd02e66a05ed47d9300dbe0dcc395e8ae', to: 'saravana', transfer: 0.03343 },
        { id:6, date:"08-09-2012", address:'0x77b614c6b8f23d5f934712de831f327dd02e66a05ed47d9300dbe0dcc395e8ae',to: 'saravana', transfer: 0.03343 },
       
      ],
           
        }),
        components: {
            StatsCard,
    
        },
        mounted() {
            setTimeout(() => {
                this.total = 21; // this should affect <next page> enabled.
            }, 700);
        },
    
        methods: {
            newUser() {
                window.alert('Noop')
            },
            searchOnTable() {
              
                this.searched = searchByTO(this.users, this.search)
            },
            onPagination() {
    let numberOfPages = Math.ceil(this.users.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
            }
        }
        },
    
        created() {
            this.searched = this.users
        }
    }
</script>

<style lang="scss" scoped>
    .md-field {
        max-width: 300px;
    }
    
    .transtable-tag {
        width: 200px;
        display: inline-block;
        vertical-align: bottom;
        text-overflow: ellipsis;
        overflow: hidden;
        word-wrap: normal;
    }
    
    .poison {
        text-overflow: ellipsis;
        overflow: hidden;
    }
</style>