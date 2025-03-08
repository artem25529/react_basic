const windowUtils = {
  toggleWindowScroll(flag) {
    document.body.style.overflow = flag ? 'auto' : 'hidden';
  },

  scrollDown() {
    window.scrollY = window.scrollMaxY;
  },
};

export default windowUtils;
