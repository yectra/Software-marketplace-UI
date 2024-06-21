import Appbar from '../common/components/layout/Appbar'
import Index from "../pages/dashboard/Index"
import BaseLayout from "../pages/BaseLayout"
import Indexdev from "../developerpages/devdashboard/Indexdev"
import Devdash from "../developerpages/devdashboard/Views/Devdash"
import Devpage from "../developerpages/developmentstarter/view/DevPage"
import BaseforDocs from '../docspages/appdescription/BaseforDocs'
import Descriptionview from '../docspages/appdescription/views/Descriptionview'
import Functiondesview from '../docspages/aboutfunctions/views/Functiondesview'
import Developedapps from '../developerpages/developerappdetails/views/DevelopedApps'
import Monitorapps from '../developerpages/developerappdetails/components/MonitorApps'
import Availabletools from '../docspages/developertools/views/Availabletools'
import Updatedetails from '../developerpages/updateapp/components/UpdateDetails'
import IndexforAdmin from '../adminpanel/admindashboard/IndexforAdmin'
import Detailedview from '../adminpanel/admindashboard/views/Detailedview'
import ApprovedApps from '../adminpanel/admindashboard/views/ApprovedApps'

import DeniedApps from '../adminpanel/admindashboard/views/DeniedApps'

import AppOverview from '../developerpages/appdescription/components/AppOverview'


const route = [
    {
        path:'/',
        element:<Appbar />,
        children:[
            {
                path:'',
                element:<Index />,
            },
            {
                path:'install',
                element:<BaseLayout/>,
            }
        ]
    },
    {
        path:'developer',
        element:<Indexdev/>,
        children:[
            {
                path:"",
                element:<Devdash/>
            },
            {
                path:"create",
                element:<Devpage/>
            },
            {
                path:"myapps",
                element:<Developedapps/>
            },
            {
                path:"monitor/:appName",
                element:<Monitorapps/>
            },
            {
                path:"update/:appName",
                element:<Updatedetails/>
            },
            {
                path:"appdetails/:appName",
                element:<AppOverview/>
            }
        ]
    },
    {
        path:'docs',
        element:<BaseforDocs/>,
        children: [
            {
                path:"",
                element:<Descriptionview/>
            },
            {
                path:"function",
                element:<Functiondesview/>
            },
            {
                path:"developertools",
                element:<Availabletools/>
            }
        ]
    },
    {
        path:'admin',
        element:<IndexforAdmin/>,
        children:[
           {
                path:"",
                element:<Detailedview/>
            },
            {
                path:"approved",
                element:<ApprovedApps/>
            },
            {
                path:"denied",
                element:<DeniedApps/>
            }
            

        ]
    }
];

export default route;
