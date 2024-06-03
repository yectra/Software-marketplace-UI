import Appbar from '../common/components/layout/Appbar'
import Index from "../pages/Dashboard/Index"
import BaseLayout from "../pages/BaseLayout"
import Indexdev from "../developerPages/devDashboard/Indexdev"
import Devdash from "../developerPages/devDashboard/Views/Devdash"
import Devpage from "../developerPages/developingPage/view/Devpage"
import BaseforDocs from '../docsPages/appdescription/BaseforDocs'
import Descriptionview from '../docsPages/appdescription/views/Descriptionview'
import Functiondesview from '../docsPages/Aboutfunctions.tsx/views/Functiondesview'
import Developedapps from '../developerPages/Developerappdetails/views/Developedapps'
import Uploadapp from '../developerPages/Developerappdetails/components/Uploadapp'
import Monitorapps from '../developerPages/Developerappdetails/components/Monitorapps'

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
                path:"upload/:appName",
                element:<Uploadapp/>
            },
            {
                path:"monitor/:appName",
                element:<Monitorapps/>
            }
        ]
    },
    {
        path:'docs',
        element:<BaseforDocs/>,
        children:[
            {
                path:"",
                element:<Descriptionview/>
            },
            {
                path:"function",
                element:<Functiondesview/>
            }
        ]
    }
];

export default route;
