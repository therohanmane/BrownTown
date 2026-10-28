// Privacy notice page: shared design system + fonts only. The notice is in
// English until approved Marathi/Hindi translations are supplied.
import '@fontsource-variable/inter';
import '@fontsource-variable/source-serif-4';
import './styles/main.css';
import './styles/doc.css';

document.documentElement.lang = 'en';
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
