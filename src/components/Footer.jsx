function Footer() {
  return (
    <section className="page-footer">
      <div className="footer-links">
        <img className="footer-link" src="/facebook.png" alt="facebook" />
        <img className="footer-link" src="/instagram.png" alt="instagram" />
        <img className="footer-link" src="/linkedin.png" alt="linkedin" />
        <img className="footer-link" src="/youtube.png" alt="youtube" />
      </div>
      <address className="footer-contacts-wrapper">
        <div className="footer-contacts">
          <div className="contact-wrapper">
            <span className="material-symbols-outlined">visibility</span>
            <a href="tel:+375294555316">+375(29) 455-53-16</a>
          </div>
          <div className="contact-wrapper">
            <span className="material-symbols-outlined">visibility</span>
            <a href="mailto:writewave@gmail.com">writewave@gmail.com</a>
          </div>
        </div>
        <div className="footer-address"></div>
      </address>
      <div className="footer-copyright">
        &copy; {new Date().getFullYear()} WriteWave. All rights reserved.
      </div>
    </section>
  );
}

export default Footer;
