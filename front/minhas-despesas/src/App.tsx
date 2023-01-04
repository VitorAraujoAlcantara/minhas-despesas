import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import './App.css';
import AppRoutes from './routes';
import store from './store/store';
import { 
  defaultTheme, 
  // greenTheme , 
  // royalTheme
} from './theme';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <AppRoutes />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
