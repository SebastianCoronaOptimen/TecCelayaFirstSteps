import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CustomButton from './CustomButton';

export function TodoCard({ 
    name, 
    description, 
    id, 
    onEdit, 
    onDelete,
    editText = "Editar",
    deleteText = "Eliminar" 
}) {
    return (
        <Card sx={{ maxWidth: 345, margin: 2 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    "{id}"
                </Typography>
            </CardContent>
            <CardActions>
                <CustomButton 
                    text={editText}
                    onClick={() => onEdit(id)} 
                    size="small" 
                />
                <CustomButton 
                    text={deleteText}
                    onClick={() => onDelete(id)} 
                    size="small" 
                />
            </CardActions>
        </Card>
    );
}

export default CardComponent
