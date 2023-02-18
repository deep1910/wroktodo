import React from "react"
import './App.css';
import Form from "./components/Form";
import TodoList from "./components/TodoLIst";

//Notes
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import {data} from "./data"
import Split from "react-split"
import {nanoid} from "nanoid"





function App() {
  
  

  const [inputText, setInputText] = React.useState("");
  const [todos, setTodos] = React.useState(JSON.parse(localStorage.getItem("todos")) || []);
  const [status, setStatus] = React.useState("all")
  const [filterTodos, setFilteredTodos] = React.useState([]);


// React.useEffect(()=>{
//   // getLocalTodos()
   
//   // console.log(todoLocal)
// },[])




  React.useEffect(()=>{
    // console.log("hey")
    filterHandler();
    saveLocalTodos();
    // console.log()
  }, [todos ,status])


  const saveLocalTodos = ()=>{
      localStorage.setItem("todos", JSON.stringify(todos))
  
  }

  // const getLocalTodos = ()=>{
  //   if(localStorage.getItem("todos") === null){
  //     localStorage.setItem("todos", JSON.stringify([]))
  //   }else{
  //     let todoLocal = JSON.parse(localStorage.getItem("todos"));
  //     console.log(todoLocal)
  //     setTodos(todoLocal)
  //   }
  // }


  const filterHandler = ()=>{
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true))
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false ))  
        break;
      default:
        setFilteredTodos(todos);
        break;  
    }
  }




//Notes
  const [notes, setNotes] = React.useState([])
  const [currentNoteId, setCurrentNoteId] = React.useState(
      (notes[0] && notes[0].id) || ""
  )
  
  function createNewNote() {
      const newNote = {
          id: nanoid(),
          body: "# Type your markdown note's title here"
      }
      setNotes(prevNotes => [newNote, ...prevNotes])
      setCurrentNoteId(newNote.id)
  }
  
  function updateNote(text) {
      setNotes(oldNotes => oldNotes.map(oldNote => {
          return oldNote.id === currentNoteId
              ? { ...oldNote, body: text }
              : oldNote
      }))
  }
  
  function findCurrentNote() {
      return notes.find(note => {
          return note.id === currentNoteId
      }) || notes[0]
  }
  
///////////////////////////////////






  return (
    <div className="App">
      <header>
        <h1>Hello React</h1>
      </header>
      <Form todos={todos} setTodos={setTodos} setInputText={setInputText} inputText={inputText}  setStatus={setStatus}/>
      <TodoList  filterTodos={filterTodos}   todos={todos} setTodos={setTodos} />
      <div className="notes">


       {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
        }

      </div>



    </div>
  );
}

export default App;
