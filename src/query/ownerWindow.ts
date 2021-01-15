import ownerDocument from './ownerDocument';

export default (componentOrElement: Element): Window => {
  const doc = ownerDocument(componentOrElement);
  return doc.defaultView;
};
