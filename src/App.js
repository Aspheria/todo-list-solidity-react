import { Card, CardActionArea, CardContent, Paper, Typography } from '@mui/material'
import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config'
import TodoList from './TodoList'

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const network = await web3.eth.net.getNetworkType()
    console.log('network:', network)

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    console.log(accounts[0], 'accounts')

    const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS)
    console.log(todoList, 'todoList')

    this.setState({ todoList })
    const taskCount = await todoList.methods.taskCount().call()
    this.setState({ taskCount })

    for (var i = 1; i <= taskCount; i++) {
      const task = await todoList.methods.tasks(i).call()

      this.setState({ tasks: [] })
      this.setState({
        tasks: [...this.state.tasks, task]
      })
      console.log('tasks', task)
    }
    this.setState({ loading: false })

  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      taskCount: 0,
      tasks: [],
      loading: true
    }

    this.createTask = this.createTask.bind(this)
    this.toggleCompleted = this.toggleCompleted.bind(this)
  }

  createTask(name, content, phase, priority) {
    this.setState({ loading: true })
    this.state.todoList.methods.createTask(name, content, phase, priority).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
        document.location.reload(true)
      })
  }

  toggleCompleted(taskId, completed) {
    console.log('aaaaa', taskId, completed) //2 true
    this.setState({ loading: true })
    this.state.todoList.methods.toggleCompleted(taskId, completed).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
        document.location.reload(true)
      })
  }

  render() {
    return (
      <>
        <Card maxWidth="md">
          <Paper elevation={3} >
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Todo List
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <p>Your account: {this.state.account}</p>
                  <p>Task Count: {this.state.taskCount}</p>
                </Typography>

                <main role="main">
                  {this.state.loading
                    ? <div id="loader" className="text-center"><p className="text-center">Process</p></div>
                    : <TodoList
                      tasks={this.state.tasks}
                      createTask={this.createTask}
                      toggleCompleted={this.toggleCompleted} />
                  }
                </main>
              </CardContent>
            </CardActionArea>
          </Paper>

        </Card>
      </>
    );
  }
}

export default App;
