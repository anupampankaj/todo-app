import React from "react";
import { TodoProvider } from "./context/TodoContext";
import AddTask from "./components/AddTask";
import TodoTable from "./components/TodoTable";
import { Layout } from "antd";

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <TodoProvider>
      <Layout style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
        <h1>Todo App</h1>
        <Content style={{ marginTop: "20px" }}>
          <AddTask />
          <TodoTable />
        </Content>
      </Layout>
    </TodoProvider>
  );
};

export default App;
