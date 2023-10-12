import './App.scss';
import { DFSGen, kruskalGen, primGen } from './generation/spanningTree';
import WrapMaze from './components/WrapMaze';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container className="mt-4 mb-4">
      <article>
        <h1 className="border-bottom border-3 border-primary border-opacity-25">
          Maze Generation Algorithm Visualization
        </h1>
        <section>
          <h2>Animations</h2>
          <main>
            <section className="card h-fitc">
              <div className="card-body">
                <h3 className="card-title">Prim's Algorithm</h3>
                <a href="#prim-details" className="link-secondary">
                  details
                </a>
                <WrapMaze gen={primGen} unique="prim" />
              </div>
            </section>
            <section className="card h-fitc">
              <div className="card-body">
                <h3 className="card-title">Kruskal's Algorithm</h3>
                <a href="#kruskal-details" className="link-secondary">
                  details
                </a>
                <WrapMaze gen={kruskalGen} unique="kruskal" />
              </div>
            </section>
            <section className="card h-fitc">
              <div className="card-body">
                <h3 className="card-title">DFS</h3>
                <a href="#dfs-details" className="link-secondary">
                  details
                </a>
                <WrapMaze gen={DFSGen} unique="dfs" />
              </div>
            </section>
          </main>
        </section>
        <section>
          <h2>Description</h2>
          <p>
            Maze can be generated with spanning tree using graph nodes
            representing grid.{' '}
            <a href="https://en.wikipedia.org/wiki/Maze_generation_algorithm">
              Maze Generation Algorithm - wikipedia
            </a>
          </p>
          <p>
            Some algorithms to find minimum spanning tree are Prim's algorithm
            and Kruskal's algorithm. Two of the examples are minimum spanning
            tree maze of random weights with the algorithms. You can see the
            difference of generation process.
          </p>
          <p>
            In addition, spanning tree can be found by random DFS with no loop.
            You can see the process of DFS and compare its result with minimum
            spanning tree algorithms'.
          </p>
        </section>
        <section>
          <h2>Implementation</h2>
          <section className="card">
            <div className="card-body">
              <h3 className="card-title" id="prim-details">
                Prim's Algorithm
              </h3>
            </div>
          </section>
          <section className="card">
            <div className="card-body">
              <h3 className="card-title" id="kruskal-details">
                Kruskal's Algorithm
              </h3>
            </div>
          </section>
          <section className="card">
            <div className="card-body">
              <h3 className="card-title" id="dfs-details">
                stack DFS
              </h3>
            </div>
          </section>
        </section>
        <aside className="border-top border-light-subtle border-3">
          <section>
            <h2>Reference</h2>
            <ul>
              <li>
                <cite>
                  <span className="text-body-secondary">(Japanese)</span>{' '}
                  <span className="fw-bold">
                    "Cによるアルゴリズムとデータ構造" (Algorithms and Data
                    Structures with C)
                  </span>{' '}
                  茨木俊秀,{' '}
                  <span className="bg-primary-subtle">
                    ISBN 978-4-274-22391-4
                  </span>
                </cite>
              </li>
            </ul>
          </section>
        </aside>
        <footer className="bg-secondary-subtle p-2">
          <a href="https://github.com/halfminami/maze-generation">
            Github Repository
          </a>
        </footer>
      </article>
    </Container>
  );
}

export default App;
