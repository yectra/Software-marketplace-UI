import { useLocation } from 'react-router-dom';
import IndexforIns from '../IndexforIns';  

const Wrapper = () => {
    const location = useLocation();
   
    return (
        <IndexforIns key={location.key} />
    );
}

export default Wrapper;
