import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Provider } from 'react-redux';
import { persistor, store } from './app/store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@emotion/react';
import { onError } from '@apollo/client/link/error';
import theme from './theme.ts';
import { CustomGraphQLError } from './types/apollo_client.types.ts';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors as CustomGraphQLError[]) {

      const code = err?.code || err.extensions?.code;
      console.log(code);
      // if (code === 'UNAUTHENTICATED') {
      //   localStorage.removeItem('persist:user');
      //   window.location.href = '/appuser/dashboard';
      // } else {
      //   console.error(`GraphQL error [${code}]:`, err.message);
      // }
    }
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',
});

const authLink = setContext((request, { headers }) => {
  const persistUser: string = localStorage.getItem('persist:user') || ""
  let token = persistUser == "" ? "" : JSON.parse(persistUser).access_token;
  token = token.slice(1, -1);

  const requiresAuth = request?.variables?.requiresAuth !== false;

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
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
