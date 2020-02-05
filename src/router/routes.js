import Layout from '../components/Layout/Layout'
import Login from '@/pages/Login/Login';
import ErrorPage from '@/pages/Error/Error';
// Core
// import TypographyPage from '@/pages/Typography/Typography';

// Tables
import TablesBasicPage from '@/pages/Tables/Basic';

// Sec Charts
import WorldPopulation from '../pages/WorldPopulation.vue';

// Maps
// import GoogleMapPage from '@/pages/Maps/Google';

// Main
import AnalyticsPage from '@/pages/Dashboard/Dashboard';

// Charts
import ChartsPage from '@/pages/Charts/Charts';

// Ui
import IconsPage from '@/pages/Icons/Icons';
// import NotificationsPage from '@/pages/Notifications/Notifications';
import Webcam3 from '../components/webcam-3.vue'

import ResetPassword from '@/pages/ResetPassword'


const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/reset',
    name: 'ResetPassword',
    component: ResetPassword,
  },
  {
    path: '/error',
    name: 'Error',
    component: ErrorPage,
  },
  {
    path: '/app',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        name: 'AnalyticsPage',
        component: AnalyticsPage,
      },
      {
        path: 'charts',
        name: 'ChartsPage',
        component: ChartsPage,
      },
      // {
      //   path: 'typography',
      //   name: 'TypographyPage',
      //   component: TypographyPage,
      // },
      {
        path: 'components/icons',
        name: 'IconsPage',
        component: IconsPage,
      },
      {
        path: 'seccharts',
        name: 'WhidaCharts',
        component: WorldPopulation
      },
      {
        path: 'tables',
        name: 'TablesBasicPage',
        component: TablesBasicPage,
      },
      {
        path: 'Webcam3',
        name: 'Webcam3',
        component: Webcam3,
      },
      // {
      //   path: 'components/maps',
      //   name: 'GoogleMapPage',
      //   component: GoogleMapPage,
      // },
    ],
  },
]

export default routes;
