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
  
  // <Box display="flex" justifyContent="center" padding={2}>
  //   <Masonry className="" columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
  //     {treats.slice().reverse().map((treat, index) => (
  //       <Grid key={index} sx={{ marginBottom: 2 }} size={4}>
  //         <TreatCard treat={treat} />
  //       </Grid>
  //     ))}
  //   </Masonry>
  // </Box>
  
  // <Masonry breakpointCols={3} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
  //   {treats.map((treat, index) => (
  //     <TreatCard key={index} treat={treat} />
  //   ))}
  // </Masonry>


    // <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2} columnClassName="">
    //   {treats.slice().reverse().map((treat, index) => (
    //     <TreatCard key={index} treat={treat} />
    //   ))}
    // </Masonry>

);

export default TreatGrid;