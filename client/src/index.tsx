import {createRoot} from "react-dom/client";
import App from "./App";
import ThemeProvider from "./theme/ThemeProvider";
import {BrowserRouter} from "react-router-dom";

const container = document.getElementById('root')

if (!container) {
  throw new Error('root is undefined')
}

const root = createRoot(container)

root.render(
  <BrowserRouter>
    <ThemeProvider>
      <App/>
    </ThemeProvider>
  </BrowserRouter>
)