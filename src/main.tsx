import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";

import { store, persistor } from "@/store";

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={<>is loading</>} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </StrictMode>,
)
