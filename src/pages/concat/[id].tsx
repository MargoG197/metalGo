// import React from 'react';
// import { useRouter } from 'next/router';
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Box from "@mui/material/Box";
// import CardActions from "@mui/material/CardActions";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import FormGroup from "@mui/material/FormGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import { UseSelector } from 'react-redux';
// import { AppDispatch, RootState } from "../../redux/store/store.ts";
// import { TTodoResponse } from '../../api/todoApi.ts';
// import { removeTodo, setTodoStatus } from './redux/todoSlice/todoSlice.ts';


// const ConcatId = () => {

//   const router = useRouter();
//   const { id } = router.query;


//   //React redux Hooks
//   const todoList = useSelector((state: RootState) => state);
//   const dispatch = useDispatch<AppDispatch>();


//   return (
//     <Box sx={{ maxWidth: 400 }}>
//               <Card variant="outlined" >
//                 <React.Fragment >
//                   <CardContent>
//                     <Typography
//                       gutterBottom
//                       sx={{ color: "text.secondary", fontSize: 14 }}>
//                       Todo #{todo.id}
//                     </Typography>
//                     <Typography variant="h5" component="div" style={{textDecoration: todo.completed ? "line-through": "none"}}>
//                       {todo.title}
//                     </Typography>
//                   </CardContent>
//                   <CardActions>
//                     <div className="formActions">
//                       <FormGroup>
//                       <FormControlLabel
//                          onChange={()=>dispatch(setTodoStatus({id: todo.id, completed: !todo.completed}))}
//                           control={<Checkbox
//                           checked={todo.completed}
//                           />}
//                           value={todo.completed}
//                           label="Отметить выполненной"
//                         />
//                       </FormGroup>
//                       <div className="buttonsDiv smallBtns">
//                         <Button
//                           size="small"
//                           variant="contained"
//                           onClick={()=>dispatch(removeTodo(todo))}
//                         >
//                           Удалить задачу
//                         </Button>
//                       </div>
//                     </div>
//                   </CardActions>
//                 </React.Fragment>
//               </Card>
//       </Box>

//   )
// }

// export default ConcatId;