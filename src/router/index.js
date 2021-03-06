import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')
  },
  {
    path: '/professor/courses',
    name: 'Cursos de professores',
    component: () => import(/* webpackChunkName: "about" */ '../views/professor/Courses.vue')
  },
  {
    path: '/professor/assignments/:id_c',
    name: 'Tarefas do professores',
    component: () => import(/* webpackChunkName: "about" */ '../views/professor/Assignments.vue')
  },
  {
    path: '/student/courses',
    name: 'Todos os cursos',
    component: () => import(/* webpackChunkName: "about" */ '../views/student/Courses.vue')
  },
  {
    path: '/student/my-courses',
    name: 'Meus cursos',
    component: () => import(/* webpackChunkName: "about" */ '../views/student/MyCourses.vue')
  },
  {
    path: '/student/assignments/:id_c',
    name: 'Tarefas',
    component: () => import(/* webpackChunkName: "about" */ '../views/student/Assignments.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
