import { useState } from 'react';
import { useRouter } from 'next/router';
import "../styles/global.css"
import "../styles/signin.css"
import Link from 'next/link'; 

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push('/explore');
    } else {
      // handle error
      alert('Login failed');
    }
  };

  return (
    <>
      <section className="signup-container">
        <div className="left">
          <h2><pre>Global<br/>Grooves</pre></h2>
        </div>
        <div className="right">
          <h3>Start exploring</h3>
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="input-container">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                placeholder="Enter your email" 
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                name="password" 
                id="password" 
                placeholder="Enter your password" 
                value={form.password}
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <input type="submit" id="submit" value={"Sign in"} className="gradBg" />
            </div>
          </form>
          <p className="siginInText">Don't have an account?  <Link href="/signin"><span className="highlightBlue">Sign-up now! </span></Link></p>
        </div>
      </section>
    </>
  );
}
