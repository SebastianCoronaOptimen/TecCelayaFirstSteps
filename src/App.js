import Button from '@mui/material/Button';
import { DataStore } from 'aws-amplify/datastore';
import { Todo } from './models';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CustomButton from './Components/CustomButton';
import AddModelComponent from './Components/AddModelComponent';
import EditModalComponent from './Components/EditModalComponent';

function App() {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',  
        description: ''
    });
    

    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);

    const handleFormChange = (data) => {
        setFormData(data);
    };

    useEffect(() => {
        queryToDo();
    }, []);

    async function createTodo() {
        await DataStore.save(
            new Todo({
                name: formData.nombre || "Sin nombre",
                description: formData.description || "Sin descripción"
            })
        );
        console.log("Creado");
        queryToDo();
        setFormData({ nombre: '', description: '' });
    };

    
    const handleEditTodo = (id) => {
        const todoToEdit = data.find(todo => todo.id === id);
        if (todoToEdit) {
            setSelectedTodo(todoToEdit);
            setOpenEditModal(true);
        }
    };

    
    const handleSaveEdit = async (editedData) => {
        if (selectedTodo) {
            const CURRENT_ITEM = await DataStore.query(Todo, selectedTodo.id);
            if (CURRENT_ITEM) {
                await DataStore.save(Todo.copyOf(CURRENT_ITEM, (updated) => {
                    updated.name = editedData.nombre || "Sin nombre";
                    updated.description = editedData.description || "Sin descripción";
                }));
                console.log('Editado');
                queryToDo();
            } else {
                console.log("No se encontró el card para editar");
            }
        }
    };

    
    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setSelectedTodo(null);
    };

    async function updateTodo(id) {
        const CURRENT_ITEM = await DataStore.query(Todo, id);
        if (CURRENT_ITEM) {
            await DataStore.save(Todo.copyOf(CURRENT_ITEM, (updated) => {
                updated.name = "Editado";
            }));
            console.log('Editado');
            queryToDo();
        } else {
            console.log("No se encontró el card para editar");
        }
    };

    async function deleteToDo(idModel) {
        const modelToDelete = await DataStore.query(Todo, idModel);
        if (modelToDelete) {
            await DataStore.delete(modelToDelete);
            console.log("Eliminado");
            queryToDo();
        } else {
            console.log("no existe");
        }
    };

    async function queryToDo() {
        const models = await DataStore.query(Todo);
        setData(models);
        console.log(models);
    }

    return (
        <div className='App'>
            <Grid container spacing={2} margin={2}>
                <CustomButton text="Create" onClick={createTodo} />
            </Grid>

            <div>
                <AddModelComponent onDataChange={handleFormChange} />
            </div>

            <Grid container spacing={2}>
                {data.map((todo) => {
                    return (
                        <Grid item key={todo.id} xs={6} md={3}>
                            <Card sx={{ maxWidth: 345, margin: 2 }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {todo.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {todo.description}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        "{todo.id}"
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => handleEditTodo(todo.id)}>
                                        Editar
                                    </Button>
                                    <Button size="small" onClick={() => deleteToDo(todo.id)}>
                                        Eliminar
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>

            {/* Modal de edición */}
            <EditModalComponent 
                open={openEditModal}
                onClose={handleCloseEditModal}
                todoData={selectedTodo}
                onSave={handleSaveEdit}
            />
        </div>
    );
}

export default App;