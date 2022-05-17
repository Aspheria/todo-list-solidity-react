pragma solidity 0.5.16;

contract TodoList {
    uint256 public taskCount = 0; 

    enum TaskPhase {
        ToDo,
        Done,
        Canceled
    }

    struct Task {
        uint256 id;
        string name;
        string content;
        TaskPhase phase;
        // Priority 1-5: 1 higher, 5 less important
        uint256 priority;
        bool completed;
    }

    mapping(uint256 => Task) public tasks;

    event TaskCreated(
        uint256 id,
        string name,
        string content,
        TaskPhase phase,
        uint256 priority,
        bool completed
    );

    event ToggleCompleted(uint256 id, TaskPhase phase, bool completed);

    constructor() public {
        createTask(
            "first task added to the blockchain",
            "Task content 1",
            TaskPhase.Done,
            1
        );
        createTask(
            "add a task on the blockchain",
            "Task content 1",
            TaskPhase.ToDo,
            1
        );
    }

    function createTask(
        string memory _name,
        string memory _content,
        TaskPhase _phase,
        uint256 _priority
    ) public {
        taskCount++;
        tasks[taskCount] = Task(
            taskCount,
            _name,
            _content,
            _phase,
            _priority,
            false
        );
        emit TaskCreated(taskCount, _name, _content, _phase, _priority, false);
    }

    function toggleCompleted(uint256 _taskId, TaskPhase _phase) public {
        Task memory task = tasks[_taskId];
        task.completed = !task.completed;
        tasks[_taskId] = task;
        emit ToggleCompleted(_taskId, _phase, task.completed);
    }
}
