import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.min.css';

export default createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
    background: #ddd;
  }

  #root {
    min-height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased !important;
    text-rendering: optimizeLegibility !important;
  }

`;
