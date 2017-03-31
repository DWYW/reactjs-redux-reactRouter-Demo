import Notification from '../components/notification/Notification.jsx';
import MySelect from '../components/form/select/MySelect.jsx';

const routes = {
  path: '/',
  component: require('../App.jsx'),
  indexRoute: {
    component: Notification
  },
  childRoutes: [
    {
      path: 'Notification',
      component: Notification
    }, {
      path: 'MySelect',
      component: MySelect

    }, {
      path: 'hello',
      component: require('../components/hello/Hello.jsx')

    }, {
      path: 'welcome',
      component: require('../components/hello/Welcome.jsx')
    }
  ]
}
export default routes;