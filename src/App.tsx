
import { GameProvider, useGame } from './context/GameContext';
import Layout from './components/Layout';
import SetupPage from './pages/Setup';
import RoleRevealPage from './pages/RoleReveal';
import GameplayPage from './pages/Gameplay';
import VotingPage from './pages/Voting';
import ResultsPage from './pages/Results';

const GameContent = () => {
  const { gamePhase } = useGame();

  switch (gamePhase) {
    case 'setup':
      return <SetupPage />;
    case 'reveal':
      return <RoleRevealPage />;
    case 'discuss':
      return <GameplayPage />;
    case 'vote':
      return <VotingPage />;
    case 'results':
      return <ResultsPage />;
    default:
      return <SetupPage />;
  }
};

function App() {
  return (
    <GameProvider>
      <Layout>
        <GameContent />
      </Layout>
    </GameProvider>
  );
}

export default App;
