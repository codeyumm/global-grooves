import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const { action } = req.query;
  const { trackId } = req.body;
  const session = await getSession({ req });

  if (session && trackId) {
    const userId = session.user.id;

    if (action === 'like') {
      // Add trackId to liked tracks in the database for userId
      // Example: await db.addLikedTrack(userId, trackId);
      res.status(200).json({ message: 'Track liked' });
    } else if (action === 'unlike') {
      // Remove trackId from liked tracks in the database for userId
      // Example: await db.removeLikedTrack(userId, trackId);
      res.status(200).json({ message: 'Track unliked' });
    } else {
      res.status(400).json({ error: 'Invalid action' });
    }
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}
