import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
// import heroPic from './assets/home-hero.webp';
import ExpertPrivateRoute from './hooks/ExpertPrivateRoute';
import CustomerPrivateRoute from './hooks/CustomerPrivateRoute';
import PublicRoute from './hooks/PublicRoute';
import useAuthCheck from './hooks/useAuthCheck';
import ExpertDasboard from './routes/ExpertPanel';
import CustomerDasboard from './routes/CustomerPanel/Dasboard';
import ExpertList from './routes/CustomerPanel/ExpertList/Index';
import ExpertProfile from './routes/CustomerPanel/ExpertList/ExpertProfile';
import RequestedCustomers from './routes/ExpertPanel/RequestedCustomers/RequestedCustomers';
import ApprovedCustomers from './routes/ExpertPanel/ApprovedCustomers/ApprovedCustomers';
import Articles from './routes/CustomerPanel/Articles/Articles';
import ArticleForm from './routes/ExpertPanel/ArticleForm/ArticleForm';

// function App() {
//   return (
//     <div
//       className='hero min-h-screen'
//       style={{
//         backgroundImage: `url(${heroPic})`,
//       }}
//     >
//       <div className='hero-overlay bg-opacity-60'></div>
//       <div className='hero-content text-center text-neutral-content'>
//         <div className='max-w-md'>
//           <h1 className='mb-5 text-5xl font-bold text-slate-300'>Money Loan</h1>
//           <p className='mb-5'>Find your opportunity here.</p>
//           <a
//             href='https://1m6qpn06wrf.typeform.com/to/KYdrE6sj'
//             className='px-6 py-3 bg-slate-800 hover:bg-slate-500 text-slate-100 hover:text-slate-950 border-2 border-slate-200 hover:border-slate-400 rounded'
//           >
//             Get Started
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }
function App() {
  const authChecked = useAuthCheck();
  return !authChecked ? (
    <div>Loading...</div>
  ) : (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route
          index
          path='/login'
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path='/expert/dashboard'
          element={
            <ExpertPrivateRoute>
              <ExpertDasboard />
            </ExpertPrivateRoute>
          }
        />
        <Route
          path='/expert/requests'
          element={
            <ExpertPrivateRoute>
              <RequestedCustomers />
            </ExpertPrivateRoute>
          }
        />
        <Route
          path='/expert/scheduled'
          element={
            <ExpertPrivateRoute>
              <ApprovedCustomers />
            </ExpertPrivateRoute>
          }
        />
        <Route
          path='/expert/create_article'
          element={
            <ExpertPrivateRoute>
              <ArticleForm />
            </ExpertPrivateRoute>
          }
        />
        <Route
          path='/customer/dashboard'
          element={
            <CustomerPrivateRoute>
              <CustomerDasboard />
            </CustomerPrivateRoute>
          }
        />
        <Route
          path='/customer/expert-list'
          element={
            <CustomerPrivateRoute>
              <ExpertList />
            </CustomerPrivateRoute>
          }
        />
        <Route
          path='/customer/expert/:id'
          element={
            <CustomerPrivateRoute>
              <ExpertProfile />
            </CustomerPrivateRoute>
          }
        />
        <Route
          path='/customer/articles'
          element={
            <CustomerPrivateRoute>
              <Articles />
            </CustomerPrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
