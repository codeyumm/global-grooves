import NavBar from "@/components/navBar/navBar";
import "../styles/global.css"
import "../styles/index.css"
import Link from 'next/link'; 

export default function Index() {
    return (
      <>
        <NavBar/>
        <div className="red-star">
            <img src="/images/orange-star.png" alt="" />
        </div>

        <div className="blue-star">
            <img src="/images/blue-star.png" alt="" />
        </div>

        <div className="blue-circle">
            <img src="/images/blue-circle.png" alt="" />
        </div>

        <section className="hero">


          <div className="left">

              <h2 className="hero-text">
                Discover Global Hits Anytime, Anywhere!
              </h2>

              <p className="hero-desc">
                With World Music Explorer, discovering the latest tracks from around the world is easy. Sign up now and start exploring!
              </p>

              <button><Link  href="/signin">Sign in</Link></button>

              <p className="siginInText">Already have an account? <span className="highlightBlue"> Log in now! </span></p>

          </div>

          <div className="right">
              <img src="/images/music-hero.png" alt="girl listing to music" title="Hero image of girl enjoying the music" />
          </div>

        </section>
      </>
    );
  }
  