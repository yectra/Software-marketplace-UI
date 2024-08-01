import { IconButton, InputBase, Modal, Paper, styled, TableCell, tableCellClasses, TableRow } from "@mui/material";

 export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#0C9DBD",
      color: theme.palette.common.white,
     
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      borderRight: `1px solid ${theme.palette.divider}`,
   
    },
  }));
  
 export  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.action.hover,
    },
  }));

  export const StyledModal = styled(Modal)({
    display: 'flex',
    alignItems: 'center',
    width:"100%",
    justifyContent: 'center',
    overflow: 'auto', 
  });

  export const IframeContainer = styled('div')({
    position: 'relative',
    width: '100vw',  
    maxWidth: '1280px',
    height: '100vh',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)' 
  });
  

export const CloseButton = styled(IconButton)({
  position: 'absolute',
  top: '10px',
  right: '10px',
  color: 'red',
  zIndex: 1, 
});

export   const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '115px', 
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between' 
}));

export const StyledInputBase = styled(InputBase)({
  border: '1px solid #C7C6CE',
  borderRadius: '17px',
  padding: '1px 40px',
  width: 380,
  height: 40
});