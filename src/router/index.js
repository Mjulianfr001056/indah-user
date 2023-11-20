import {createRouter, createWebHistory} from 'vue-router';
import dashboard from '../pages/master/dashboard.vue'
import sandboxing from '../pages/sandboxingList.vue'
import metadata from '../pages/metadata.vue'
import sandboxingPage from '@/views/sandboxingPage.vue'
import notebookPage from '../pages/notebookPage.vue'
import dataPage from "@/views/dataPage.vue"
import metadataDetails from "@/views/metadataDetails.vue";

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
        name: 'Notebook',
        path: '/notebook',
        component: notebookPage
    },
    {
        path: "/data-page",
        name: "dataPage",
        component: dataPage
    },
    {
        path: "/metadata-details",
        name: "metadataDetails",
        component: metadataDetails
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