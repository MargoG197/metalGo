import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TodoContext } from "./context/todoContext";
import { toggleTask, removeTask }  from "./redux/actions/actions.ts";


function App() {
  const { todos } = useContext(TodoContext);
  const [openTodo, setOpenTodo] = useState<boolean[]>([
    ...Array(todos.length).fill(false),
  ]);


  const dispatch = useDispatch();

  return (
    <div className="page">
      <div className="title">
        <Typography variant="h5" component="div">
          Задачи на сегодня!
        </Typography>
      </div>
      <div className="buttonsDiv">
        <Button variant="contained">Добавить задачу</Button>
        {/* <Button variant="outlined">Добавить задачу</Button> */}
      </div>

      <div className="todoBlock">
        {todos.map((i, index) => (
          <div key={index}>
            <Box sx={{ maxWidth: 400 }}>
              <Card variant="outlined">
                <React.Fragment>
                  <CardContent>
                    <Typography
                      gutterBottom
                      sx={{ color: "text.secondary", fontSize: 14 }}
                    >
                      Todo #{i.id}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {i.title}
                    </Typography>
                    {/* <Typography variant="body2">{i.completed}</Typography> */}
                  </CardContent>
                  <CardActions>
                    <div className="formActions">
                      <FormGroup>
                        <FormControlLabel
                         onChange={()=>dispatch(toggleTask(i.id))}
                          control={<Checkbox />}
                          label="Отметить выполненной"
                        />
                      </FormGroup>
                      <div className="buttonsDiv smallBtns">
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => {}}
                        >
                          Открыть задачу
                        </Button>
                        <Button
                          size="small"
                          variant="text"
                          onClick={() =>
                            setOpenTodo((prev) =>
                              prev.map((isOpen, idx) =>
                                idx === index ? (isOpen ? false : true) : isOpen
                              )
                            )
                          }
                        >
                          Удалить задачу
                        </Button>
                      </div>
                    </div>
                  </CardActions>
                </React.Fragment>
              </Card>
            </Box>
            <Dialog
              open={openTodo[index]}
              onClose={() =>
                setOpenTodo((prev) =>
                  prev.map((isOpen, idx) =>
                    idx === index ? (isOpen ? false : true) : isOpen
                  )
                )
              }
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Удалить задачу #{i.id}?
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {i.title}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() =>
                    setOpenTodo((prev) =>
                      prev.map((isOpen, idx) =>
                        idx === index ? (isOpen ? false : true) : isOpen
                      )
                    )
                  }
                >
                  Отменить
                </Button>
                <Button
                  onClick={() => {
                   dispatch(removeTask(i.id))
                    setOpenTodo((prev) =>
                      prev.map((isOpen, idx) =>
                        idx === index ? (isOpen ? false : true) : isOpen
                      )
                    );
                  }}
                  autoFocus
                >
                  Удалить
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
