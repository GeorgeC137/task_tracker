import {createRouter, createWebHistory} from 'vue-router'

// Import About view 
import About from '../views/About'
// Import Home view 
import Home from '../views/Home'

// Create an array of routes 
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router