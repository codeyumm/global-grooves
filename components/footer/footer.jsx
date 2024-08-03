import React from 'react';
import '../../styles/footer.css'; 


export default function Footer() {
    return (
      <footer className="footer">
       
        <div className="footer-terms">
          <h3>Terms and Conditions</h3>
          <p>
            By using World Music Explorer, you agree to the following:
          </p>
          <ul>
            <li>We use the Spotify API to access music content. Please refer to Spotify’s <a href="https://developer.spotify.com/terms/" target="_blank" rel="noopener noreferrer">Developer Terms of Service</a>.</li>
            <li>Content is for personal use only; no commercial redistribution.</li>
            <li>Maintain your account's confidentiality and security.</li>
            <li>We strive for accuracy, but cannot guarantee the completeness of content.</li>

          </ul>
          <p>© {new Date().getFullYear()} World Music Explorer. All rights reserved.</p>
        </div>
      </footer>
    );
  }