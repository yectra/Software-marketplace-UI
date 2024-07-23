import { Box, Grid, Toolbar } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";

import DevsideBar from "@/common/components/layout/DevSidebar";
import AdminSidebar from "@/common/components/layout/AdminSidebar";
import DocsSidebar from "@/common/components/layout/DocsSidebar";
import Appbar from "@/common/components/layout/Appbar";
import DevappBar from "@/common/components/layout/DevAppbar";
import DocsNavbar from "@/common/components/layout/DocsNavbar";

const MainLayout = () => {
  const { pathname } = useLocation();

  let appbar;
  if (pathname.includes("/developer")) {
    appbar = <DevappBar />;
  } else if (pathname.includes("/docs")) {
    appbar = <DocsNavbar />;
  } else {
    appbar = <Appbar />;
  }

  let sidebar = null;
  if (!pathname.startsWith("/developer/profile")) {
    if (pathname.startsWith("/developer")) {
      sidebar = <DevsideBar />;
    } else if (pathname.includes("/admin")) {
      sidebar = <AdminSidebar />;
    } else if (pathname.includes("/docs")) {
      sidebar = <DocsSidebar />;
    }
  }

  return (
    <Box>
      <Grid container direction="column" sx={{ height: '100vh' }}>
        <Grid item>
          {appbar}
        </Grid>
        <Grid container item sx={{ flexGrow: 1 }}>
          {sidebar && (
            <Grid item xs={2}>
              {sidebar}
            </Grid>
          )}
          <Grid item xs={sidebar ? 10 : 12}>
            <Toolbar/>
            <Outlet />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainLayout;
