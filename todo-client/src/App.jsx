// function App() {
//   return (
//     <div>
//       <h1>Todo List Application</h1>
//       <p>React is working!</p>
//     </div>
//   );
// }

// export default App;

import TodoList from "./components/TodoList.jsx";
import "./App.css";

function App() {
  return (
    <div>
      <TodoList />
    </div>
  );
}

export default App;