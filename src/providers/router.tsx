import React from 'react';


// Base 
const MainLayout = React.lazy(() => import("@/pages/MainLayout"));

// User Portal
const Home = React.lazy(() => import("@/pages/userportal/Index"));
const AppMarketplace = React.lazy(() => import("@/pages/userportal/dashboard/views/AppMarketplace"));
const AppDescriptionPage=React.lazy(()=>import('@/pages/userportal/appoverview/views/AppDescriptionPage'));


// Developer Portal
const DeveloperHome = React.lazy(() => import("@/pages/developerportal/Indexdev"));
const UserProfile=React.lazy(()=>import('@/pages/developerportal/devdashboard/Components/UserProfile'))
const DevDashboard=React.lazy(()=>import('@/pages/developerportal/devdashboard/Views/DevDashboard'))
const BuildApp = React.lazy(() => import('@/pages/developerportal/developmentstarter/view/BuildApp'));
const DeveloperApps = React.lazy(() => import('@/pages/developerportal/developerappdetails/views/DeveloperApps'));
const ManageAppdetails=React.lazy(()=>import ('@/pages/developerportal/updateapp/views/ManageAppdetails'))
const DeploymentDetails=React.lazy(()=>import('@/pages/developerportal/developerappdetails/views/DeploymentDetails'))
const UpdateDetails = React.lazy(() => import('@/pages/developerportal/updateapp/components/UpdateDetails'));
const PreviousVersionsData=React.lazy(()=>import('@/pages/developerportal/appdescription/views/PreviousVersionsData'))


// Docs Pages
const DocsOverview = React.lazy(() => import('@/pages/docspages/BaseforDocs'));
const DescriptionView = React.lazy(() => import('@/pages/docspages/appdescription/views/Descriptionview'));
const FunctionDesView = React.lazy(() => import('@/pages/docspages/aboutfunctions/views/Functiondesview'));
const AvailableTools = React.lazy(() => import('@/pages/docspages/developertools/views/Availabletools'));

// Admin Panel
const AdminOverview = React.lazy(() => import('@/pages/adminpanel/admindashboard/IndexforAdmin'));
const DetailedView = React.lazy(() => import('@/pages/adminpanel/admindashboard/views/Detailedview'));
const ApprovedApps = React.lazy(() => import('@/pages/adminpanel/admindashboard/views/ApprovedApps'));
const DeniedApps = React.lazy(() => import('@/pages/adminpanel/admindashboard/views/DeniedApps'));
const DeploymentCenter= React.lazy(() => import('@/pages/adminpanel/admindashboard/views/DeploymentCenter'));


const routes = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '',
                element: <Home />,
                children: [
                    {
                        path: '',
                        element: <AppMarketplace />
                    },
                    {
                        path: 'app/:id',
                        element: <AppDescriptionPage />
                    },
                ]
            },
            {
                path: 'developer',
                element: <DeveloperHome />,
                children: [
                    {
                        path: '',
                        element: <DevDashboard />
                    },
                    {
                        path: 'profile',
                        element: <UserProfile />
                    },
                    {
                        path: 'create-app',
                        element: <BuildApp />
                    },
                    {
                        path: 'myapps',
                        element: <DeveloperApps />
                    },
                    {
                        path: 'upload/:appName',
                        element: <ManageAppdetails />
                    },
                    {
                        path: 'monitor/:appName',
                        element: <DeploymentDetails />
                    },
                    {
                        path: 'update/:appName',
                        element: <UpdateDetails />
                    },
                    {
                        path: 'appdetails/:appName',
                        element: <PreviousVersionsData />
                    }
                ]
            },
            {
                path: 'docs',
                element: <DocsOverview />,
                children: [
                    {
                        path: '',
                        element: <DescriptionView />
                    },
                    {
                        path: 'function',
                        element: <FunctionDesView />
                    },
                    {
                        path: 'developertools',
                        element: <AvailableTools />
                    }
                ]
            },
            {
                path: 'admin',
                element: <AdminOverview />,
                children: [
                    {
                        path: '',
                        element: <DetailedView />
                    },
                    {
                        path: 'approved',
                        element: <ApprovedApps />
                    },
                    {
                        path: 'denied',
                        element: <DeniedApps />
                    },
                    {
                        path:'deployment-center',
                        element:<DeploymentCenter/>
                    }
                ]
            }
        ]
    }
];

export default routes;
