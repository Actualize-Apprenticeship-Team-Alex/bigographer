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
      code: '',
      code2: '',
      results: [],
      options: {responsive: true, maintainAspectRatio: false},
      message: 'Submit Ruby Code Below',
      chartData: {
        
      },
      isActive: false,
    },
    mounted: function() {

    },
    methods: {
      analyzeCode: function() {
        const code_blocks = {
          1: this.code,
          2: this.code2,
        }
        Rails.ajax({
          url: "/api/v1/code",
          type: "POST",
          data: `1=${this.code}&2=${this.code2}`,
          success: function(response) {
             this.chartData = {
              labels: response[0].map(point => point.x),
              datasets: [
                {
                  label: 'Number of steps',
                  borderColor: '#f87979',
                  backgroundColor: '#f87979',
                  data: response[0],
                  fill: false,
                  lineTension: 1,
                  cubicInterpolationMode: 'monotone'
                },
                {
                  label: 'Number of steps 2',
                  borderColor: '#800080',
                  backgroundColor: '#800080',
                  data: response[1],
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
