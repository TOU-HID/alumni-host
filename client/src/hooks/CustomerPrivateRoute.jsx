import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from './useAuth';

function CustomerPrivateRoute({ children }) {
	const role = useAuth()
	// console.log(role)

	return role === 'customer' ? children : <Navigate to='/login' />
}

export default CustomerPrivateRoute
