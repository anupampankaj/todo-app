import React, { useState } from "react";
import { Table, Button, Checkbox, Input } from "antd";
import { useTodoContext } from "../context/TodoContext";
import { Task } from "../context/TodoContext";

const TodoTable: React.FC = () => {
  const { tasks, toggleComplete, deleteTask, editTask } = useTodoContext();
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  const startEditing = (task: Task) => {
    setEditingTaskId(task.id);
    setEditedName(task.name);
    setEditedDescription(task.description);
  };

  const saveEdit = () => {
    if (editingTaskId && editedName.trim() && editedDescription.trim()) {
      editTask(editingTaskId, editedName, editedDescription);
      cancelEdit();
    }
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditedName("");
    setEditedDescription("");
  };

  const columns = [
    {
      title: "Task Name",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: Task) =>
        editingTaskId === record.id ? (
          <Input
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        ) : (
          record.name
        ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (_: any, record: Task) =>
        editingTaskId === record.id ? (
          <Input
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
        ) : (
          record.description
        ),
    },
    {
      title: "Completed",
      dataIndex: "completed",
      key: "completed",
      render: (completed: boolean, record: Task) => (
        <Checkbox
          checked={completed}
          onChange={() => toggleComplete(record.id)}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Task) =>
        editingTaskId === record.id ? (
          <>
            <Button type="link" onClick={saveEdit}>
              Save
            </Button>
            <Button type="link" onClick={cancelEdit}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button type="link" onClick={() => startEditing(record)}>
              Edit
            </Button>
            <Button danger onClick={() => deleteTask(record.id)}>
              Delete
            </Button>
          </>
        ),
    },
  ];

  return <Table dataSource={tasks} columns={columns} rowKey="id" />;
};

export default TodoTable;
