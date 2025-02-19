import logo from './logo.svg';
import './App.css';
import { gql, useQuery } from '@apollo/client';

const GET_TODOS = gql`
  query GetTodosWithUser {
    getTodos {
      id
      title
      completed
      user{
        id
        name
      }
      
    }
  }
`;


function App() {
const {data,loading} = useQuery(GET_TODOS)
if(loading) return <h1>Loding</h1>

  return (
    <div className="App">
    <table>
      <tbody>
          {data.getTodos.map((todo)=>(
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
            </tr>
          ))}
      </tbody>
    </table>
    </div>
  );
}

export default App;
