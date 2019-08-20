import home from '../page/home/Home'
import Category from '../page/category/category'
import Cart from '../page/cart/cart'
import User from '../page/user/user'
import ProductList from '../page/product-list/ProductList'
import ProductDetail from '../page/product-detail/ProductDetail'
import Signin from '../page/auth/Signin'
import Signup from '../page/auth/Signup'
import Checkout from '../page/checkout/checkout'
import AddressEdit from  '../page/address/AddressEdit'
import AddressList from '../page/address/AddressList'
import Payment from '../page/payment/Payment'
import Order from '../page/order/order'
import OrderDetail from '../page/order/OrderDetail'
import PaySuccess from '../page/payment/PaySuccess'
import Search from '../page/search/search'

export default [
  {
    path: '/',
    name:'home',
    component: home,
    meta:{
      isshowtabbar:true
    }
  },
  {
    path:'/category',
    name:'category',
    component: Category,
    meta:{
      isshowtabbar:true
    }
  },
  {
    path:'/cart',
    name:'cart',
    component: Cart,
    meta:{
      isshowtabbar:false
    }
  },
  {
    path:'/user',
    name: 'user',
    component: User,
    meta:{
      isshowtabbar:true
    }
  },
  {
    path:'/products',
    name:'products',
    component:ProductList,
  },
  {
    path:'/product/:id?/:productId?',
    name:'product',
    component: ProductDetail
  },
  {
    path:'/signin',
    name:'signin',
    component: Signin
  },
  {
    path:'/signup',
    name: 'signup',
    component: Signup
  },
  {
    path:'/checkout',
    name:'checkout',
    component: Checkout
  },
  {
    path:'/addressManage/addressEdit',
    name:'addressEdit',
    component:AddressEdit
  },
  {
    path:'/addressManage/addressList',
    name:'addressList',
    component:AddressList
  },
  {
    path:'/payment',
    name:'payment',
    component:Payment
  },
  {
    path:'/order',
    name:'order',
    component:Order
  },
  {
    path:'/orderdetail',
    name:'orderDetail',
    component:OrderDetail
  },
  {
    path:'/paySuccess',
    name:'paySuccess',
    component:PaySuccess
  },
  {
    path:'/search',
    name:'search',
    component:Search
  }
]
