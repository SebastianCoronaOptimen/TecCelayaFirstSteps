import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function AddModelComponent({ onDataChange }) {
  const [localData, setLocalData] = useState({
    nombre: '',
    description: ''
  });

  const handleChange = (field, value) => {
    const newData = { ...localData, [field]: value };
    setLocalData(newData);
    // Enviar datos al componente padre
    onDataChange(newData);
  };

  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField 
        id="nombre-field" 
        label="nombre" 
        variant="outlined" 
        type='text'
        value={localData.nombre}
        onChange={(e) => handleChange('nombre', e.target.value)}
      />
      <TextField 
        id="description-field" 
        label="descripcion" 
        variant="outlined" 
        type='text'
        value={localData.description}
        onChange={(e) => handleChange('description', e.target.value)}
      />
    </Box>
  );
}

export default AddModelComponent;