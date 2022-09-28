import { WheelHandler } from '../src';

describe('WheelHandler', () => {
  let mockEvent;
  let originalNavigator = global.navigator;

  beforeEach(() => {
    mockEvent = {
      preventDefault: () => {},
      deltaX: 10,
      deltaY: 0
    };

    Object.defineProperty(global, 'navigator', {
      value: {
        platform: 'MacIntel'
      }
    });
  });

  after(() => {
    Object.defineProperty(global, 'navigator', {
      value: originalNavigator
    });
  });

  it('Should return deltaX and deltaY', done => {
    const wheelHandler = new WheelHandler(
      (dX, dY) => {
        expect(dX).to.equal(10);
        expect(dY).to.equal(0);
        done();
      },
      true,
      true
    );
    wheelHandler.onWheel(mockEvent);
  });

  it('Should normalize deltas correctly when delta unit is lines', done => {
    const wheelHandler = new WheelHandler(
      (dX, dY) => {
        expect(dX).to.equal(8000);
        expect(dY).to.equal(800);
        done();
      },
      true,
      true
    );
    wheelHandler.onWheel({
      ...mockEvent,
      deltaMode: 2,
      deltaX: 10,
      deltaY: 1
    });
  });

  it('Should normalize deltas when delta unit is pages', done => {
    const wheelHandler = new WheelHandler(
      (dX, dY) => {
        expect(dX).to.equal(400);
        expect(dY).to.equal(40);
        done();
      },
      true,
      true
    );
    wheelHandler.onWheel({
      ...mockEvent,
      deltaMode: 1,
      deltaX: 10,
      deltaY: 1
    });
  });

  it('Should take horizontal scrolling with shiftKey + wheel into account on non-MacIntel platforms', done => {
    Object.defineProperty(global, 'navigator', {
      value: {
        platform: 'Win64'
      }
    });

    const wheelHandler = new WheelHandler(
      (dX, dY) => {
        expect(dX).to.equal(10);
        expect(dY).to.equal(0);
        done();
      },
      true,
      true
    );
    wheelHandler.onWheel({
      ...mockEvent,
      shiftKey: true,
      deltaX: 0,
      deltaY: 10
    });
  });

  it('Should not treat as horizontal scrolling when event.shiftKey == true if platform is MacIntel', done => {
    Object.defineProperty(global, 'navigator', {
      value: {
        platform: 'MacIntel'
      }
    });

    const wheelHandler = new WheelHandler(
      (dX, dY) => {
        expect(dX).to.equal(0);
        expect(dY).to.equal(10);
        done();
      },
      true,
      true
    );
    wheelHandler.onWheel({
      ...mockEvent,
      shiftKey: true,
      deltaX: 0,
      deltaY: 10
    });
  });

  it('Should treat as horizontal scrolling when side scrolling on FF', done => {
    const wheelHandler = new WheelHandler(
      (dX, dY) => {
        expect(dX).to.equal(500);
        expect(dY).to.equal(0);
        done();
      },
      true,
      true
    );
    wheelHandler.onWheel({
      detail: 50,
      axis: 1,
      HORIZONTAL_AXIS: 1,
      preventDefault: () => {}
    });
  });
});
