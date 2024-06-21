import { AppBar, Toolbar, Typography, InputBase, IconButton, styled, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const StyledInputBase = styled(InputBase)({
    border: '1px solid #C7C6CE',
    borderRadius: '17px',
    padding: '1px 40px',
    width: 350,
    height: 40,
    flexGrow: 1,
    marginLeft: 200
});

const Appadsnavbar = () => {
    return (
        <AppBar position="fixed" sx={{ bgcolor: "white", zIndex: (theme) => theme.zIndex.drawer + 1, boxShadow: 'none' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant='h6' sx={{ color: '#0C9DBD', mr: 40 }}>
                        Marketplace
                    </Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 2 }}>
                    <StyledInputBase
                        placeholder="Search..."
                        inputProps={{ 'aria-label': 'search' }}
                        startAdornment={
                            <IconButton>
                                <SearchIcon sx={{ color: "#C7C6CE" }} />
                            </IconButton>
                        }
                    />
                    <Button variant='text' sx={{ color: "black" }}>
                        Login
                    </Button>
                    <Button variant='text' sx={{ color: "black" }}>
                        Signup
                    </Button>
                </div>

            </Toolbar>
        </AppBar>
    )
}

export default Appadsnavbar;
