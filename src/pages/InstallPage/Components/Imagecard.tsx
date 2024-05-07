
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { useLocation } from 'react-router-dom';

const ImageCard = () => {
  const location = useLocation();
  const { imgdes } = location.state;

  return (
    <Card sx={{ mt: 2, borderRadius: 2 }}>
      <CardMedia
        sx={{
          height: 270,
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img
          src={imgdes}
          alt="bg remover"
          style={{
            height: '100%',
            width: '100%',
            maxWidth: '100%',
            objectFit: 'fill',
          }}
        />
      </CardMedia>
    </Card>
  );
};

export default ImageCard;