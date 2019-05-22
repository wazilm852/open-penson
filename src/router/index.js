import Vue from 'vue'
import Router from 'vue-router'
import HomeIndex from '../pages/home/index'
import Customization from '../pages/customization_api/index'
import Login from '../pages/login/index'
import ChangePassword from '../pages/login/changePassword'
import Main from '../pages/main'
import HomePage from '../pages/homePage'
import DataDetails from '../pages/homePage/dataDetails'
import BasicMessage from '../pages/basicMessage'
import ShortMessage from '../pages/shortMessage'
import CallRecord from '../pages/callRecord'
import MyAccount from '../pages/myAccount'
import Timeout from '../pages/timeout/index'
import Mart from '../pages/data-mart/index'
import DataBazaar from '../pages/dataBazaar'
import ContractSigning from '../pages/data-mart/contractSigning'
import BankCardElements from '../pages/data-mart/bankCardElements'
import CaCertificate from '../pages/data-mart/caCertificate'
import IndustryVerification from '../pages/data-mart/industryVerification'
import OcrDiscern from '../pages/data-mart/ocrDiscern'
import PoliceVerification from '../pages/data-mart/policeVerification'
import PhoneVerification from '../pages/data-mart/phoneVerification'
import PersonalVerification from '../pages/data-mart/personalVerification'
import IdOcr from '../pages/data-mart/idOcr'
import DrivingLicenceOCR from '../pages/data-mart/drivingLicenceOCR'
import DriveOCR from '../pages/data-mart/driveOCR'
import Certificate from '../pages/data-mart/certificate'
import wechatSign from '../pages/wechatSign/index'
import Details from '../pages/wechatSign/details'
import sign from '../pages/wechatSign/sign'
import ModuleDetail from '../pages/wechatSign/moduleDetail.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/home',
  routes: [
    {
      path: '/',
      name: 'index',
      component: HomeIndex
    },
    {
      path: '/custom',
      name: 'custom',
      component: Customization
    },
    {
      path: '/mart',
      name: 'mart',
      component: Mart
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/changePassword',
      name: 'changePassword',
      component: ChangePassword,
    },
    {
      path: '/timeout',
      name: 'timeout',
      component: Timeout,
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      children:[
        {
          path: '/homePage',
          name: 'homePage',
          component: HomePage,
        },
        {
          path: '/dataDetails',
          name: 'dataDetails',
          component: DataDetails,
        },
        {
          path: '/basicMessage',
          name: 'basicMessage',
          component: BasicMessage,
        },
        {
          path: '/shortMessage',
          name: 'shortMessage',
          component: ShortMessage,
        },
        {
          path: '/myAccount',
          name: 'myAccount',
          component: MyAccount,
        },
        {
          path: '/dataBazaar',
          name: 'dataBazaar',
          component: DataBazaar
        },
        {
          path: '/wechatSign',
          name: 'wechatSign',
          component: wechatSign,
          children: [
            {
              path: '/wechatSign/moduleDetail',
              name: 'moduleDetail',
              component: ModuleDetail
            }
          ]
        },
        
        {
          path: '/Details',
          name: 'Details',
          component: Details
        },
        {
          path: '/sign',
          name: 'sign',
          component: sign
        },
        {
          path: '/callRecord',
          name: 'callRecord',
          component: CallRecord,
        },
        {
          path: '/contractSigning',
          name: 'contractSigning',
          component: ContractSigning,
        },
        {
          path: '/bankCardElements',
          name: 'bankCardElements',
          component: BankCardElements,
        },
        {
          path: '/caCertificate',
          name: 'caCertificate',
          component: CaCertificate,
        },
        {
          path: '/certificate',
          name: 'certificate',
          component: Certificate,
        },
        {
          path: '/industryVerification',
          name: 'industryVerification',
          component: IndustryVerification,
        },
        {
          path: '/ocrDiscern',
          name: 'ocrDiscern',
          component: OcrDiscern,
        },
        {
          path: '/policeVerification',
          name: 'policeVerification',
          component: PoliceVerification,
        },
        {
          path: '/phoneVerification',
          name: 'phoneVerification',
          component: PhoneVerification,
        },
        {
          path: '/personalVerification',
          name: 'personalVerification',
          component: PersonalVerification,
        },
        {
          path: '/idOcr',
          name: 'idOcr',
          component: IdOcr,
        },
        {
          path: '/drivingLicenceOCR',
          name: 'drivingLicenceOCR',
          component: DrivingLicenceOCR,
        },
        {
          path: '/driveOCR',
          name: 'driveOCR',
          component: DriveOCR,
        }
      ]
    }
  ]
})
