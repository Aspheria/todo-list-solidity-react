
pragma solidity 0.5.16;

contract TodoList {
    uint public taskCount = 0; // state variable

    enum TaskPhase {ToDo, Done, Canceled}


    struct Task {
        uint id;
        string name;
        string content;
        TaskPhase phase;
        // Priority 1-5: 1 higher, 5 less important
        uint priority;
        bool completed;
    }

    mapping(uint => Task) public tasks;

    event TaskCreated(uint id, 
                      string name, 
                      string content, 
                      TaskPhase phase, 
                      uint priority, 
                      bool completed);

    event TaskCompleted(uint id, 
                      string name, 
                      string content, 
                      TaskPhase phase, 
                      uint priority, 
                      bool completed);

    constructor() public {
        createTask("first task added to the blockchain", "content", TaskPhase.Done, 1);
        createTask("add a task on the blockchain", "content", TaskPhase.ToDo, 1);

    }

    function createTask(string memory _name, string memory _content, TaskPhase _phase, uint _priority ) public {
        taskCount ++;
        tasks[taskCount] = Task(taskCount, _name, _content, _phase, _priority, false);
        emit TaskCreated(taskCount, _name, _content, _phase, _priority, false);
    }

    function toggleCompleted(uint _id, string memory _name, string memory  _content, TaskPhase _phase, uint _priority) public {
        Task memory _task = tasks[_id];
        _task.completed = !_task.completed;
        tasks[_id] = _task;
        emit TaskCompleted(_id, _name, _content, _phase, _priority, _task.completed);
    }
}


