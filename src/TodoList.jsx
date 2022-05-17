import { Checkbox, ListItem, ListItemButton, ListItemText } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import Web3 from 'web3'


const TodoList = (props) => {

  const [checked, setChecked] = React.useState([0]);
  const [tasks, setTasks] = React.useState([0])
  const inputTask = useRef(null)

  const handleToggle = (value, id) => {
    console.log(Web3.utils.toBN(id).toString(), 1)

    props.toggleCompleted(Web3.utils.toBN(id).toString(), 1)


    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  }
  useEffect(() => {
    setTasks(props.tasks)
  }, [props])

  return (

    <div id="content">
      
      <form onSubmit={(event) => {
        event.preventDefault()
        console.log(inputTask.current.value)
        props.createTask(inputTask.current.value.toString(), '', 0, 1)
        
      }}>
        <input
          id="newTask"
          ref={inputTask}
          type="text"
          className="form-control"
          placeholder="Create Task"
          required />
        <input type="submit" hidden={true} />
      </form>


      <ul id="taskList" className="list-unstyled">{tasks.map((task, value) => (
        <div className="taskTemplate" key={value}>
          <ListItem>
            <ListItemButton role={undefined} onClick={() => handleToggle(value, task.id)} dense>
              <Checkbox
                edge="start"
                checked={task.completed}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': `checkbox-list-label-${value}` }}
              />
              <ListItemText id={`checkbox-list-label-${value}`} className="content">{task.name}</ListItemText>
            </ListItemButton>
          </ListItem>
        </div>
      ))}
      </ul>
      <ListItemText id="completedTaskList" />
    </div>
  );

}

export default TodoList;
