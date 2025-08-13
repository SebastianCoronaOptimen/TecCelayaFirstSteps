import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function CustomButton({ text, onClick, variant = "contained", size = "medium" }) {
    return (
        <Grid item xs={8}>
            <Button variant={variant} onClick={onClick} size={size}>
                {text}
            </Button>
        </Grid>  
    );
}

export default CustomButton;