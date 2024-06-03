import { Box, Typography, Link } from '@mui/material';
import { useParams } from 'react-router-dom';
const Monitortable = () => {
    const { appName } = useParams();

    
    const subscription = 'Marketplace Main Subscription';
    const subscriptionID = '68ba3355';
    const location = 'South-India';
    const url = 'https://orange-pebble-0ad7e9f1e.5.azurestaticapps.net';
    const source = 'master (GitHub)';
    const dockerimage='docker (hub)'
    const deploymentHistory = 'GitHub Action runs';
  return (
    <Box p={2} border={1} borderColor="grey.300" borderRadius={4} boxShadow={1} sx={{mt:6}}>
    <Typography variant="h6" gutterBottom>{appName}</Typography>
    <Box>
   
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body1">Subscription</Typography>
        <Link href="#">{subscription}</Link>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body1">Subscription ID</Typography>
        <Typography variant="body1">{subscriptionID}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body1">Location</Typography>
        <Typography variant="body1">{location}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body1">URL</Typography>
        <Link href={url} target="_blank" rel="noopener noreferrer">{url}</Link>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body1">Github Source</Typography>
        <Link href="#">{source}</Link>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body1">Docker image</Typography>
        <Link href="#">{dockerimage}</Link>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body1">Deployment history</Typography>
        <Link href="#">{deploymentHistory}</Link>
      </Box>
    </Box>
  </Box>
  )
}

export default Monitortable