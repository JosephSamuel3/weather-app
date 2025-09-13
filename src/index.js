import "./styles.css";
import RenderUI from './modules/initializeApp.js';
import fetchData from './modules/fetch.js';

const rootElement = document.getElementById('app');
const app = new RenderUI(rootElement);
app.initialize();

