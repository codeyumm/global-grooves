import React from 'react';
import '../styles/about.css'; 
import NavBar from '@/components/navBar/navBar';
import NavBarExplore from '@/components/navBar/navBarExplore';

export default function About() {
  return (

    <>
    <NavBarExplore />

    <div className="about-container">
      <header className="header">
        <h1>About World Music Explorer</h1>
      </header>
      <section className="section">
        <h2>What is World Music Explorer?</h2>
        <p>
          World Music Explorer is an innovative web application that allows you to explore and discover the top music hits from every corner of the globe. Powered by the Spotify API, our platform gives you access to a diverse range of songs from various countries and cultures, all in one place.
        </p>
      </section>
      <section className="section">
        <h2>How to Use World Music Explorer</h2>
        <ol>
          <li>
            <h3>Explore the Globe:</h3>
            <p>Click on any country on our interactive 3D globe to discover its top song. Navigate effortlessly and immerse yourself in the music of different regions.</p>
          </li>
          <li>
            <h3>Sign Up or Log In:</h3>
            <p>Create an account to unlock personalized features such as liking songs, creating playlists, and sharing music with friends. Already have an account? Simply log in to get started.</p>
          </li>
          <li>
            <h3>Like Songs:</h3>
            <p>Found a song you love? Like it to save it to your profile and revisit it later. Build your own collection of favorite tracks from around the world.</p>
          </li>
          <li>
            <h3>Create Playlists:</h3>
            <p>Curate your own playlists with songs from different countries and genres. Organize your music library and tailor your listening experience to your preferences.</p>
          </li>
          <li>
            <h3>Share Music:</h3>
            <p>Spread the joy of music by sharing your favorite tracks and playlists with friends and family. Connect with others who share your musical interests and discover new artists together.</p>
          </li>
        </ol>
      </section>
      <footer className="footer">
        <h2>Start Your Musical Journey Today!</h2>
        <p>
          Join World Music Explorer now and embark on a journey to explore the rich tapestry of global music. Whether you're a music enthusiast, a traveler at heart, or simply curious about music from around the world, our platform offers something for everyone. Sign up or log in to begin your musical adventure today!
        </p>
      </footer>
    </div>

    </>
  );
}
