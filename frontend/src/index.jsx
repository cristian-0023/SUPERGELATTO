import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="692490404686-agaick8qsofbhnn60avmug07cb2l0k0g.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);


