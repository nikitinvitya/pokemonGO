import './styles/index.scss'
import {AppRouter} from "@/app/providers/router";

const App = () => {
  return (
    <div className='app'>

      <AppRouter />
    </div>
  );
};

export default App;

// TODO: add eslint/stylelint,