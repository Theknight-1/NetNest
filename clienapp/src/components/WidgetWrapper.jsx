
import { Box } from '@mui/material';
import { styled } from '@mui/system';

const WidgetWrapper = styled(Box)(({ theme }) => ({
    marginTop: "10px",
    padding: "1.5rem 1.5rem 0.75rem 1.5rem",
    backgroundColor: theme.palette.background.alt,
    borderRadius: "1rem",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    // width:"100%"
}))

export default WidgetWrapper
