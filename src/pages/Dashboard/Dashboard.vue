<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
      <b-breadcrumb-item active>
        Dashboard
      </b-breadcrumb-item>
    </b-breadcrumb>
    <h1 class="page-title">
      Dashboard
    </h1>
    <div>
      <b-row>
        <b-col
          lg="4"
          sm="6"
          xs="12"
          class="widgets"
        >
          <div class="pb-xlg h-100">
            <Widget
              class="h-100 mb-0 text-center p-4"
              title="Happy"
            >
              <img
                src="../../assets/img/happy.png"
                width="120px"
                alt="netural-face"
              >
              <h3><strong>30%</strong></h3>
            </Widget>
          </div>
        </b-col>

        <b-col
          lg="4"
          sm="6"
          xs="12"
          class="widgets"
        >
          <div class="pb-xlg h-100">
            <Widget
              class="h-100 mb-0 text-center p-4"
              title="Netural"
            >
              <img
                src="../../assets/img/netural.png"
                width="120px"
                alt="netural-face"
              >
              <h3><strong>23%</strong></h3>
            </Widget>
          </div>
        </b-col>

        <b-col
          lg="4"
          sm="6"
          xs="12"
          class="widgets"
        >
          <div class="pb-xlg h-100">
            <Widget
              class="h-100 mb-0 text-center p-4"
              title="Sad"
            >
              <img
                src="../../assets/img/sad.png"
                width="120px"
                alt="sad-face"
              >
              <h3><strong>47%</strong></h3>
            </Widget>
          </div>
        </b-col>
      </b-row>
    </div>
    <!-- <Widget
      body-class="widget-form-overflow"
      custom-header
    >
      <b-row>
        <b-col
          lg="4"
          xs="12"
          class="p-4"
        >
          <h3 class="text-center py-4">
            <strong>User Data</strong>
          </h3>
          <b-row class="">
            <b-col
              class="my-2"
              sm="3"
            >
              <label> FirstName: </label>
            </b-col>
            <b-col
              class="my-2"
              sm="9"
            >
              <b-form-input type="text" />
            </b-col>
            <b-col
              class="my-2"
              sm="3"
            >
              <label> LastName: </label>
            </b-col>
            <b-col
              class="my-2"
              sm="9"
            >
              <b-form-input type="text" />
            </b-col>
            <b-col
              class="my-2"
              sm="3"
            >
              <label> Email: </label>
            </b-col>
            <b-col
              class="my-2"
              sm="9"
            >
              <b-form-input type="email" />
            </b-col>
            <b-col
              class="my-2"
              sm="3"
            >
              <label> Password: </label>
            </b-col>
            <b-col
              class="my-2"
              sm="9"
            >
              <b-form-input type="password" />
            </b-col>
            <b-col
              class="my-2"
              sm="3"
            >
              <label> Date of Birth: </label>
            </b-col>
            <b-col
              class="my-2"
              sm="9"
            >
              <b-form-input type="date" />
            </b-col>
          </b-row>
        </b-col>
        <b-col
          lg="4"
          xs="12"
        >
          <h3 class="text-center py-5">
            <strong>Upload Image</strong>
          </h3>
          <UploadImage />
        </b-col>
        <b-col
          lg="4"
          xs="12"
        >
          <h3 class="text-center py-5">
            <strong>Facial Discriptor</strong>
          </h3>
          <FacialDiscriptorExtractor />
        </b-col>
      </b-row>
    </Widget> -->
    <Widget>
      <b-row>
        <b-col>
          <Horizontal />
        </b-col>
      </b-row>
    </Widget>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
// import UploadImage from '@/components/UploadImage';
// import FacialDiscriptorExtractor from '@/components/FacialDiscriptorExtractor';
import Horizontal from '../../components/HorizontalStepper/HorizontalStepper';
// import { Chart } from 'highcharts-vue';

export default {
  name: 'Dashboard',
  components: {
    // UploadImage,
    Widget,
    // FacialDiscriptorExtractor,
    Horizontal
    // highcharts: Chart
  },
  data() {
    return {
      table: [{
        id: 0,
        name: 'Mark Otto',
        email: 'ottoto@wxample.com',
        product: 'ON the Road',
        price: '$25 224.2',
        date: '11 May 2017',
        city: 'Otsego',
        status: 'Sent',
      },
      {
        id: 1,
        name: 'Jacob Thornton',
        email: 'thornton@wxample.com',
        product: 'HP Core i7',
        price: '$1 254.2',
        date: '4 Jun 2017',
        city: 'Fivepointville',
        status: 'Sent',
      },
      {
        id: 2,
        name: 'Larry the Bird',
        email: 'bird@wxample.com',
        product: 'Air Pro',
        price: '$1 570.0',
        date: '27 Aug 2017',
        city: 'Leadville North',
        status: 'Pending',
      },
      {
        id: 3,
        name: 'Joseph May',
        email: 'josephmay@wxample.com',
        product: 'Version Control',
        price: '$5 224.5',
        date: '19 Feb 2018',
        city: 'Seaforth',
        status: 'Declined',
      },
      {
        id: 4,
        name: 'Peter Horadnia',
        email: 'horadnia@wxample.com',
        product: 'Let\'s Dance',
        price: '$43 594.7',
        date: '1 Mar 2018',
        city: 'Hanoverton',
        status: 'Sent',
      }],
    };
  },
  methods: {
    getRandomData() {
      const arr = [];

      for (let i = 0; i < 25; i += 1) {
        arr.push(Math.random().toFixed(1) * 10);
      }

      return arr;
    },
    getRevenueData() {
      const data = [];
      const seriesCount = 3;
      const accessories = ['SMX', 'Direct', 'Networks'];

      for (let i = 0; i < seriesCount; i += 1) {
        data.push({
          label: accessories[i],
          data: Math.floor(Math.random() * 100) + 1,
        });
      }

      return data;
    }
  },
  computed: {
    donut() {
      let revenueData = this.getRevenueData();
      let series = [
        {
          name: 'Revenue',
          data: revenueData.map(s => {
            return {
              name: s.label,
              y: s.data
            }
          })
        }
      ];
      return {
        chart: {
          type: 'pie',
          height: 120
        },
        credits: {
          enabled: false
        },
        title: false,
        plotOptions: {
          pie: {
            dataLabels: {
              enabled: false
            },
            showInLegend: true,
            innerSize: 80,
            size: 100,
            states: {
              hover: {
                halo: {
                  size: 1
                }
              }
            }
          }
        },
        colors: ['#ffc247', '#f55d5d', '#9964e3'],
        legend: {
          align: 'right',
          verticalAlign: 'middle',
          layout: 'vertical',
          itemStyle: {
            color: '#495057',
            fontWeight: 100,
            fontFamily: 'Montserrat'
          },
          itemMarginBottom: 5,
          symbolRadius: 0
        },
        exporting: {
          enabled: false
        },
        series
      };
    }
  }
};
</script>

<style src="./Dashboard.scss" lang="scss" scoped />
