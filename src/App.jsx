import Player from './components/Player.jsx';
import TimberChallenge from './components/TimberChallenge.jsx';

function App() {
  return (
    <>
      <Player />
      <div id="challenges">
        <TimberChallenge  title={'Easy'} targetTime={1}/>
        <TimberChallenge  title={'Not Easy'} targetTime={5}/>
        <TimberChallenge  title={'Getting tough'} targetTime={10}/>
        <TimberChallenge  title={'Pros only'} targetTime={15}/>
      </div>
    </>
  );
}

export default App;
