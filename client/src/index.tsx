import {createRoot} from "react-dom/client";
import App from "./App";
import ThemeProvider from "./theme/ThemeProvider";

const container = document.getElementById('root')

if (!container) {
  throw new Error('root is undefined')
}

const root = createRoot(container)

root.render(
  <ThemeProvider>
    <App/>
  </ThemeProvider>
)