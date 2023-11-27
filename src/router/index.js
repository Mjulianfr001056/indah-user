import {createRouter, createWebHistory} from 'vue-router';
import dashboard from '../views/dashboard.vue'
import sandboxing from '../views/sandboxingList.vue'
import metadata from '../views/metadata.vue'
import sandboxingPage from '@/views/sandboxingPage.vue'
import testnotebook from '@/others/notebook.vue'

const routes = [
    {
        name: 'Dashboard',
        path: '/',
        component: dashboard
    },
    {
        name: 'Sandboxing',
        path: '/sandboxing',
        component: sandboxing
    },
    {
        name: 'Metadata',
        path: '/metadata',
        component: metadata
    },
    {
        name: 'SandboxingPage',
        path: '/sandboxing-page',
        component: sandboxingPage
    },
    {
        name: 'test-notebook',
        path: '/test-notebook',
        component: testnotebook
    },
];
const router = Router();
export default router;
function Router() {
    const router= new createRouter({
        history: createWebHistory(),
        routes,
    });
    return router;
}