import React, { useState } from 'react'
import './TodoList.css';
import{BiCheckDouble, BiEdit, BiTrash, BiCheckCircle, BiReset, BiRefresh} from 'react-icons/bi';
 
function TodoList() {
    const[todos, setTodos] = useState([])
    const[inputvalue, setInputValue] =useState('')
    const[editIndex, setEditIndex] =useState(-1)
    
    const addTodo =() => {
        if(inputvalue.trim() !== '')
        {
            if(editIndex !== -1)
            {
                const updatedTodos=[...todos]
                updatedTodos[editIndex] = {task: inputvalue, completed: updatedTodos[editIndex].completed}
                setTodos(updatedTodos)
                setInputValue('')
                setEditIndex(-1)
            }
            else{
                setTodos([...todos, {task: inputvalue, completed: false}])
                setInputValue('')
            }
        }
    }
     
    const startEdit  =(index) => {
        setInputValue(todos[index].task)
        setEditIndex(index)
    }
    const cancelEdit = () => {
        setInputValue('')
        setEditIndex(-1)
    }
    const removeTodo =(index)=>{

        const updatedTodos=todos.filter((_, i) => i !==index)
        setTodos(updatedTodos)

    }
    const toggleCompleted = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].completed= !updatedTodos[index].completed;
        setTodos(updatedTodos);
    }

  return (
    
    <div className="todo-container">
        <h1>Todo List</h1>
        <div className="input-section">
            <input type="text" value={inputvalue} onChange={(e) => setInputValue(e.target.value)} 
            placeholder='Enter new task' className="input-field" />
           
           {editIndex !== -1 ? ( 
           <>
            <button  onClick={addTodo} className="update-btn"><BiCheckDouble/></button>
            <button  onClick={cancelEdit} className="cancel-btn"><BiRefresh/></button>
            </>
            ):
            
            (

            <button  onClick={addTodo} className="add-btn">Add</button>
            )}
            
           
            
        </div>
        <ul className="todo-list">
            { todos.map((todo, index) => (
                <li key={index} className={todo.completed ? 'completed' : ''}>
                    {todo.task}
                     <div className="btn-group">
                        <button onClick={() => startEdit(index)} className="btn-edit"><BiEdit /></button>
                        <button onClick={() => removeTodo(index)} className="btn-remove"><BiTrash /></button>
                        <button className="btn-done" onClick={()=> toggleCompleted(index)}>
                            {todo.completed ? <BiCheckCircle/> : <BiReset />  }
                        </button>

                    </div>

                </li>
            ))

            }

        </ul>

    </div>
  )
}

export default TodoList
