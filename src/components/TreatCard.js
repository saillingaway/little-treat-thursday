import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

const TreatCard = ({ treat }) => (
  <Card>
    {treat.photo && (
      <CardMedia
        component="img"
        image={`http://localhost:5001${treat.photo}`} // Use the stored relative path
        alt="Treat photo"
        // style={{ objectFit: 'contain' }}
        style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
      />
    )}
    <CardContent>
      <Typography variant="h5">{treat.title || ""}</Typography>
      <Typography variant="body2" color="textSecondary">{treat.date || ""}</Typography>
      <Typography variant="body2" color="textSecondary">{treat.description || ""}</Typography>
    </CardContent>
  </Card>
);

export default TreatCard;