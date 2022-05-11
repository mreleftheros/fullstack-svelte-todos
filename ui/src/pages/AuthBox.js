import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth';
import Button from '../lib/Button';
import { Navigate, Link } from 'react-router-dom';

const AuthBox = ({ signupMode = false }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { user, signup, login } = useContext(AuthContext);

  const resetErrors = () => {
    setError('');
    setUsernameError('');
    setPasswordError('');
  };

  useEffect(() => {
    setUsername('');
    setPassword('');
  }, [signupMode]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!username || !password) return;

    resetErrors();
    setIsLoading(true);

    if (signupMode) {
      try {
        const data = await signup(username, password);

        if (data.usernameError) setUsernameError(data.usernameError);
        if (data.passwordError) setPasswordError(data.passwordError);
        if (data.error) {
          setError(data.error);
        } else {
          setUsername('');
          setPassword('');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const data = await login(username, password);

        if (data.error) {
          setError(data.error);
        } else {
          setUsername('');
          setPassword('');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (user) return <Navigate to='/dashboard' />;

  return (
    <section className='auth'>
      <h2 className='auth-title'>{signupMode ? 'Sign up' : 'Login'}</h2>
      <form
        className='auth-form'
        autoComplete='off'
        onSubmit={handleSubmit}
        onBlur={resetErrors}
      >
        <div className='auth-group'>
          <label className='auth-label' htmlFor='username'>
            Username
          </label>
          <input
            autoFocus
            className='auth-input'
            type='text'
            placeholder='Enter username...'
            value={username}
            onChange={({ target: { value } }) => setUsername(value)}
          />
          <p className='auth-error'>{usernameError}</p>
        </div>
        <div className='auth-group'>
          <label className='auth-label' htmlFor='password'>
            Password
          </label>
          <input
            className='auth-input'
            type='password'
            placeholder='Enter password...'
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
          />
          <p className='auth-error'>{passwordError}</p>
        </div>
        <div className='auth-cta'>
          <Button
            text={isLoading ? 'Loading...' : signupMode ? 'Sign up' : 'Login'}
            color='greenish'
            type='submit'
            disabled={!username || !password || isLoading}
          />
          {signupMode ? (
            <p className='auth-reminder'>
              Already a member? <Link to='/login'>Login</Link>
            </p>
          ) : (
            <p className='auth-reminder'>
              Don't have an account yet? <Link to='/signup'>Sign up</Link>
            </p>
          )}
          <p className='auth-error'>{error}</p>
        </div>
      </form>
    </section>
  );
};

export default AuthBox;
