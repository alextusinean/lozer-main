import { Authenticated, Refine } from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';

import {
  ErrorComponent,
  RefineSnackbarProvider,
  ThemedLayoutV2,
  ThemedTitleV2,
  useNotificationProvider,
} from '@refinedev/mui';

import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import nestjsxCrudDataProvider from '@refinedev/nestjsx-crud';
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from '@refinedev/react-router';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
import { createAuthProvider } from './authProvider';
import { Header } from './components/header';
import { ColorModeContextProvider } from './contexts/color-mode';
import { GiPokerHand } from 'react-icons/gi';
import { FaArrowRightArrowLeft, FaUsers, FaMoneyCheckDollar, FaCashRegister, FaChartLine } from 'react-icons/fa6';
import { Reports } from './pages/reports';
import {
  ScratchersCreate,
  ScratchersEdit,
  ScratchersList,
  ScratchersShow,
} from './pages/scratchers';
import {
  UsersCreate,
  UsersEdit,
  UsersList,
  UsersShow,
} from './pages/users';
import {
  MovesCreate,
  MovesEdit,
  MovesList,
  MovesShow,
} from './pages/moves';
import {
  SalesCreate,
  SalesEdit,
  SalesList,
  SalesShow,
} from './pages/sales'; 
import { Login } from './pages/login';

function App() {
  const API_URL = 'https://espac.tusinean.ro/blozer';
  const dataProvider = nestjsxCrudDataProvider(API_URL);

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider}
              routerProvider={routerBindings}
              authProvider={createAuthProvider(API_URL)}
              resources={[
                {
                  name: 'moves',
                  list: '/moves',
                  create: '/moves/create',
                  edit: '/moves/edit/:id',
                  show: '/moves/show/:id',
                  meta: {
                    icon: <FaArrowRightArrowLeft />,
                  },
                },
                {
                  name: 'sales',
                  list: '/sales',
                  create: '/sales/create',
                  edit: '/sales/edit/:id',
                  show: '/sales/show/:id',
                  meta: {
                    icon: <FaCashRegister />,
                  },
                },
                {
                  name: 'reports',
                  list: '/reports',
                  meta: {
                    icon: <FaChartLine />,
                  },
                },
                {
                  name: 'scratchers',
                  list: '/scratchers',
                  create: '/scratchers/create',
                  edit: '/scratchers/edit/:id',
                  show: '/scratchers/show/:id',
                  meta: {
                    icon: <FaMoneyCheckDollar />,
                  },
                },
                {
                  name: 'users',
                  list: '/users',
                  create: '/users/create',
                  edit: '/users/edit/:id',
                  show: '/users/show/:id',
                  meta: {
                    icon: <FaUsers />,
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: 'yNJrfw-yMrwNN-X5ELM3',
                textTransformers: {
                  plural: (text) => text,
                  singular: (text) => text,
                },
                title: {
                  icon: <GiPokerHand />,
                  text: 'Lozer',
                },
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated
                      key='authenticated-inner'
                      fallback={<CatchAllNavigate to='/login' />}
                    >
                      <ThemedLayoutV2
                        Header={Header}
                        Title={({ collapsed }) => (
                          <ThemedTitleV2
                            collapsed={collapsed}
                            icon={<GiPokerHand />}
                            text='Lozer'
                          />
                        )}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route
                    index
                    element={<NavigateToResource resource='moves' />}
                  />
                  <Route path='/scratchers'>
                    <Route index element={<ScratchersList />} />
                    <Route path='create' element={<ScratchersCreate />} />
                    <Route path='edit/:id' element={<ScratchersEdit />} />
                    <Route path='show/:id' element={<ScratchersShow />} />
                  </Route>
                  <Route path='/sales'>
                    <Route index element={<SalesList />} />
                    <Route path='create' element={<SalesCreate />} />
                    <Route path='edit/:id' element={<SalesEdit />} />
                    <Route path='show/:id' element={<SalesShow />} />
                  </Route>
                  <Route path='/reports'>
                    <Route index element={<Reports API_URL={API_URL} />} />
                  </Route>
                  <Route path='/users'>
                    <Route index element={<UsersList />} />
                    <Route path='create' element={<UsersCreate />} />
                    <Route path='edit/:id' element={<UsersEdit />} />
                    <Route path='show/:id' element={<UsersShow />} />
                  </Route>
                  <Route path='/moves'>
                    <Route index element={<MovesList />} />
                    <Route path='create' element={<MovesCreate />} />
                    <Route path='edit/:id' element={<MovesEdit />} />
                    <Route path='show/:id' element={<MovesShow />} />
                  </Route>
                  <Route path='*' element={<ErrorComponent />} />
                </Route>
                <Route
                  element={
                    <Authenticated
                      key='authenticated-outer'
                      fallback={<Outlet />}
                    >
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route path='/login' element={<Login />} />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler
                handler={({ resource, action, params }) => {
                  let title = 'Lozer';
                  if (resource && action)
                    title = `${resource.label} | Lozer`;

                  return title;
                }}
              />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
