import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function PublicRoute({ children }) {
    const role = useAuth();

    return !role ? children : <Navigate to={`/${role}/dashboard`} />;
}
