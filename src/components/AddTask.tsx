import React, { useState } from "react";
import { Input, Button, Form } from "antd";
import { useTodoContext } from "../context/TodoContext";

const AddTask: React.FC = () => {
  const { addTask } = useTodoContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (name.trim() && description.trim()) {
      addTask(name, description);
      setName("");
      setDescription("");
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Task Name" required>
        <Input
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          placeholder="Enter task name"
        />
      </Form.Item>
      <Form.Item label="Description" required>
        <Input
          value={description}
          onChange={(e: any) => setDescription(e.target.value)}
          placeholder="Enter task description"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Task
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddTask;
