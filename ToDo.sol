pragma experimental ABIEncoderV2;

contract ToDoList{
    struct Task
    {       
       uint date;
       string task;
       string content;
       bool isDone;
    }

   mapping (address => Task[]) private Users; 

   function CreateTask(string calldata _task) external
    {
    Users[msg.sender].push(Task({
        date: block.timestamp,
        task:_task,
        content: _task,
        isDone:false
        }));
    }

   function updateTask(uint256 _taskIndex,bool _status) external
    {
    Users[msg.sender][_taskIndex].isDone = _status;
    }

   function openTask(uint _taskIndex) external view returns (Task memory) {
       Task storage task = Users[msg.sender] [_taskIndex];
       return task;
   }

//    function listTasks() public constant return(Task[]) {
//        return task;
//    }

   
   function deleteTask(uint256 _taskIndex) external
   {
       delete Users[msg.sender] [_taskIndex];
   }

}