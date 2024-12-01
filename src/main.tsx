import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Provider } from 'react-redux';
import { persistor, store } from './app/store.ts';
import { PersistGate } from 'redux-persist/integration/react';

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',
});

const authLink = setContext((request, { headers }) => {
  const token = localStorage.getItem('persist:user');

  const requiresAuth = request?.variables?.requiresAuth !== false; // Defaultnya true, jika false berarti tidak perlu auth
  console.log(requiresAuth)

  if (requiresAuth && token) {
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    };
  }

  return {
    headers: {
      ...headers,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
