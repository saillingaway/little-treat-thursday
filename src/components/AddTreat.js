import React, { useEffect, useState } from 'react';
import { Dialog, Button, DialogContent, DialogTitle, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Dropzone from 'react-dropzone';

const AddTreat = ({ open, onClose, onSave, newTreat, setNewTreat }) => {
    const [photoURL, setPhotoURL] = useState(null);
    
    // keep track of the current state of the new treat
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTreat((prev) => ({
            ...prev,        
            [name]: value,  // Update only the specific field of newTreat
          }));
    };

    // triggers when an image drags and drops into the field
    const handleDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setNewTreat((prev) => ({
                ...prev,
                photo: acceptedFiles[0], // store only the first file (single file upload)
            }));
            setPhotoURL(URL.createObjectURL(acceptedFiles[0])); // Generate URL only once
        }
    };

    // clears the photo upload preview when the modal is closed
    useEffect(() => {
        if (!open) {
            setNewTreat((prev) => ({ ...prev, photo: null })); // Clear photo file
            setPhotoURL(null); // Clear preview URL
        }
    }, [open, setNewTreat]);

    const handleSubmit = () => {
        // log FormData after each field update
        const formData = new FormData();
        formData.append('title', newTreat.title || '');
        formData.append('date', newTreat.date || '');
        formData.append('description', newTreat.description || '');
        if (newTreat.photo) {
            formData.append('photo', newTreat.photo);
        }
        formData.append('photoURL', photoURL);

        // Log FormData contents before submission
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        onSave(formData);
        setPhotoURL(null);
        onClose();
      };
    

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add a Little Treat</DialogTitle>
            <DialogContent>
                <TextField
                    label="Title"
                    name="title"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    value={newTreat.title || ''}
                />

                 <Dropzone onDrop={handleDrop}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} style={{ border: '1px dashed gray', padding: '20px', marginTop: '10px' }}>
                        <input {...getInputProps()} />
                        <p>Drag & drop a photo of your little treat to upload, or click to select one</p>
                        </div>
                    )}
                </Dropzone>

                {/* Image upload preview */}
                {photoURL && (
                    <div style={{ marginTop: '20px' }}>
                        <img src={photoURL} alt="Preview" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
                    </div>
                )}

                {/* TODO: Add Date */}
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        label="Basic date picker" 
                        
                        renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                    />
                </LocalizationProvider> */}
                
                <TextField
                    label="Description"
                    name="description"
                    fullWidth
                    margin="normal"
                    value={newTreat.description || ''}
                    onChange={handleChange}
                />

                <Button 
                    onClick={handleSubmit}
                    fullWidth
                    style={{ marginTop: '20px' }}
                >
                    Add My Treat
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default AddTreat;