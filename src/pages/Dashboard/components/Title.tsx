import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';

const Title = () => {
  return (
    <Box component="section" sx={{ m:2,bgcolor:" #FFFFF2", p: 2, display:"flex", justifyContent:"space-around" }}>
    <Box sx={{ justifyItems:"center" }}>
      <Typography variant='h5' sx={{mt:5,mb:1,color:"black"}}>Favourites of 2024</Typography>
      <Typography variant='subtitle2'>Discover the stand out software that made out our year</Typography>
      <div>
        <Button  sx={{color:"black",border:"solid 1px grey",borderRadius:6,p:1,mt:3,height:30,width:200,'&:hover': { bgcolor: "transparent" } }}>See collections</Button>
      </div>
    </Box>
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <img
        src='https://s3-alpha-sig.figma.com/img/9d4e/6cce/0e82e1da0eb0b1ba7cc7db9dbd9a8b05?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qZvtcoVkTPha9NTrKE4aPZaMQRVf3SeVKQKlfsA0C1wFeE6XjEIQErkhdXJRl6b4hIJ~t2v6lKPgYuZq3PZC2~IqtLFLk~v-SUqkrP1sZHmXbmmrJF0ruvt-sdSfvUU3GxLJOfVBk-b~MBfYZF3olbdMxg1iZPp1ehhuMWhFH2VMkX8GWrs9t7p9Ud3wU2PoqsIF~pGTjR0sio775DYr17N~dk0FIYw-eOaty6-I4CjBUOqIwf-4MKL7RSL0c5oL1Vx5JjAtOjVIJPPG~vbqUNkLji5KtBUzDjAt7NqqAwZSW-helayv7dcVremjbtMdK40dLOWOif9P7EHa7xa1QA__'
        alt="Your Image"
        style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
      />
      <img
        src='https://s3-alpha-sig.figma.com/img/fbc4/b56c/1e83514b33a445d5227ceab22544e3e0?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Okkh4PVh3QesY~2uMzI0IcXs0RP87pLJFk15Fq9b49xWX09cSDvUPlo3ou78pRepEn16XuPyTyeqJq1d6CvgEfP9AF9M5dgHBXOZqsr5Zj60CXQnUB5D1ltVC4SVonTvvXRewRM125O75pBIIxzaJfIfjWg86AnEwIYWri55ZpmoXmyrhcOuCChOHtk~1a4ZgU-b1RRWVikMGRPn9jpQtjS5h3bVt0ke~C~c9tq87crZ2X3wIMxs8~vue7MoOAd51bkHa0SgzFLFqmi44ZkdUei2kqFFP-H-Uy~7FfASOdQeSE8mKpO4H0mh5FesV3YD6TrYb~xNh8Uhq5R0aFgKbQ__'
        alt="Your Image"
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -55%)',
        }}
      />
    </div>
  </Box>
  )
}

export default Title