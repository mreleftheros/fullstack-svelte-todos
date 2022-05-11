import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import { TodoContext } from '../context/todo';
import TodoForm from '../lib/TodoForm';
import Todos from '../lib/Todos';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { todos, getTodos } = useContext(TodoContext);

  useEffect(() => {
    getTodos();
  }, []);

  if (!user) return <Navigate to='/login' />;

  return (
    <section className='dashboard'>
      <h2 className='dashboard-title'>{user.username}'s todos</h2>
      <div className='dashboard-form'>
        <TodoForm />
      </div>
      {!!todos.length ? (
        <Todos todos={todos} />
      ) : (
        <p className='dashboard-text'>No todos...</p>
      )}
    </section>
  );
};

export default Dashboard;
