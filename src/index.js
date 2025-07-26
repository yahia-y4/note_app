import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { NotesProvider } from './contexts/NoteContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<NotesProvider>
   <App />
</NotesProvider>
   

);

