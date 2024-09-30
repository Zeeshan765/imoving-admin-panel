import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import ECommerce from './pages/Dashboard/ECommerce';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import routes from './routes';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  let role = localStorage.getItem('role');

  const jwt = localStorage.getItem('jwt_access_token')

  let isAdmin =false

  if(jwt)
  {
    isAdmin = role === 'admin';
  }

  console.log('jwt', jwt,isAdmin)
  useEffect(() => {
    if (!isAdmin) {
      return navigate('/auth/signin');
    }
  }, [isAdmin]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route element={<DefaultLayout />}>
          <Route index element={<ECommerce />} />
          {isAdmin &&
            routes.map((routes, index) => {
              const { path, component: Component } = routes;
              return (
                <Route
                  key={index}
                  path={path}
                  element={
                    <Suspense fallback={<Loader />}>
                      <Component />
                    </Suspense>
                  }
                />
              );
            })}
        </Route>
      </Routes>
    </>
  );
}

export default App;
