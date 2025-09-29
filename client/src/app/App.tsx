import './styles/index.scss';
import { AppRouter } from '@/app/providers/router';
import { NavBar } from '@/widgets/NavBar/';
import { Footer } from '@/shared/ui/Footer/Footer';

const App = () => {
  return (
    <div className="app">
      <NavBar />
      <AppRouter />
      <Footer />
    </div>
  );
};

export default App;
