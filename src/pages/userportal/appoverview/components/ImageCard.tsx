
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

interface Iprops{
  imageUrl:string
}

const ImageCard:React.FC<Iprops> = ({imageUrl}) => {

  return (
    <Card sx={{ mt: 2, borderRadius: 2,mb:2 }}>
      <CardMedia
        sx={{
          height: 400,
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img
          src={imageUrl}
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