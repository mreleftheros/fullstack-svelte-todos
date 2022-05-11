import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to='/login' />;

  return (
    <section>
      <article>
        <h2>Dashboard Page</h2>
        <p>{user.username}'s Todos</p>
      </article>
    </section>
  );
};

export default Dashboard;
