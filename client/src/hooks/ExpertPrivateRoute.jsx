import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from './useAuth';

function ExpertPrivateRoute({ children }) {
	const role = useAuth()
	// console.log(role)

	return role === 'expert' ? children : <Navigate to='/login' />
}

export default ExpertPrivateRoute