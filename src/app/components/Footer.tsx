import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.secondary',
        py: 2,
        textAlign: 'center',
        position: 'relative',
        bottom: 0,
        width: '100%',
      }}
    >
      <Typography variant="body2" fontSize={30}>
        MADE BY{' '}
        <Link href="https://kedar355.vercel.app/" target="_blank" rel="noopener noreferrer" color="inherit">
          KEDAR
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;