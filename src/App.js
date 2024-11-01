// import logo from './logo.svg';
import './App.css';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddTreat from './components/AddTreat';
import axios from 'axios';
import TreatGrid from './components/DisplayTreats';
import Grid from '@mui/material/Grid2';


const App = () => {
  // states to track little treats, the treat being added, and if modal is open/closed
  const [treats, setTreats] = useState([]);
  const [newTreat, setNewTreat] = useState({ title: '', date: '', description: '', photo: null });
  const [isModalOpen, setModalOpen] = useState(false);

  // grabs all the little treats in the db on server start up
  useEffect(() => {
    axios.get('http://localhost:5001/treats').then((response) => {
      setTreats(response.data);
      console.log(response.data);
    }).catch((error) => {
      console.error("Error fetching treats:", error);
    });
  }, []);

  // adds the new treat to the list of little treats, resets the form values and closes modal
  const handleAddTreat = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5001/treats', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Treat added:', response.data); // Log to verify backend response
  
      const savedTreat = response.data;
      const photoURL = formData.get('photoURL'); // Retrieve the photo URL to display in grid

      setTreats((prevTreats) => [savedTreat, ...prevTreats]);
      setNewTreat({ title: '', date: '', description: '', photo: null}); // reset states
      setModalOpen(false);
      // console.log(savedTreat); // DEBUG
    } catch (error) {
      console.error('Error saving little treat:', error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <Grid container >
          <Grid size={7} alignContent={'center'}>
            <h1>
              Little Treat Tracker
            </h1>
          </Grid>
          <Grid size={5} alignContent={'center'}>
            <Button onClick={() => setModalOpen(true)} variant="contained">
                Add Treat
            </Button>
          </Grid>
        </Grid>
    
        <AddTreat 
          open={isModalOpen} 
          onClose={() => setModalOpen(false)} 
          onSave={handleAddTreat} 
          newTreat={newTreat}
          setNewTreat={setNewTreat}
        />

      </header>
      <div>
        <TreatGrid treats={treats}/>
      </div>
    </div>
  );
};



export default App;
