import './styles/index.scss';
import { AppRouter } from '@/app/providers/router';
import { NavBar } from '@/widgets/NavBar/ui/NavBar';

const App = () => {
  return (
    <div className="app">
      <NavBar />
      <AppRouter />
    </div>
  );
};

export default App;
