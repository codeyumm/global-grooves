
import { deleteCookie } from 'cookies-next';

// to implement logout functionality
export default async function LogoutHandler(req, res) {

  // remove token from cookies 
  deleteCookie('token', { req, res });


  res.status(200).json({ message: 'Logged out successfully' });
}
