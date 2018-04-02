// @flow

import ownerDocument from './ownerDocument';

export default (componentOrElement: HTMLElement): window => {
  const doc = ownerDocument(componentOrElement);
  return doc.defaultView;
};
