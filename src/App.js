import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
   faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {


  const[toDo, setToDo] = useState([]);

  const[newTask, setNewTask] = useState('');
  const[updateData, setUpdateData] = useState('');

  const addTask = () => {
    if(newTask){
      let num = toDo.length+1;
      let newEntry = { id:num, title: newTask , status: false}
      setToDo([...toDo , newEntry])
      setNewTask('');
    }

  }

  const deleteTask = (id) => {
    let newTasks = toDo.filter(task => task.id !== id)
    setToDo(newTasks);
    
  }
  
  

  const cancelUpdate = () => {
    setUpdateData('');

  }

  const changeTask = (e) => {
    let newEntry = {
      id : updateData.id,
      title : e.target.value,
      status : updateData.status ? true : false
    }
    setUpdateData(newEntry);
    
  }

  const updateTask = (id) => {
    let filterRecords = [...toDo].filter(task => task.id !== updateData.id);
    let updatedObject = [...filterRecords , updateData]
    setToDo(updatedObject);
    setUpdateData('');
    
  }

  return (
    <div className="container App">
      <br></br>
      <h2>ToDo List </h2>
      <br></br>

      {updateData && updateData ? (
        <>
        <div className='row'>
        <div className='col'>
          <input value={updateData && updateData.title} onChange={(e) => changeTask(e)} className='form-control form-control-lg'></input>
        </div>
        <div className='col-auto'>
          <button onClick={updateTask} className='btn btn-lg btn-success mr-20'>Update</button>
          <button onClick={cancelUpdate} className='btn btn-lg btn-warning'>Cancel</button>
        </div>
      </div>
      <br></br>
          
        </>

      ) : (
        <>
          <div className='row'>
        <div className='col'>
          <input placeholder='Add task...' value={newTask} onChange={(e) => setNewTask(e.target.value)} className='form-control form-control-lg'></input>
        </div>
        <div className='col-auto'>
          <button onClick={addTask} className='btn btn-lg btn-success'>Add Task</button>
        </div>
      </div>
      <br></br>
        </>
      )}

      

      {toDo && toDo.length ? '' : 'No Tasks...'}

      {toDo && toDo
      .sort((a,b) => a.id > b.id ? 1:-1)
      .map((task , index) => {
        return(
          <React.Fragment key={task.id}>
            <div className='col taskBg'>
              <div className={task.status ? 'done' : ''}>
              <span className='taskNumber'>{index+1}</span>
              <span className='taskText'>{task.title}</span>
              </div>
              <div className='iconsWrap'>
                
                {task.status ? null : (
                  <span title='Edit' onClick={()=> setUpdateData({
                    id : task.id,
                    title: task.title,
                    status: task.status ? true : false
                  })}>
                    <FontAwesomeIcon icon = {faPen} />
                  </span>
                )}
                <span onClick={() => deleteTask(task.id)} title='Delete'>
                <FontAwesomeIcon icon = {faTrashCan} />
                </span>
              </div>
            </div>
            
          </React.Fragment>
        )
      })}
    </div>
  );
}

export default App;
