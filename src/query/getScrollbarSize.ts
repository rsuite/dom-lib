import canUseDOM from './canUseDOM';

let size;

export default (recalc: boolean): number | void => {
  if (size === undefined || recalc) {
    if (canUseDOM) {
      const scrollDiv = document.createElement('div');
      const body: any = document.body;

      scrollDiv.style.position = 'absolute';
      scrollDiv.style.top = '-9999px';
      scrollDiv.style.width = '50px';
      scrollDiv.style.height = '50px';
      scrollDiv.style.overflow = 'scroll';

      body.appendChild(scrollDiv);
      size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      body.removeChild(scrollDiv);
    }
  }

  return size;
};
