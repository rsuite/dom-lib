import { on, off } from '../src';
import simulant from 'simulant';

describe('Events', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__html__['test/html/events.html'];
  });

  it('should add an event listener', done => {
    const el = document.getElementById('case-1');
    on(el, 'click', () => done());
    simulant.fire(el, 'click');
  });

  it('should remove an event listener', () => {
    const el = document.getElementById('case-1');
    function handleEvent() {
      throw new Error('event fired');
    }
    on(el, 'click', handleEvent);
    off(el, 'click', handleEvent);
    simulant.fire(el, 'click');
  });

  it('should remove an event listener', () => {
    const el = document.getElementById('case-1');
    function handleEvent() {
      throw new Error('event fired');
    }
    on(el, 'click', handleEvent).off();
    simulant.fire(el, 'click');
  });
});
