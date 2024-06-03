import NavBar from "@/components/navBar/navBar";
import "../styles/global.css"
import "../styles/signup.css"
import Link from 'next/link'; 

export default function Index() {
    return (
      <>
        {/* <NavBar/> */}


        <section className="signup-container">

          <div className="left">

            {/* to do add back to home button */}
          {/* <h3>Back to home</h3> */}

            <h2><pre>Global
                       <br/>   Grooves </pre></h2>
            
          </div>

          <div className="right">
            
            <h3>Create your account</h3>

            <form action="" className="signup-form" method="POST">
                <div className="input-container">
                  <label htmlFor="name">Name</label>
                  <input type="text" name="name" id="name" placeholder="Enter your name" />
                </div>

                <div className="input-container">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" placeholder="Enter your email" />
                </div>

                <div className="input-container">
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" id="password" placeholder="Enter your password" />
                </div>

                <div className="input-container">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm your password" />
                </div>

                <div className="input-container">
                  <label htmlFor="username">Username</label>
                  <input type="text" name="username" id="username" placeholder="Enter your username" />
                </div>

                
                <div className="input-container">
                
                  <input type="submit"  id="submit" value={"Sign up"} className="gradBg"/>
                </div>


            </form>

            <p className="siginInText">Already have an account? <span className="highlightBlue"> Log in now! </span></p>

          </div>
        </section>
      </>
    );
  }
  