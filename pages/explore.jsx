import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic
import "../styles/global.css"
import "../styles/explore.css"
import NavBar from "@/components/navBar/navBar";

const WorldMap = dynamic(() => import('./svgmap'), { ssr: false }); // Import WorldMap dynamically

export default function Explore() {
    const router = useRouter();
    const [trackData, setTrackData] = useState(null);
    const [accessToken, setAccessToken] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [tracksURL, setTracksURL] = useState("");
    const [tracks, setTracks] = useState([]);
    const [audio, setAudio] = useState(null); // Audio state for track preview

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

    useEffect(() => {
        const fetchAccessToken = async () => {
            try {
                const client_id = "7c986fa99d0c4059b0e00c646b8cec0b";
                const client_secret = "ad7dff6eddc14dc0a53b693e86512fec";
                
                const authParameters = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`
                }

                const response = await fetch('https://accounts.spotify.com/api/token', authParameters);
                if (response.ok) {
                    const data = await response.json();
                    setAccessToken(data.access_token);
                } else {
                    console.error('Failed to fetch access token');
                }
            } catch (error) {
                console.error('Error fetching access token:', error);
            }
        };

        fetchAccessToken();
    }, []);

    const handleCountryClick = (countryName) => {
        const searchString = `top 50 ${countryName}`;
        setSearchInput(searchString);
        searchPlaylists(searchString);
    };

    const searchPlaylists = async (searchString) => {
        const searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        };

        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${searchString}&type=playlist&limit=1`, searchParameters);
            if (response.ok) {
                const data = await response.json();
                const playlist = data.playlists.items[0];
                if (playlist) {
                    // Fetch tracks from the playlist
                    const tracksResponse = await fetch(playlist.tracks.href, searchParameters);
                    if (tracksResponse.ok) {
                        const tracksData = await tracksResponse.json();
                        // Fetch details for each track
                        const trackDetails = await Promise.all(tracksData.items.map(async (item) => {
                            const trackResponse = await fetch(item.track.href, searchParameters);
                            return trackResponse.ok ? await trackResponse.json() : null;
                        }));
                        setTracks(trackDetails.filter(track => track !== null));
                        // Pause the audio if playing
                        if (audio) {
                            audio.pause();
                            setAudio(null); // Reset audio instance
                        }
                    } else {
                        console.error('Failed to fetch playlist tracks');
                    }
                } else {
                    setTracks([]);
                }
            } else {
                console.error('Failed to search for playlists');
            }
        } catch (error) {
            console.error('Error searching for playlists', error);
        }
    };

    // Function to play or pause track preview
    const togglePlayPause = (previewUrl) => {
        if (!audio || audio.src !== previewUrl) {
            // Pause the current audio if playing
            if (audio) {
                audio.pause();
            }
            const newAudio = new Audio(previewUrl);
            newAudio.play();
            setAudio(newAudio);
        } else {
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        }
    };

    return (
        
        <>
            <NavBar/>

            <div className="explore-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Explore</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>

            <WorldMap onCountryClick={handleCountryClick} />

            {tracks.length > 0 && (
                <div>
                    <h2>Top Tracks</h2>
                  
                  <div className="tracks-container">
                        {tracks.map(track => (
                            <div className="track-detail-container" key={track.id}>
                            
                                <p>{track.name} by {track.artists.map(artist => artist.name).join(', ')}</p>
                                <p>Album: {track.album.name}</p>
                                <p>Release Date: {track.album.release_date}</p>
                                <img src={track.album.images[0].url} alt={track.album.name} style={{ width: '100px', height: '100px' }} />
                                {track.preview_url && (
                                    <button onClick={() => togglePlayPause(track.preview_url)}>
                                        {audio && !audio.paused && audio.src === track.preview_url ? 'Pause' : 'Play'}
                                    </button>
                                )}
                            
                            </div>
                        ))}
                    </div>
                </div>
            )}

            </div>
        </>
    );
}
