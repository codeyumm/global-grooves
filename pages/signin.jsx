import NavBar from "@/components/navBar/navBar";
import "../styles/global.css"
import "../styles/signin.css"
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
            
            <h3>Start exploring</h3>

            <form action="" className="signup-form" method="POST">
                <div className="input-container">
                  <label htmlFor="name">Username</label>
                  <input type="text" name="name" id="name" placeholder="Enter your username" />
                </div>



                <div className="input-container">
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" id="password" placeholder="Enter your password" />
                </div>

                

                
                <div className="input-container">
                
                  <input type="submit"  id="submit" value={"Sign in"} className="gradBg"/>
                </div>


            </form>

            <p className="siginInText">Don't have an account? <span className="highlightBlue"> Sign-up now! </span></p>

          </div>
        </section>
      </>
    );
  }
  