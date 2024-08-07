import Link from 'next/link'; // Import Link from Next.js
import style from './navBar.module.css'
// import "../../styles/global.css"

const handleLogout = async () => {
  try {
      const res = await fetch('/api/auth/logout', {
          method: 'POST',
      });

      if (res.ok) {
          router.push('/signin');
      } else {
          console.error('Logout failed');
          alert('Logout failed');
      }
  } catch (error) {
      console.error('Error logging out:', error);
      alert('Logout failed');
  }
};


export default function NavBar() {
  return (
    <header>
      <nav className={style.navBar}>

        <div className={style.logo}>
          <h1><span className={style.globalText}>Global</span>Grooves</h1>
        </div>

        <ul>
           <li><Link  className={style.link}  href="/about">About</Link></li>
          <li ><Link className={style.link} href="/signin">Sign in</Link></li>
          <li><Link className={`${style.gradBg} ${style.link}` } href="/signup">Sign up</Link></li>
          
        </ul>
        
      </nav>
    </header>
  );
}
