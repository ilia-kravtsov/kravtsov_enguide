import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import { registerSW } from 'virtual:pwa-register';

// Register the service worker
const updateSW = registerSW({
    onNeedRefresh() {
        // Handle the event when a new service worker is available
        if (confirm('New content is available, click OK to refresh.')) {
            window.location.reload();
            updateSW(true);
        }
    },
    onOfflineReady() {
        // Handle the event when the app is ready to work offline
        alert('App is ready to work offline');
    },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)
