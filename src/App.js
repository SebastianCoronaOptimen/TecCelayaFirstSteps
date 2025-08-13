import Button from "@mui/material/Button";
import { DataStore } from "aws-amplify/datastore";
import { Todo } from "./models";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function App() {
  const [data, setData] = useState([]);
  const [current_item, setCurrent_item] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const [editValues, setEditValues] = useState({ id: "", name: "", description: "" });

  useEffect(() => {
    queryTodo();
    const subscription = DataStore.observe(Todo).subscribe(() => {
      queryTodo();
    });
    return () => subscription.unsubscribe();
  }, []);

  async function queryTodo() {
    const models = await DataStore.query(Todo);
    setData(models);
  }

  async function deleteTodo(item) {
    try {
      await DataStore.delete(item);
    } catch (error) {
      console.log("Error al eliminar", error);
    }
  }

  function handleDeleteTodo(item) {
    deleteTodo(item);
  }

  async function handleConfirmEdit() {
    const original = await DataStore.query(Todo, editValues.id);
    await DataStore.save(
      Todo.copyOf(original, (updated) => {
        updated.name = editValues.name;
        updated.description = editValues.description;
      })
    );
    setOpenEdit(false);
    setEditValues({ id: "", name: "", description: "" });
  }

  return (
    <div className="App">
      
      <div style={{ margin: "20px" }}>
        <TextField
          label="Name"
          variant="outlined"
          value={current_item.name || ""}
          onChange={(e) =>
            setCurrent_item({ ...current_item, name: e.target.value })
          }
          style={{ marginRight: "10px" }}
        />
        <TextField
          label="Description"
          variant="outlined"
          value={current_item.description || ""}
          onChange={(e) =>
            setCurrent_item({ ...current_item, description: e.target.value })
          }
          multiline
          minRows={2}
          maxRows={10}
          style={{ marginRight: "10px", width: "300px" }}
        />
        <Button
          variant="contained"
          onClick={async () => {
            const defaultName = "Crear Pagina Web";
            const defaultDescription =
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

            await DataStore.save(
              new Todo({
                name: current_item.name?.trim() || defaultName,
                description:
                  current_item.description?.trim() || defaultDescription,
              })
            );

            setCurrent_item({});
          }}
        >
          Create
        </Button>
      </div>

     
      <Grid container spacing={2}>
        {data.map((todo) => (
          <Grid item xs={6} md={4} key={todo.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {todo.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                >
                  {todo.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    setEditValues({
                      id: todo.id,
                      name: todo.name,
                      description: todo.description,
                    });
                    setOpenEdit(true);
                  }}
                >
                  Edit
                </Button>
                <Button size="small" onClick={() => handleDeleteTodo(todo)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal de edición */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Editar Tarjeta</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Name"
            value={editValues.name}
            onChange={(e) =>
              setEditValues({ ...editValues, name: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="dense"
            label="Description"
            value={editValues.description}
            onChange={(e) =>
              setEditValues({ ...editValues, description: e.target.value })
            }
            multiline
            minRows={2}
            maxRows={10}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleConfirmEdit}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
