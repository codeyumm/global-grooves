import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';

export default function Profile() {
  const [likedTracks, setLikedTracks] = useState([]);

  useEffect(() => {
    const fetchLikedTracks = async () => {
      const session = await getSession();
      if (session) {
        const response = await fetch('/api/liked-tracks');
        if (response.ok) {
          const data = await response.json();
          setLikedTracks(data.likedTrackIds);
        }
      }
    };

    fetchLikedTracks();
  }, []);

  return (
    <div>
      <h1>Liked Songs</h1>
      {likedTracks.length > 0 ? (
        <ul>
          {likedTracks.map(track => (
            <li key={track.id}>
              <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">{track.name} - {track.artists.map(artist => artist.name).join(', ')}</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No liked songs yet</p>
      )}
    </div>
  );
}
