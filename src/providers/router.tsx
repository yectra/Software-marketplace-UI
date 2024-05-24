import Appbar from '../common/components/layout/Appbar'
import Index from "../pages/Dashboard/Index"
import BaseLayout from "../pages/BaseLayout"
import Indexdev from "../developerPages/devDashboard/Indexdev"
import Devdash from "../developerPages/devDashboard/Views/Devdash"
import Devpage from "../developerPages/developingPage/view/Devpage"
import BaseforDocs from '../developerPages/appdescription/BaseforDocs'
import Descriptionview from '../developerPages/appdescription/views/Descriptionview'
import Functiondesview from '../developerPages/Aboutfunctions.tsx/views/Functiondesview'
import Adspageview from '../developerPages/developingPage/Appadspage/Adspageview'
import { Mailsuccesspage } from '../developerPages/developingPage/view/Mailsuccesspage'


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
                path:"ads",
                element:<Adspageview/>
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
            },{
                path:"function",
                element:<Functiondesview/>
            }
        ]
    },
    {
        path:'mailsuccessfullysent',
        element:<Mailsuccesspage/>
    }
  
]

export default route;



