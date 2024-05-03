import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { useLocation } from 'react-router-dom';


const Imagecard = () => {
  const location=useLocation();
  const {imgdes}=location.state 

  
  return (
    <Card sx={{ mt:2, borderRadius: 2 }}>
    <CardMedia
      sx={{ height: 270, width: 800, overflow: 'hidden' }}
    >
      <img
        src={imgdes}
        alt="bg remover"
        style={{
          height: '100%',
          width: '100%',
          objectFit:"fill", 
          display: 'block'
        }}
      />
    </CardMedia>
  </Card>
  )
}

export default Imagecard