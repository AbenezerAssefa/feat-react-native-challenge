import React, { useEffect, useState } from "react";
import CreateTask from "../modals/createTask";
import Card from "./Card";

const groupTasksByDate = (tasks) => {
  const groupedTasks = {
    today: [],
    tomorrow: [],
    upcoming: [],
    completed: [],
  };

  const today = new Date().toLocaleDateString();
  const tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);
  const tomorrowDateString = tomorrow.toLocaleDateString();

  tasks.forEach((task) => {
    const taskDate = new Date(task.date).toLocaleDateString();

    if (taskDate === today) {
      groupedTasks.today.push(task);
    } else if (taskDate === tomorrowDateString) {
      groupedTasks.tomorrow.push(task);
    } else if (new Date(task.date) > tomorrow) {
      groupedTasks.upcoming.push(task);
    } else {
      groupedTasks.completed.push(task);
    }
  });

  return groupedTasks;
};

const TodoList = () => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [groupedTasks, setGroupedTasks] = useState({
    today: [],
    tomorrow: [],
    upcoming: [],
    completed: [],
  });
  useEffect(() => {
    let arr = localStorage.getItem("taskList");

    if (arr) {
      let obj = JSON.parse(arr);
      setTaskList(obj);
      setGroupedTasks(groupTasksByDate(obj)); // Initialize groupedTasks
    }
  }, []);

  const deleteTask = (index) => {
    let tempList = taskList.slice();
    tempList.splice(index, 1);
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
    setGroupedTasks(groupTasksByDate(tempList)); // Update groupedTasks
  };

  const updateListArray = (obj, index) => {
    let tempList = taskList.slice();
    const originalDate = tempList[index].date; // Save the original date
    tempList[index] = obj;
    tempList[index].date = originalDate; // Restore the original date
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
    setGroupedTasks(groupTasksByDate(tempList)); // Update groupedTasks
  };

  const toggle = () => {
    setModal(!modal);
  };

  const saveTask = (taskObj) => {
    let tempList = taskList.slice();
    tempList.push(taskObj);
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
    setModal(false);
    setGroupedTasks(groupTasksByDate(tempList)); // Update groupedTasks
  };

  return (
    <>
      <div className="header text-center">
        <h3>Todo List</h3>
        <button className="btn btn-primary mt-2" onClick={() => setModal(true)}>
          Create Task
        </button>
      </div>
      <div className="task-container">
        <div className="task-list">
          <h4>Today</h4>
          {groupedTasks.today.map((obj, index) => (
            <Card
              key={index}
              taskObj={obj}
              index={index}
              deleteTask={deleteTask}
              updateListArray={updateListArray}
            />
          ))}
        </div>
        <div className="task-list">
          <h4>Tomorrow</h4>
          {groupedTasks.tomorrow.map((obj, index) => (
            <Card
              key={index}
              taskObj={obj}
              index={index}
              deleteTask={deleteTask}
              updateListArray={updateListArray}
            />
          ))}
        </div>
        <div className="task-list" style={{ marginBottom: "20px" }}>
          <h4>Upcoming</h4>
          {groupedTasks.upcoming.map((obj, index) => (
            <Card
              key={index}
              taskObj={obj}
              index={index}
              deleteTask={deleteTask}
              updateListArray={updateListArray}
            />
          ))}
        </div>
        <div className="task-list">
          <h4>Completed</h4>
          {groupedTasks.completed.map((obj, index) => (
            <Card
              key={index}
              taskObj={obj}
              index={index}
              deleteTask={deleteTask}
              updateListArray={updateListArray}
            />
          ))}
        </div>
      </div>
      <CreateTask toggle={toggle} modal={modal} save={saveTask} />
    </>
  );
};

export default TodoList;
