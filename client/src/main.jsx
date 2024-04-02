import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App.jsx'
import './index.css'
import { store, persistor } from './redux/store.js'
import ThemeProvider from './components/ThemeProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
	<PersistGate persistor={persistor}>
		<Provider store={store}>
			<ThemeProvider>
				<App />
			</ThemeProvider>
		</Provider>
	</PersistGate>
)
