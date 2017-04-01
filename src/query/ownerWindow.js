import ownerDocument from './ownerDocument';
export default (componentOrElement) => {
    let doc = ownerDocument(componentOrElement);
    return doc && doc.defaultView || doc.parentWindow;
};
