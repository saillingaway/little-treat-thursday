import React from 'react';
import Masonry from 'react-masonry-css';
import TreatCard from './TreatCard.js';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2'

const TreatGrid = ({ treats }) => (
  <Box
    display="grid"
    gridTemplateColumns="repeat(3, 1fr)" // Three equal-width columns
    gridAutoRows="minmax(100px, auto)" // Allows items to vary in height
    gap={2} // Space between items
    padding={2}
    sx={{
      '@media (max-width: 900px)': {
        gridTemplateColumns: 'repeat(2, 1fr)', // Two columns on small screens
      },
      '@media (max-width: 600px)': {
        gridTemplateColumns: '1fr', // Single column on extra-small screens
      },
    }}
  >
    {treats.slice().reverse().map((treat, index) => (
      <TreatCard key={index} treat={treat} />
    ))}
  </Box>
);

export default TreatGrid;