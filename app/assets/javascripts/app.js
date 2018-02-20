/* global Vue */
document.addEventListener("DOMContentLoaded", function(event) { 
  Vue.component('line-chart', {
    extends: VueChartJs.Line,
    mixins: [VueChartJs.mixins.reactiveProp],
    props: ['chartData', 'options'],
    mounted () {
      this.renderChart(this.chartData, this.options)
    }
    
  })

  var app = new Vue({
    el: '#app',
    data: {
      options: {responsive: true, maintainAspectRatio: false},
      message: 'Submit Ruby Code Below',
      code: '',
      code2: '',
      results: [],
      chartData: {
        
      },
      isActive: false,
    },
    mounted: function() {

    },
    methods: {
      analyzeCode: function() {
        Rails.ajax({
          url: "/api/v1/code",
          type: "POST",
          data: `code=${this.code}&code2=${this.code2}`,
          success: function(data) {
            console.log(data);
             this.chartData = {
              labels: data.results.map(point => point.x),
              datasets: [
                {
                  label: 'Number of steps',
                  borderColor: '#f87979',
                  backgroundColor: '#f87979',
                  data: data.results,
                  fill: false,
                  lineTension: 1,
                  cubicInterpolationMode: 'monotone'
                },
                {
                  label: 'Number of steps 2',
                  borderColor: '#800080',
                  backgroundColor: '#800080',
                  data: data.results2,
                  fill: false,
                  lineTension: 1,
                  cubicInterpolationMode: 'monotone'
                }
              ]
            };
          }.bind(this)
        });
      },


      toggleTextbox: function() {
        this.isActive = !this.isActive;
      }

    },
    computed: {

    }
  });
});
