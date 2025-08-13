import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CustomButton from './CustomButton';
import Grid from '@mui/material/Grid';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function EditModalComponent({ open, onClose, todoData, onSave }) {
  const [localData, setLocalData] = useState({
    nombre: '',
    description: ''
  });

  
  useEffect(() => {
    if (todoData) {
      setLocalData({
        nombre: todoData.name || '',
        description: todoData.description || ''
      });
    }
  }, [todoData]);

  const handleChange = (field, value) => {
    setLocalData({ ...localData, [field]: value });
  };

  const handleSave = () => {
    onSave(localData);
    onClose();
  };

  const handleClose = () => {
    onClose();
    setLocalData({
      nombre: '',
      description: ''
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          Editar Todo
        </Typography>
        
        <Box
          component="form"
          sx={{ '& > :not(style)': { mb: 2, width: '100%' } }}
          noValidate
          autoComplete="off"
        >
          <TextField 
            id="nombre-field" 
            label="Nombre" 
            variant="outlined" 
            type='text'
            value={localData.nombre}
            onChange={(e) => handleChange('nombre', e.target.value)}
            fullWidth
          />
          <TextField 
            id="description-field" 
            label="Descripción" 
            variant="outlined" 
            type='text'
            value={localData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            fullWidth
          />
        </Box>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <CustomButton 
            text="Guardar" 
            onClick={handleSave}
            variant="contained"
          />
          <CustomButton 
            text="Cancelar" 
            onClick={handleClose}
            variant="outlined"
          />
        </Grid>
      </Box>
    </Modal>
  );
}

export default EditModalComponent;