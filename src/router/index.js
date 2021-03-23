import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dogs from '../views/Dogs.vue'
import PetSettings from '../views/PetSettings.vue'
import CreatePet from '../views/CreatePet.vue'
import DeletePet from '../views/DeletePet.vue'
import Pets from '../views/Pets.vue'
import Signin from '../views/Signin.vue'
import Signup from '../views/Signup.vue'
import Profile from '../views/Profile.vue'
import Mercy from '../views/Mercy.vue'
import Store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/dogs',
    name: 'dogs',
    component: Dogs
  },
  {
    path: '/createpet',
    name: 'createpet',
    // props: true,
    component: CreatePet,
    beforeEnter: AuthGuard
  },
  {
    path: '/petsettings/:id',
    name: 'petsettings',
    props: true,
    component: PetSettings,
    beforeEnter: AuthGuard
  },
  {
    path: '/deletepet/:id',
    name: 'deletepet',
    props: true,
    component: DeletePet,
    beforeEnter: AuthGuard
  },
  {
    path: '/pets/:id',
    name: 'pets',
    props: true,
    component: Pets
  },
  {
    path: '/mercy',
    name: 'mercy',
    component: Mercy
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    beforeEnter: AuthGuard
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin
  }  
]

const router = new VueRouter({
  routes,
  base: process.env.BASE_URL,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    // return desired position
    if (savedPosition) {
      return savedPosition
    } else {
      const position = {};
      if (to.hash) {
        position.selector = to.hash
        if (document.querySelector(to.hash)){
          return position
        }
        return false
      }
    }
  }
})

// защита от перехода в личный кабинет без аутентификации
function AuthGuard(from, to, next) {
  if (Store.getters.isUserAuthentificated)
    next()
  else
    next('/signin')
}

export default router
