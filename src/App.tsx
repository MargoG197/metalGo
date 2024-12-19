import React, { useState, useEffect } from "react";

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

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store/store.ts";
import { addTodo, removeTodo, setTodoStatus, presetInitialTodos } from './redux/todoSlice/todoSlice.ts';
import { TextField } from "@mui/material";

import { TTodoResponse, getAllTodos } from './api/todoApi.ts';
import mockArr from './api/Mock.ts';



function App() {

  
  const [todos, setTodos] = useState<TTodoResponse[]>(mockArr);/// если ответа от сервера не будет, берем данные из мокового массива
  const [todoDescription, setTodoDescription] = useState<string>("");/// запоминаем текст новой задачи
  const [openNoText, setOpenNoText] = useState(false)/// не отправляем новую задачу пока не будет текст задачи
  const [idNum, setIdNum] = useState(todos[todos.length - 1].id + 1 || 1);
  
  
  //React redux Hooks
  const todoList = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  
  async function requestEachTodo() {
    const idArr: number[] = [...Array(20).keys()];
    const todosArr: TTodoResponse[] = [];
    Promise.allSettled(
      idArr.map((id) => {
        return getAllTodos(id + 1);
      })
    )
      .then((responses) =>
        responses.forEach((result, num) => {
          if (result.status == "fulfilled") {
            todosArr.push(result.value);
          }
          if (result.status == "rejected") {
            console.log(`${num} todo was not fetched`);
          }
        })
      )
      .finally(() => {
        if (todosArr.length > 0) {
          console.log(todosArr)
          setTodos(todosArr);
        }
      });
  };
  
  useEffect(() => {
    requestEachTodo();
  }, []);

  
  useEffect(() => {
    function createTodos() {
      if (dispatch)
        dispatch(presetInitialTodos(todos))
    }
    createTodos()
  }, [todos, dispatch])



  return (
    <div className="page">
      <div className="title">
        <Typography variant="h5" component="div">
          Задачи на сегодня!
        </Typography>
      </div>
      <div className="buttonsDiv">
        <TextField variant="outlined" label="Добавить задачу" onChange={e => setTodoDescription(e.target.value)}
        value={todoDescription}
        />
        <Button variant="contained" onClick={() => {
          if (todoDescription.length > 0) {
          dispatch(addTodo({ title:todoDescription, id:idNum, completed:false}));
            setTodoDescription(""); 
          } else {
            setOpenNoText(true)
          }
          setIdNum(idNum+1)
        }
        }>Добавить задачу</Button>
      </div>
      <div className="todoBlock">
        {todoList.map((todo) => (
          <div key={todo.id}>
            <Box sx={{ maxWidth: 400 }}>
              <Card variant="outlined" >
               
                   <React.Fragment >
                  <CardContent>
                    <Typography
                      gutterBottom
                      sx={{ color: "text.secondary", fontSize: 14 }}>
                      Todo #{todo.id}
                    </Typography>
                    <Typography variant="h5" component="div" style={{textDecoration: todo.completed ? "line-through": "none"}}>
                      {todo.title}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <div className="formActions">
                      <FormGroup>
                          <FormControlLabel
                            onChange={(e) => {
                              e.stopPropagation();
                              dispatch(setTodoStatus({ id: todo.id, completed: !todo.completed }))
                            }}
                          control={<Checkbox
                          checked={todo.completed}
                          />}
                          value={todo.completed}
                          label="Отметить выполненной"
                        />
                      </FormGroup>
                      <div className="buttonsDiv smallBtns">
                          <Button
                            
                          size="small"
                          variant="contained"
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(removeTodo(todo))
                            }}
                        >
                          Удалить задачу
                        </Button>
                       
                        <Button
                            size="small"
                            variant="contained"
                              onClick={(e) => {
                                e.stopPropagation();
                                dispatch(removeTodo(todo))
                              }}
                          >
                         Открыть задачу
                        </Button>
                          
                      </div>
                    </div>
                  </CardActions>
                </React.Fragment>
             
               
              </Card>
            </Box>
          </div>
        ))}
      </div>
           <Dialog
              open={openNoText}
             onClose={() => setOpenNoText(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Ошибка!
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                Для добавления задачи, внесите ее в поле ввода.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setOpenNoText(false)}
                >
                  Ок
                </Button>
              </DialogActions>
            </Dialog>
    </div>
  );
}

export default App;
