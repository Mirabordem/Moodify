import "./Footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';


export default function Footer() {


  const handleLinkedinMira = (e) => {
    e.preventDefault();
    window.open('https://www.linkedin.com/in/miroslawa-borkowska-3b72332a0/');
  };

  const handleLinkedinHayden = (e) => {
    e.preventDefault();
    window.open('https://www.linkedin.com/in/hayden-gogan-2570a92a1/');
  };

  const handleLinkedinJosh = (e) => {
    e.preventDefault();
    window.open('https://www.linkedin.com/in/josh-goldenberg-252416a1/');
  };

  const handleLinkedinAlex = (e) => {
    e.preventDefault();
    window.open('https://www.linkedin.com/in/alexander-heasley-1979732a0/');
  };



  return (
    <div id="footer-container">
      <div className="creators">
        <div className="creators1">Meet Awesome Developers:</div>
        <div className="creator">
          <div className="creator-text">Miroslawa (Mira) Borkowska</div>
          <a
            href="https://github.com/Mirabordem"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github creator-link-icon"></i>
          </a>
            <FontAwesomeIcon icon={faLinkedin} className="footer-icon" onClick={handleLinkedinMira} />
          <div className="dot">•</div>

        </div>
        <div className="creator">
          <div className="creator-text">Hayden Gogan</div>
          <a
            href="https://github.com/h-moon-g"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github creator-link-icon"></i>
          </a>
          <FontAwesomeIcon icon={faLinkedin} className="footer-icon" onClick={handleLinkedinHayden} />
          <div className="dot">•</div>


        </div>
        <div className="creator">
          <div className="creator-text">Josh Goldenberg</div>
          <a
            href="https://github.com/jgoldenberg29"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github creator-link-icon"></i>
          </a>
          <FontAwesomeIcon icon={faLinkedin} className="footer-icon" onClick={handleLinkedinJosh} />
          <div className="dot">•</div>


        </div>
        <div className="creator">
          <div className="creator-text">Alex Heasley</div>
          <a
            href="https://github.com/alexchrono"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github creator-link-icon"></i>
          </a>
          <FontAwesomeIcon icon={faLinkedin} className="footer-icon" onClick={handleLinkedinAlex} />
          <div className="dot1">|</div>
          <div className="year-aa">October 2023</div>
        </div>
      </div>
    </div>
  );
}
