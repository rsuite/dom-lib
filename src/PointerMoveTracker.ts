import on from './on';
import isEventSupported from './utils/isEventSupported';

interface PointerMoveTrackerOptions {
  useTouchEvent: boolean;
  onMove: (x: number, y: number, event: MouseEvent | TouchEvent) => void;
  onMoveEnd: (event: MouseEvent | TouchEvent) => void;
}

/**
 * Track mouse/touch events for a given element.
 */
export default class PointerMoveTracker {
  isDragStatus = false;
  useTouchEvent = true;
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
  constructor(
    domNode: Element,
    { onMove, onMoveEnd, useTouchEvent = true }: PointerMoveTrackerOptions
  ) {
    this.domNode = domNode;
    this.onMove = onMove;
    this.onMoveEnd = onMoveEnd;
    this.useTouchEvent = useTouchEvent;
  }

  isSupportTouchEvent() {
    return this.useTouchEvent && isEventSupported('touchstart');
  }

  getClientX(event: TouchEvent | MouseEvent) {
    return this.isSupportTouchEvent()
      ? (event as TouchEvent).touches?.[0].clientX
      : (event as MouseEvent).clientX;
  }

  getClientY(event: TouchEvent | MouseEvent) {
    return this.isSupportTouchEvent()
      ? (event as TouchEvent).touches?.[0].clientY
      : (event as MouseEvent).clientY;
  }

  /**
   * This is to set up the listeners for listening to mouse move
   * and mouse up signaling the movement has ended. Please note that these
   * listeners are added at the document.body level. It takes in an event
   * in order to grab inital state.
   */
  captureMoves(event) {
    if (!this.eventMoveToken && !this.eventUpToken) {
      this.eventMoveToken = on(this.domNode, 'mousemove', this.onDragMove);
      this.eventUpToken = on(this.domNode, 'mouseup', this.onDragUp);

      if (this.isSupportTouchEvent()) {
        this.eventMoveToken = on(this.domNode, 'touchmove', this.onDragMove, { passive: false });
        this.eventUpToken = on(this.domNode, 'touchend', this.onDragUp, { passive: false });
        on(this.domNode, 'touchcancel', this.releaseMoves);
      }
    }

    if (!this.isDragStatus) {
      this.deltaX = 0;
      this.deltaY = 0;
      this.isDragStatus = true;
      this.x = this.getClientX(event);
      this.y = this.getClientY(event);
    }

    event.preventDefault();
  }

  /**
   * These releases all of the listeners on document.body.
   */
  releaseMoves() {
    if (this.eventMoveToken) {
      this.eventMoveToken.off();
      this.eventMoveToken = null;
    }

    if (this.eventUpToken) {
      this.eventUpToken.off();
      this.eventUpToken = null;
    }

    if (this.animationFrameID !== null) {
      cancelAnimationFrame(this.animationFrameID);
      this.animationFrameID = null;
    }

    if (this.isDragStatus) {
      this.isDragStatus = false;
      this.x = 0;
      this.y = 0;
    }
  }

  /**
   * Returns whether or not if the mouse movement is being tracked.
   */
  isDragging = () => this.isDragStatus;

  /**
   * Calls onMove passed into constructor and updates internal state.
   */
  onDragMove = (event: MouseEvent | TouchEvent) => {
    const x = this.getClientX(event);
    const y = this.getClientY(event);

    this.deltaX += x - this.x;
    this.deltaY += x - this.y;

    if (this.animationFrameID === null) {
      // The mouse may move faster then the animation frame does.
      // Use `requestAnimationFrame` to avoid over-updating.
      this.animationFrameID = requestAnimationFrame(this.didDragMove);
    }

    this.x = x;
    this.y = y;

    this.moveEvent = event;
    event.preventDefault();
  };

  didDragMove = () => {
    this.animationFrameID = null;
    this.onMove(this.deltaX, this.deltaY, this.moveEvent);

    this.deltaX = 0;
    this.deltaY = 0;
  };
  /**
   * Calls onMoveEnd passed into constructor and updates internal state.
   */
  onDragUp = event => {
    if (this.animationFrameID) {
      this.didDragMove();
    }
    this.onMoveEnd?.(event);
  };
}
