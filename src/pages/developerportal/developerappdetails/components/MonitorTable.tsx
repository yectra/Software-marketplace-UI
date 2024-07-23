import { useNavigate, useParams } from 'react-router-dom';

import { Box, Typography, Link } from '@mui/material';

import BaseButton from '@/common/components/controls/BaseButton';


const Monitortable:React.FC = () => {
    const { appName } = useParams();
    const subscription = 'Marketplace Main Subscription';
    const subscriptionID = '68ba3355';
    const location = 'South-India';
    const url = 'https://orange-pebble-0ad7e9f1e.5.azurestaticapps.net';
    const source = 'master (GitHub)';
    const dockerImage = 'docker (hub)';
    const deploymentHistory = 'GitHub Action runs';
    const navigate = useNavigate();

    const handleUpdateClick = () => {
        navigate(`/developer/update/${encodeURIComponent(appName || '')}`);
    };

    return (
        <Box p={2} border={1} borderColor="grey.300" borderRadius={4} boxShadow={1} sx={{ mt: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 500, textTransform: "uppercase" }} gutterBottom>
                    {appName}
                </Typography>
                <BaseButton
                    variant="contained"
                    onClick={handleUpdateClick}
                    name='Update app'
                >
                </BaseButton>
            </Box>

            <Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body1">Subscription</Typography>
                    <Link href="#">{subscription}</Link>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body1">Subscription ID</Typography>
                    <Typography variant="body1">{subscriptionID}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body1">Location</Typography>
                    <Typography variant="body1">{location}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body1">URL</Typography>
                    <Link href={url} target="_blank" rel="noopener noreferrer">{url}</Link>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body1">Github Source</Typography>
                    <Link href="https://github.com/yectra/Bg-remover">{source}</Link>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body1">Docker image</Typography>
                    <Link href="#">{dockerImage}</Link>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body1">Deployment history</Typography>
                    <Link href="https://github.com/yectra/Bg-remover/actions">{deploymentHistory}</Link>
                </Box>
            </Box>
        </Box>
    );
};

export default Monitortable;
