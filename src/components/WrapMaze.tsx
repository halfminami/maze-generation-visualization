import React, { useEffect, useRef, useState } from 'react';
import {
  Edge,
  WallLetters,
  badWall,
  defaultH,
  defaultInputmax,
  defaultInputmin,
  defaultW,
  goodWall,
  noWall,
  wait,
  wall,
} from '../settings';
import { Returns } from '../generation/spanningTree';
import { gridEdge, gridVertex, mathrandint } from '../generation/func';
import Maze from './Maze';
import { Accordion, AccordionButton, Button } from 'react-bootstrap';
import './WrapMaze.scss';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';

type Arg = { gen: (es: Edge[]) => Returns; unique: string };

function WrapMaze({ gen, unique }: Arg) {
  const [w, setW] = useState(defaultW);
  const [h, setH] = useState(defaultH);
  const [inputmin, setInputmin] = useState(defaultInputmin);
  const [inputmax, setInputmax] = useState(defaultInputmax);
  const [animTime, setAnimTime] = useState(wait);

  const [logText, setLogText] = useState('Logs will appear here');

  const [windowWid, setWindowWid] = useState(window.innerWidth);
  const accoHead = useRef<HTMLDivElement>(null);
  const accoBody = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = () => setWindowWid(window.innerWidth);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, []);

  useEffect(() => {
    accoBody.current!.style.width = `${accoHead.current?.clientWidth}px`;
  }, [windowWid]);

  // fill Array(n) first! otherwise, the array would have same array
  // (changing the nwr[0][1] will result in changing nwr[i][1] for all i)
  // const newWallRight = (): string[][] => Array(h).fill(Array(w - 1).fill(wall));

  // array length h, string length w-1
  const newWallRight = (): WallLetters[][] =>
    Array(h)
      .fill(0)
      .map((_) => Array(w - 1).fill(wall));

  const newWallBottom = (): WallLetters[][] =>
    Array(h - 1)
      .fill(0)
      .map((_) => Array(w).fill(wall));

  const [wallRight, setWallRight] = useState(['']);
  const [wallBottom, setWallBottom] = useState(['']);

  const [disabled, setDisabled] = useState(false);

  async function anim() {
    const generator = gen(
      gridEdge(gridVertex(h, w), () => mathrandint(inputmin, inputmax))
    );
    const nwr = newWallRight();
    const nwb = newWallBottom();
    let cnt = 0;

    function setWall(edge: Edge, wall: WallLetters) {
      if (edge.v0[0] === edge.v1[0]) {
        nwr[edge.v0[0]][Math.min(edge.v0[1], edge.v1[1])] = wall;
      } else {
        nwb[Math.min(edge.v0[0], edge.v1[0])][edge.v0[1]] = wall;
      }
    }
    function getWall(edge: Edge) {
      if (edge.v0[0] === edge.v1[0]) {
        return nwr[edge.v0[0]][Math.min(edge.v0[1], edge.v1[1])];
      } else {
        return nwb[Math.min(edge.v0[0], edge.v1[0])][edge.v0[1]];
      }
    }

    while (true) {
      const cur = generator.next();
      if (!cur.done) {
        const edge = cur.value[0];
        const wl = getWall(edge);
        cnt++;

        if (cur.value[1]) {
          setWall(edge, goodWall);
        } else {
          setWall(edge, badWall);
        }

        setWallRight(nwr.map((item) => item.join('')));
        setWallBottom(nwb.map((item) => item.join('')));
        setLogText(
          `Iteration ${cnt}, (${edge.v0[0]}, ${edge.v0[1]}) - (${edge.v1[0]}, ${
            edge.v1[1]
          }), ${cur.value[1] ? 'remove wall' : 'do nothing'}`
        );
        await sleep(animTime);

        if (cur.value[1]) {
          setWall(edge, noWall);
        } else {
          setWall(edge, wl);
        }
      } else {
        break;
      }
    }

    setWallRight(nwr.map((item) => item.join('')));
    setWallBottom(nwb.map((item) => item.join('')));
    setLogText(`Done! Looped ${cnt} times.`);
  }

  const ids = (s: string) => unique.trim() + '-' + s;

  function setNum(
    e: React.ChangeEvent<HTMLInputElement>,
    set: (value: React.SetStateAction<number>) => void,
    min: number,
    max: number,
    logfmt = (n: number) => `set ${e.target.name} to ${n}`
  ) {
    set((prev) => {
      let n = parseInt(e.target.value);

      if (isNaN(n)) {
        setLogText(logfmt(prev));
        return prev;
      }

      n = Math.min(max, Math.max(min, n));

      setLogText(logfmt(n));
      return n;
    });
  }

  return (
    <div className="m-2">
      <Accordion>
        <div className="accordion-item mt-3 mb-3">
          <AccordionButton ref={accoHead}>settings</AccordionButton>
          <AccordionBody ref={accoBody}>
            <form
              id={ids('form')}
              className="inputs"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2,auto)',
                gap: '1rem',
                width: '100%',
              }}
            >
              <label>
                width
                <input
                  type="number"
                  name="width"
                  className="form-control"
                  value={w}
                  onChange={(e) =>
                    setNum(e, setW, 2, 100, (n) => `set width to ${n}`)
                  }
                />
              </label>
              <label>
                height
                <input
                  type="number"
                  name="height"
                  className="form-control"
                  value={h}
                  onChange={(e) =>
                    setNum(e, setH, 2, 100, (n) => `set height to ${n}`)
                  }
                />
              </label>

              <label>
                random weight min
                <input
                  type="number"
                  name="min"
                  className="form-control"
                  value={inputmin}
                  onChange={(e) =>
                    setNum(
                      e,
                      setInputmin,
                      0,
                      100,
                      (n) => `set random weight min to ${n}`
                    )
                  }
                />
              </label>

              <label>
                random weight max
                <input
                  type="number"
                  name="max"
                  className="form-control"
                  value={inputmax}
                  onChange={(e) =>
                    setNum(
                      e,
                      setInputmax,
                      0,
                      100,
                      (n) => `set random weight max to ${n}`
                    )
                  }
                />
              </label>

              <label>
                animation interval
                <input
                  type="range"
                  className="form-control"
                  min="0"
                  max="1000"
                  step={50}
                  name="anim-time"
                  value={animTime}
                  onChange={(e) =>
                    setNum(
                      e,
                      setAnimTime,
                      0,
                      1000,
                      (n) => `set animation interval to ${n}ms`
                    )
                  }
                />
              </label>
            </form>
          </AccordionBody>
        </div>
      </Accordion>
      <Button
        className="go mt-1 mb-1"
        {...{ disabled }}
        onClick={async () => {
          setDisabled(true);

          await anim();

          setDisabled(false);
        }}
      >
        GO
      </Button>
      <div className="m-auto mt-4 mb-2" style={{ width: 'fit-content' }}>
        <Maze {...{ wallBottom, wallRight, w, h }} />
      </div>
      <div className="output" style={{ fontSize: '1.1rem' }}>
        <output form={ids('form')}>{logText}</output>
      </div>
    </div>
  );
}

function sleep(time: number) {
  return new Promise((res, rej) => {
    setTimeout(res, time);
  });
}

export default WrapMaze;
