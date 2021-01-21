import React,{ useEffect, useState } from 'react';
import Todo from "./Todo";
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import './App.css';
import db from './firebase';
import firebase from "firebase";

function App() {
  const[todos, setTodos]=useState([]);
  const[input,setInput]= useState('');

  useEffect(() => {
    //this code .. works whenever the app.js loads
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot=>{
      //console.log(snapshot.docs.map(doc=>doc.data())); // gives array of objects
     setTodos(snapshot.docs.map(doc=>({id:doc.id,todo:doc.data().todo})))
    })
  }, []);

  const addTodo =(event)=>{
   // this is going to fire off when we click the button
   event.preventDefault(); // will stop refreshing

   db.collection('todos').add({
     todo:input,
     timestamp: firebase.firestore.FieldValue.serverTimestamp()
   })

   setTodos([...todos,input]);
   setInput(''); // clearing up the input field after hitting submit
  }

  return (
    <div className="App">
      <h1>TODO APP</h1>
      <form>
      <FormControl>
      <InputLabel> Write a Todo</InputLabel>
      <Input value={input} onChange={event=>setInput(event.target.value)}/>
      </FormControl>
       
         <Button disabled= {!input} type="submit" variant="contained" color="primary" onClick={addTodo}>
         Add todo
         </Button>
       {/* <button type="submit" onClick={addTodo} > Add todo</button> */}
      </form>
      
      <ul>
        {todos.map(todo =>(
          <Todo todo= {todo}/>
          //<li>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
