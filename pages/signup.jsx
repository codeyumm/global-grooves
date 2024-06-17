import { useState } from 'react';
import { useRouter } from 'next/router';
import NavBar from "@/components/navBar/navBar";
import "../styles/global.css";
import "../styles/signup.css";
import Link from 'next/link';

export default function Index() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', username: '' });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push('/signin');
    } else {
      // handle error
    }
  };

  return (
    <>
      {/* <NavBar/> */}

      <section className="signup-container">
        <div className="left">
          {/* to do add back to home button */}
          {/* <h3>Back to home</h3> */}
          <h2><pre>Global<br />Grooves </pre></h2>
        </div>

        <div className="right">
          <h3>Create your account</h3>

          <form onSubmit={handleSubmit} className="signup-form" method="POST">
            <div className="input-container">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" placeholder="Enter your name" value={form.name} onChange={handleChange} />
            </div>

            <div className="input-container">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" placeholder="Enter your email" value={form.email} onChange={handleChange} />
            </div>

            <div className="input-container">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" placeholder="Enter your password" value={form.password} onChange={handleChange} />
            </div>

            <div className="input-container">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm your password" value={form.confirmPassword} onChange={handleChange} />
            </div>

            <div className="input-container">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" id="username" placeholder="Enter your username" value={form.username} onChange={handleChange} />
            </div>

            <div className="input-container">
              <input type="submit" id="submit" value={"Sign up"} className="gradBg" />
            </div>
          </form>

          <p className="siginInText">Already have an account? <Link href="/signin"><span className="highlightBlue">Log in now!</span></Link></p>
        </div>
      </section>
    </>
  );
}
