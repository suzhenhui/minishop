import home from '../page/home/Home'
import Category from '../page/category/category'
import Cart from '../page/cart/cart'
import User from '../page/user/user'

export default [
  {
    path: '/',
    name:'home',
    component: home
  },
  {
    path:'/category',
    name:'category',
    component: Category
  },
  {
    path:'/cart',
    name:'cart',
    component: Cart
  },
  {
    path:'/user',
    name: 'user',
    component: User
  }
]
