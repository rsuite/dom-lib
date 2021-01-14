function makeEmptyFunction(arg) {
  return () => arg;
}

function emptyFunction() {}

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = () => this;
emptyFunction.thatReturnsArgument = arg => arg;

export default emptyFunction;
