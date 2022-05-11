import { useContext, useState } from 'react';
import { TodoContext } from '../context/todo';
import Button from './Button';

const TodoForm = ({ edit = false }) => {
  const { createTodo } = useContext(TodoContext);
  const [text, setText] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    if (!text) return;

    await createTodo(text);

    return setText('');
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Enter new todo...'
          value={text}
          onChange={({ target: { value } }) => setText(value)}
        />
        <Button
          type='submit'
          text={edit ? 'Update' : 'Create'}
          color='green'
          disabled={!text}
        />
      </form>
    </>
  );
};

export default TodoForm;
