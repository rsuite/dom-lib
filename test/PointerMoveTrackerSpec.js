import * as lib from '../src';
import simulant from 'simulant';

describe('PointerMoveTracker', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__html__['test/html/PointerMoveTracker.html'];
  });

  it('Should track for mouse events', done => {
    const target = document.getElementById('drag-target');
    let tracker = null;

    const handleDragMove = (x, y, e) => {
      if (e instanceof MouseEvent) {
        if (x && y) {
          expect(x).to.equal(100);
          expect(y).to.equal(100);
        }
      }
    };

    const handleDragEnd = () => {
      tracker.releaseMoves();
      tracker = null;
      done();
    };

    function handleStart(e) {
      if (!tracker) {
        tracker = new lib.PointerMoveTracker(document.body, {
          onMove: handleDragMove,
          onMoveEnd: handleDragEnd
        });

        tracker.captureMoves(e);
      }
    }

    target.addEventListener('mousedown', handleStart);

    simulant.fire(target, 'mousedown');
    simulant.fire(document.body, 'mousemove', { clientX: 100, clientY: 100 });
    simulant.fire(document.body, 'mouseup');
  });
});
