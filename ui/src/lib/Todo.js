import { useContext } from 'react';
import { TodoContext } from '../context/todo';
import Button from './Button';

const Todo = ({ _id, text, isDone }) => {
  const { deleteTodo } = useContext(TodoContext);

  return (
    <li className='todo'>
      <h3 className='todo-text'>{text}</h3>
      <div className='todo-tools'>
        <Button small text={isDone ? 'Uncheck' : 'Check'} color='greenish' />
        <Button small text='Edit' color='blueish' />
        <Button
          small
          text='Delete'
          color='error'
          onClick={() => deleteTodo(_id)}
        />
      </div>
    </li>
  );
};

export default Todo;
