import './App.css';
import Maze from './Maze';

function App() {
  const w = 4;
  const h = 3;
  // array length h, string length w-1
  const wallRight = ['##.', '..#', '###'];
  // array length h-1, string length w
  const wallBottom = ['#.#.', '...#'];

  return (
    <section>
      <h1>maze</h1>
      hello
      <main>
        <p>The maze is surrounded by walls</p>
        <Maze {...{ wallBottom, wallRight, w, h }} />
      </main>
    </section>
  );
}

export default App;
