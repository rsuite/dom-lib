import ownerDocument from './ownerDocument';

export default (componentOrElement: HTMLElement): Window => {
  const doc = ownerDocument(componentOrElement);
  return doc.defaultView;
};
