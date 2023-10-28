import "./Footer.css";

export default function Footer() {
  return (
    <div id="footer-container">
      <div className="creators">
        <div className="creators1">Created by:</div>
        <div className="creator">
          <div className="creator-text">Miroslawa (Mira) Borkowska</div>
          <a
            href="https://github.com/Mirabordem"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github creator-link-icon"></i>
          </a>
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
          <div className="dot">•</div>
          <div className="year-aa">October 2023</div>
        </div>
      </div>
    </div>
  );
}
