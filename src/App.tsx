import './App.scss';
import { DFSGen, kruskalGen, primGen } from './generation/spanningTree';
import WrapMaze from './components/WrapMaze';
import { Container } from 'react-bootstrap';

const pseudoPrim = `func <span class="k">Prim</span>(<span class="k">edges</span> as List of Edge) {
  <span class="k">addedNodes</span> as Set of Node
  <span class="k">currentEdges</span> as Set of Edge sorted by weight
  <span class="k">result</span> as List of Edge

  <span class="d">Add</span> an arbitrary node to <span class="k">addedNodes</span>
  <span class="d">Add</span> edges connecting to the node to <span class="k">currentEdges</span>

  while (<span class="k">addedNodes</span> does not contain all nodes) {
    for (each <span class="k">edge</span> of <span class="k">currentEdges</span>) {
      if (<span class="k">edge</span> connects to a <span class="k">newNode</span> not in <span class="k">addedNodes</span>) {
        <span class="d">Add</span> <span class="k">newNode</span> to <span class="k">addedNodes</span>
        <span class="d">Add</span> edges connecting to <span class="k">newNode</span> to <span class="k">currentEdges</span>

        <span class="d">Add</span> <span class="k">edge</span> to <span class="k">result</span>
        break <span class="c">// Loop over once currentEdges is updated</span>
      }
    }
  }
  
  return <span class="k">result</span>
}`;

const pseudoKruskal = `func <span class="k">Kruskal</span>(<span class="k">edges</span> as List of Edge) {
  <span class="k">forest</span> as DisjointSet of Node
  <span class="k">result</span> as List of Edge

  <span class="d">Sort</span> <span class="k">edges</span> by weight

  for (each <span class="k">edge</span> of <span class="k">edges</span>) {
    if (<span class="k">nodes</span> of <span class="k">edge</span> are not in the same tree in <span class="k">forest</span>) {
      <span class="d">Add</span> <span class="k">nodes</span> to <span class="k">forest</span>

      <span class="d">Add</span> <span class="k">edge</span> to <span class="k">result</span>
    }
  }

  return <span class="k">result</span>
}`;

const pseudoDFS = `func <span class="k">DFS</span>(<span class="k">edges</span> as List of Edge) {
  <span class="k">visitedNodes</span> as Set of Node
  <span class="k">stack</span> as Stack of Node
  <span class="k">result</span> as List of Edge

  <span class="d">Push</span> an arbitrary node onto <span class="k">stack</span>

  while (<span class="k">stack</span> is not empty) {
    <span class="k">current</span> <- <span class="d">Peek</span> from <span class="k">stack</span>

    if (<span class="k">current</span> is connected to a node not in <span class="k">visitedNodes</span>) {
      <span class="k">selected</span> <- <span class="d">Select</span> a random edge that joins <span class="k">current</span> and a <span class="k">newNode</span> not in <span class="k">visitedNodes</span>

      <span class="d">Add</span> <span class="k">newNode</span> to <span class="k">visitedNodes</span>
      <span class="d">Push</span> <span class="k">newNode</span> onto <span class="k">stack</span>

      <span class="d">Add</span> <span class="k">selected</span> to <span class="k">result</span>
    } else {
      <span class="d">Pop</span> from <span class="k">stack</span>
    }
  }

  return <span class="k">result</span>
}`;

