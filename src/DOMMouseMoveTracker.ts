/**
 * Source code reference from:
 * https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/dom/DOMMouseMoveTracker.js
 */

import on from './on';
import cancelAnimationFramePolyfill from './cancelAnimationFramePolyfill';
import requestAnimationFramePolyfill from './requestAnimationFramePolyfill';

/**
 * Mouse drag tracker, get the coordinate value where the mouse moves in time.
 *
 * ```typescript
 * const tracker = new DOMMouseMoveTracker(
 *   onMove:(deltaX: number, deltaY: number, moveEvent: Object) => void,
 *   onMoveEnd:() => void,
 *   container: HTMLElement
 * );
 * ```
 */
class DOMMouseMoveTracker {
  isDraggingStatus = false;
  animationFrameID = null;
  domNode: Element;
  onMove = null;
  onMoveEnd = null;
  eventMoveToken = null;
  eventUpToken = null;
  moveEvent = null;
  deltaX = 0;
  deltaY = 0;
  x = 0;
  y = 0;

  /**
   * onMove is the callback that will be called on every mouse move.
   * onMoveEnd is called on mouse up when movement has ended.
   */
  constructor(onMove: (x: number, y: number, e) => void, onMoveEnd: (e) => void, domNode: Element) {
    this.domNode = domNode;
    this.onMove = onMove;
    this.onMoveEnd = onMoveEnd;
  }

  /**
   * This is to set up the listeners for listening to mouse move
   * and mouse up signaling the movement has ended. Please note that these
   * listeners are added at the document.body level. It takes in an event
   * in order to grab inital state.
   */
  captureMouseMoves(event) {
    if (!this.eventMoveToken && !this.eventUpToken) {
      this.eventMoveToken = on(this.domNode, 'mousemove', this.onMouseMove);
      this.eventUpToken = on(this.domNode, 'mouseup', this.onMouseUp);
    }

    if (!this.isDraggingStatus) {
      this.deltaX = 0;
      this.deltaY = 0;
      this.isDraggingStatus = true;
      this.x = event.clientX;
      this.y = event.clientY;
    }

    event.preventDefault();
  }

  /**
   * These releases all of the listeners on document.body.
   */
  releaseMouseMoves() {
    if (this.eventMoveToken) {
      this.eventMoveToken.off();
      this.eventMoveToken = null;
    }

    if (this.eventUpToken) {
      this.eventUpToken.off();
      this.eventUpToken = null;
    }

    if (this.animationFrameID !== null) {
      cancelAnimationFramePolyfill(this.animationFrameID);
      this.animationFrameID = null;
    }

    if (this.isDraggingStatus) {
      this.isDraggingStatus = false;
      this.x = 0;
      this.y = 0;
    }
  }

  /**
   * Returns whether or not if the mouse movement is being tracked.
   */
  isDragging = () => this.isDraggingStatus;

  /**
   * Calls onMove passed into constructor and updates internal state.
   */
  onMouseMove = event => {
    const x = (event as MouseEvent).clientX;
    const y = (event as MouseEvent).clientY;

    this.deltaX += x - this.x;
    this.deltaY += y - this.y;

    if (this.animationFrameID === null) {
      // The mouse may move faster then the animation frame does.
      // Use `requestAnimationFramePolyfill` to avoid over-updating.
      this.animationFrameID = requestAnimationFramePolyfill(this.didMouseMove);
    }

    this.x = x;
    this.y = y;

    this.moveEvent = event;
    event.preventDefault();
  };

  didMouseMove = () => {
    this.animationFrameID = null;
    this.onMove(this.deltaX, this.deltaY, this.moveEvent);

    this.deltaX = 0;
    this.deltaY = 0;
  };
  /**
   * Calls onMoveEnd passed into constructor and updates internal state.
   */
  onMouseUp = event => {
    if (this.animationFrameID) {
      this.didMouseMove();
    }
    this.onMoveEnd && this.onMoveEnd(event);
  };
}

export default DOMMouseMoveTracker;
