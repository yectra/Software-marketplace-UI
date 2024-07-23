import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getUserDetailsFromMsal } from '@/common/services/AuthHelper';
import { getInitials } from '@/common/UI/UiHelpers';
import VersionFeedbackReport from '@/pages/developerportal/appdescription/components/VersionFeedbackReport';
import { AppReport } from '@/pages/developerportal/appdescription/services';
import useLoading from '@/common/hooks/useLoading';
import LoadingBackdrop from '@/common/UI/LoadingBackdrop';
import BaseButton from '@/common/components/controls/BaseButton';


import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

import { useMsal } from '@azure/msal-react';

const AppOverview:React.FC = () => {
  const { appName } = useParams();
  const appNameOrDefault: string = appName ?? '';
  const logoInitials = getInitials({ appName: appNameOrDefault });
  const [latestVersion, setLatestVersion] = useState<any>(null);
  const [previousVersions, setPreviousVersions] = useState<any[]>([]);
  const [userEmail, setUserEmail] = useState<string>('');
  const {isLoading,setLoading}=useLoading();
  const { accounts } = useMsal();

  const appReport=new AppReport();

  useEffect(() => {
    const userDetails = getUserDetailsFromMsal(accounts);
    setUserEmail(userDetails.email);
  }, [accounts]);

  useEffect(() => {
    const fetchVersions = async () => {
      setLoading(true);
      try {
        const response = await appReport.getVersiondetails({
          email: userEmail,
          appName: appNameOrDefault
        });
        const versions = response;
        console.log(versions)

        if (versions.length > 0) {
          setLatestVersion(versions[versions.length - 1]);
          setPreviousVersions(versions.slice(1, -1));
        }
      } catch (error) {
        console.error('Error fetching versions:', error);
      }
      finally{
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchVersions();
    }
  }, [userEmail, appNameOrDefault]);

  return (
    <Box sx={{ }}>
      <LoadingBackdrop isLoading={isLoading}/>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', pb: 2 }}>
          <Box
            sx={{
              width: 35,
              height: 30,
              mr: 1,
              bgcolor: 'black',
              color: '#09FFC4',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '20%',
              fontSize: '1rem',
              fontWeight: 'bold',
            }}
          >
            <Typography variant="body2" component="span" sx={{ color: 'inherit', fontSize: 'inherit' }}>
              {logoInitials}
            </Typography>
          </Box>
          <Typography variant="h5">{appName?.toUpperCase()}</Typography>
        </Box>
        <Box>
         
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>APP INFORMATION</Typography>
          {latestVersion && (
            <Box>
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Typography variant="body1">Version</Typography>
                <Typography variant="body1" sx={{ color: 'grey' }}>{latestVersion.appVersion}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Typography variant="body1">Updated On</Typography>
                <Typography variant="body1" sx={{ color: 'grey' }}>{latestVersion.updatedOn}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Typography variant="body1">Github Link</Typography>
                <Typography variant="body1" sx={{ color: 'grey' }}>
                  <a href={latestVersion.gitHubLink} target="_blank" rel="noopener noreferrer">
                    {latestVersion.gitHubLink}
                  </a>
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Typography variant="body1">Dockerhub Link</Typography>
                <Typography variant="body1" sx={{ color: 'grey' }}>{latestVersion.dockerHubLink}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Typography variant="body1">Release Date</Typography>
                <Typography variant="body1" sx={{ color: 'grey' }}>-</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Typography variant="body1">Approval Status</Typography>
                <Typography variant="body1" sx={{ color: latestVersion.approvedStatus=='accepted'?'green':'red' }}>{latestVersion.approvedStatus}</Typography>
              </Box>
            </Box>
          )}
        </Box>
        <Box sx={{mt:2}}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore/>} >
          <Typography variant='body1'>Version Feedback</Typography>
          </AccordionSummary>
          <AccordionDetails>
          {latestVersion && (
                <VersionFeedbackReport versionData={latestVersion.versionFeedback[0]
                } />
              )}
          </AccordionDetails>
        </Accordion>
      </Box>
      </Box>
     

      <Box sx={{ mt: 4 }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography variant="body1">Check out previous versions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ width: '100%' }}>
              {previousVersions.length === 0 ? (
                <Typography variant="body2">No previous versions available.</Typography>
              ) : (
                previousVersions.map((versionData, index) => (
                  <Box key={index} sx={{ border: '1px solid #ccc', borderRadius: 4, p: 2, my: 1 }}>
                    <Box display="flex" justifyContent="space-between" mt={1}>
                      <Typography variant="body1">Version</Typography>
                      <Typography variant="body1" sx={{ color: 'grey' }}>{versionData.v}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mt={1}>
                      <Typography variant="body1">Updated On</Typography>
                      <Typography variant="body1" sx={{ color: 'grey' }}>02/01/2024</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mt={1}>
                      <Typography variant="body1">Github Link</Typography>
                      <Typography variant="body1" sx={{ color: 'grey' }}>
                        <a href={versionData.gitHubLink} target="_blank" rel="noopener noreferrer">
                          {versionData.gitHubLink}
                        </a>
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mt={1}>
                      <Typography variant="body1">Dockerhub Link</Typography>
                      <Typography variant="body1" sx={{ color: 'grey' }}>{versionData.dockerHubLink}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mt={1}>
                      <Typography variant="body1">Release Date</Typography>
                      <Typography variant="body1" sx={{ color: 'grey' }}>02/04/2024</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mt={1}>
                      <Typography variant="body1">Approval Status</Typography>
                      <Typography variant="body1" sx={{ color:versionData.approvedStatus=='accepted'?'green':'red' }}>{versionData.approvedStatus}</Typography>
                    </Box>
                    <Box mt={1} sx={{display:"flex",flexDirection:"column"}}>
                <Typography variant="body1">Version Feedback</Typography>
              </Box>
              {versionData.approvedStatus === 'accepted' && (
          <BaseButton
            variant="contained"
            name="Rollback"
          
          
          />
         
        )}
                  </Box>
                ))
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default AppOverview;