function App() {
  return (
    <Container className="mt-4 mb-4">
      <article>
        <h1 className="border-bottom border-3 border-primary border-opacity-25">
          Maze Generation Algorithm Visualization
        </h1>
        <section>
          <h2>Animations</h2>
          <main className="d-flex flex-row flex-wrap justify-content-center">
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
            A maze can be generated using a spanning tree, with graph nodes
            representing a grid.{' '}
            <a href="https://en.wikipedia.org/wiki/Maze_generation_algorithm">
              Maze Generation Algorithm - wikipedia
            </a>
          </p>
          <p>
            Some algorithms for finding a <dfn>minimum spanning tree</dfn> (
            <abbr>MST</abbr>) include Prim's algorithm and Kruskal's algorithm.
            Two examples are generating a minimum spanning tree maze with random
            weights using these algorithms. You can see the differences in the
            generation process.
          </p>
          <p>
            Additionally, a spanning tree can be found using a random{' '}
            <dfn>Depth-First Search</dfn> (<abbr>DFS</abbr>) without loops. You
            can observe the <abbr>DFS</abbr> process and compare its results
            with those of minimum spanning tree.
          </p>
        </section>
        <section className="d-flex flex-column">
          <h2>Implementation</h2>
          <section className="card">
            <div className="card-body">
              <h3 className="card-title" id="prim-details">
                Prim's Algorithm
              </h3>
              <p className="card-text">
                In Prim's algorithm, a tree is grown to become an{' '}
                <abbr>MST</abbr>.
              </p>
              <ol className="card-text">
                <li>Start from an arbitrary node.</li>
                <li>Add this node to a set.</li>
                <ol>
                  <li>
                    Select the minimum-weight edge that connects a node in the
                    set and a new node.
                  </li>
                  <li>Add the new node to the set.</li>
                </ol>
                <li>
                  Repeat this selection process until every node is included in
                  the set.
                </li>
              </ol>
              <figure>
                <figcaption>Pseudo Code</figcaption>
                <pre>
                  <code
                    dangerouslySetInnerHTML={{
                      __html: pseudoPrim,
                    }}
                  ></code>
                </pre>
              </figure>
            </div>
          </section>
          <section className="card">
            <div className="card-body">
              <h3 className="card-title" id="kruskal-details">
                Kruskal's Algorithm
              </h3>
              <p className="card-text">
                In Kruskal's algorithm, several trees are grown and merged to
                form an <abbr>MST</abbr>.
              </p>
              <ol className="card-text">
                <li>Initialize an empty disjoint set forest.</li>
                <li>Sort all edges in non-decreasing order of weight.</li>
                <li>
                  For each edges in order,
                  <ul>
                    <li>
                      If the two nodes of the edge are not in the same tree, do
                      the following:
                    </li>
                    <ol>
                      <li>Select the edge.</li>
                      <li>Add the two nodes to the forest.</li>
                    </ol>
                  </ul>
                </li>
              </ol>
              <figure>
                <figcaption>Pseudo Code</figcaption>
                <pre>
                  <code
                    dangerouslySetInnerHTML={{
                      __html: pseudoKruskal,
                    }}
                  ></code>
                </pre>
              </figure>
            </div>
          </section>
          <section className="card">
            <div className="card-body">
              <h3 className="card-title" id="dfs-details">
                no loop <abbr>DFS</abbr>
              </h3>
              <p className="card-text">
                <abbr>DFS</abbr> can be used to create or solve a maze in a
                manner similar to navigating through a maze room.
              </p>
              <ol className="card-text">
                <li>Start from an arbitrary node.</li>
                <ul>
                  <li>
                    If there are any edges connecting the current node to a new
                    node, do the following:
                  </li>
                  <ol>
                    <li>Randomly select an edge from those edges.</li>
                    <li>Start over from that new node.</li>
                  </ol>
                  <li>If not, do the following:</li>
                  <ol>
                    <li>Go back to the previous node.</li>
                  </ol>
                </ul>
                <li>Repeat these steps until there is no previous node.</li>
              </ol>
              <p className="card-text">
                You can implement this with stack to avoid excessively deep
                recursion.
              </p>
              <figure>
                <figcaption>Pseudo Code</figcaption>
                <pre>
                  <code
                    dangerouslySetInnerHTML={{
                      __html: pseudoDFS,
                    }}
                  ></code>
                </pre>
              </figure>
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
          <a href="https://github.com/halfminami/maze-generation-visualization">
            Github Repository
          </a>
        </footer>
      </article>
    </Container>
  );
}

export default App;
