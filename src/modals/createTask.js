import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CreateTaskPopup = ({ modal, toggle, save }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("today");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "taskName") {
      setTaskName(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "date") {
      setDate(value);
    } else if (name === "status") {
      setStatus(value);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    let taskObj = {};
    taskObj["Name"] = taskName;
    taskObj["Description"] = description;
    taskObj["date"] = date;
    taskObj["status"] = status;
    save(taskObj);
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create Task</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Task Name</label>
          <input
            type="text"
            className="form-control"
            value={taskName}
            onChange={handleChange}
            name="taskName"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            rows="5"
            className="form-control"
            value={description}
            onChange={handleChange}
            name="description"
          ></textarea>
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={handleChange}
            name="date"
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select
            className="form-control"
            value={status}
            onChange={handleChange}
            name="status"
          >
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>
          Create
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateTaskPopup;
