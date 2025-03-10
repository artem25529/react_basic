const windowUtils = {
  toggleWindowScroll(flag) {
    document.body.style.overflow = flag ? 'auto' : 'hidden';
  },

  scrollDown() {
    window.scrollTo({ top: window.scrollMaxY });
  },
};

export default windowUtils;
