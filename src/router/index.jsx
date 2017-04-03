import Notification from '../components/notification/Notification.jsx';
import MySelect from '../components/form/select/MySelect.jsx';
import MyCheckBox from '../components/form/checkbox/MyCheckBox.jsx';
import MyRadioGroup from '../components/form/radio/MyRadioGroup.jsx';
import Form from '../components/form/Form.jsx';

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
      path: 'MyCheckBox',
      component: MyCheckBox

    }, {
      path: 'MyRadioGroup',
      component: MyRadioGroup

    }, {
      path: 'Form',
      component: Form

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