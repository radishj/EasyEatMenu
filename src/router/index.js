import Vue from 'vue'
import store from '../store/index.js'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
     path: '', 
     redirectTo: '/', 
     pathMatch: 'full',
     meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let phone = localStorage.getItem('phone');
  let loggedin = phone!=null && (typeof phone !== 'undefined') && (typeof phone != "object") && phone!='';
  if(to.matched.some(record => record.meta.requiresAuth)) {
    //let ph = store.state.phone;
    //let vv= (typeof ph !== 'undefined') && (typeof store.state.phone != "object") && store.state.phone!='';
    //console.log('phone:'+ (typeof store.state.phone !== 'undefined')+'aaa'+(typeof store.state.phone != "object") +'aaa'+ store.state.phone!='');
    if (loggedin) {
      next()
      return
    }
    //alert(JSON.stringify(from));
    //console.log(JSON.stringify(from));
    store.state.fromPage=from.path;
    next('/login') 
  } else {
    if(to.path == '/login')
    {
      if(loggedin)
      {
        if(from.path=='/login')
          next('/');
        else
          next(from.path); 
      }
    }
    next() 
  }
})
export default router
