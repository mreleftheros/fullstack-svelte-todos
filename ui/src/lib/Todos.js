import Todo from './Todo';

const Todos = ({ todos = [] }) => {
  return (
    <ul className='todos'>
      {todos.map(todo => (
        <Todo key={todo._id} {...todo} />
      ))}
    </ul>
  );
};

export default Todos;
