import { render } from 'solid-js/web';
import App from './App';
import './index.css';
import './shared/theme'; // применяет сохранённую тему до первого рендера

const root = document.getElementById('root');
if (!root) throw new Error('Root not found');
if (typeof window !== 'undefined' && window.location.search.includes('mobile=1')) {
  document.body.classList.add('mobile-sim');
}
render(() => <App />, root);
