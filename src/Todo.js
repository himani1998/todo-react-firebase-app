import React, {useState } from 'react'
import "./Todo.css";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { Button} from '@material-ui/core';
import db from "./firebase";
import { List ,ListItem, ListItemText, ListItemAvatar,Modal,Input } from '@material-ui/core';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function Todo(props) {
    const classes= useStyles();
    const [open,setOpen]= useState(false);
    const [input,setInput]=  useState();
    
    const handleOpen= ()=>{
        setOpen(true);
        };
        const updateTodo = ()=>{
            db.collection('todos').doc(props.todo.id).set({
              todo:input
            }, {merge:true});

            setOpen(false);
        }
    
    

    return (
        <>
        <Modal
            open={open}
            onClose={e=> setOpen(false)}
        >
            <div className={classes.paper}>
                <h1>Edit Notes</h1>
                <Input placeholder= {props.todo.todo} value={input} onChange={event=> setInput(event.target.value)}/>
                <Button onClick={updateTodo}> Update Todo</Button>
            </div>
        </Modal>
        
        <List className="todo_list">
         <ListItem>
         <ListItemAvatar></ListItemAvatar>
             <ListItemText primary={props.todo.todo} secondary="Dummy deadline"/>
         </ListItem>
         <EditIcon onClick={e =>setOpen(true)}></EditIcon>
         <DeleteForeverIcon onClick= {event =>{
             db.collection('todos').doc(props.todo.id).delete()
         }}/>
        </List>
        </>
    );
        
        }
export default Todo;
