<template>
  <div class="home">
    <div class="container">
    <button @click="logout">Logout</button>
    <GChart type="BarChart" :data="chartData"/>
    <line-chart :chart-data="rights"></line-chart>
    <button @click="fillData()">Mostrar</button>
    <br><br>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Answer</th>
            <th scope="col">T/F</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ans in answers" v-bind:key="ans['.key']">
            <td>{{ans.questionId}}</td>
            <td>{{ans.answer}}</td>
            <td>{{ans.right}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import firebase from 'firebase';
import config from '../components/config'
import LineChart from './LineChart.js'
//import {Line} from 'vue-chartjs'

let app = firebase.initializeApp(config);
let db = app.database();
let ansRefA = db.ref('answers');
let ansRef = db.ref('questions');

export default {
  //extends Line,
  firebase:{
    answers: ansRefA,
    questionsArray: ansRef
  },
  components:{
    LineChart
  },
  data () {
      return {
        rights: [],
        chartData: [
          ['Id', 'Errors', 'B'],
          [1,4,1],
          [2,4,1]
        ]    
      }
    },
    mounted(){
      this.fillData()
    /*this.renderChart({
      labels: this.rights.toString(),
      datasets:[{
        label: 'Respuestas', backgroundColor: '#dd4935', data: [1,20]
      }]
      },{responsive: true, maintainAspectRadio: true})
    }*/
    },
    /*computed: {
    questionsRights: function(){
      for (let item of this.questionsArray) {
        this.rights.push(item.rights);
      }
      alert('computed');
      return this.rights;
    }*/
    methods: {
      logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
      fillData () {
        this.rights = {
          labels: this.rights.toString(),
          datasets: [
            {
              label: 'Respuestas',
              backgroundColor: '#f87979',
              data: [1, 20]
            }
          ]
        }
      }
    }
}

</script>