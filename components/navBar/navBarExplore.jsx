import Link from 'next/link'; // Import Link from Next.js
import style from './navBar.module.css';
import { useRouter } from 'next/router';

import "../../styles/global.css";

export default function NavBarExplore() {
  const router = useRouter();

  // Define handleLogout inside the component to access router
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

  return (
    <header>
      <nav className={style.navBar}>
        <div className={style.logo}>
          <h1><span className={style.globalText}>Global</span>Grooves</h1>
        </div>

        <ul>
           <li><Link className={style.link} href="/about">About</Link></li>
           <button onClick={handleLogout} className="logout-button">Logout</button>
        </ul>
      </nav>
    </header>
  );
}
