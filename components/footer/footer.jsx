import React from 'react';
import '../../styles/footer.css'; 


export default function Footer() {
    return (
      <footer className="footer">
      
        <h3>Terms and Conditions</h3>

        <p className="desc">By using World Music Explorer, you agree to the following:</p>
        
          <p>We use the Spotify API to access music content. Please refer to Spotifys 
              <a href="https://developer.spotify.com/terms/" target="_blank" rel="noopener noreferrer">
                Developer Terms of Service 
              </a>.
          </p>
          <p>Content is for personal use only; no commercial redistribution.</p>
          <p>Maintain your account's confidentiality and security.</p>
          <p>We aim for the accuracy, but cannot guarantee the completeness of content.</p>
     
          <p className="credit">
                © {new Date().getFullYear()} World Music Explorer. All rights reserved.
          </p>
      </footer>
    

    );
  }