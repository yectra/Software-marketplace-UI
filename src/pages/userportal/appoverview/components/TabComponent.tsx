import { useState } from 'react';

import OverviewCard from '@/pages/userportal/appoverview/components/OverviewCard';
import UserReview from '@/pages/userportal/appoverview/components/UserReview';
//import QnA from '@/pages/userportal/appoverview/components/QnA';


import { Tabs, Tab, Box } from '@mui/material';

function TabPanel(props: any) {
  const { children, value, index } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}

function TabComponent() {
  const [value, setValue] = useState(0);

  const handleChange = (_: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1 ,borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="basic tabs example"
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: '#0C9DBD',
            },
          }}
        >
          <Tab 
            label="Overview" 
            sx={{
              textTransform: 'none',
              minWidth: 0,
              color: 'text.primary',
              '&.Mui-selected': {
                color: '#0C9DBD',
              },
            }}
          />
          <Tab 
            label="Q&A" 
            sx={{
              textTransform: 'none',
              minWidth: 0,
              color: 'text.primary',
              '&.Mui-selected': {
                color: '#0C9DBD',
              },
            }}
          />
          <Tab 
            label="Rating & Review" 
            sx={{
              textTransform: 'none',
              minWidth: 0,
              color: 'text.primary',
              '&.Mui-selected': {
                color: '#0C9DBD',
              },
            }}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <OverviewCard/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* <QnA/> */}
      </TabPanel>
      <TabPanel value={value} index={2}>
       <UserReview/>
      </TabPanel>
    </Box>
  );
}

export default TabComponent;