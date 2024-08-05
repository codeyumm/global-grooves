import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import "../styles/global.css";
import "../styles/explore.css";
import NavBarExplore from "@/components/navBar/navBarExplore";
import Footer from "@/components/footer/footer";

// Get the 3D globe
const GlobeMap = dynamic(() => import('@/components/globemap'), { ssr: false });

export default function Explore() {
    const router = useRouter();

    // States
    const [tracks, setTracks] = useState([]);
    const [accessToken, setAccessToken] = useState("");
    const [playingTrackId, setPlayingTrackId] = useState(null);
    const [audio, setAudio] = useState(null);
    const [view, setView] = useState('map');
    const [likedTracks, setLikedTracks] = useState(new Set());
    const [country, setCountry] = useState("");
    const [showHelpModal, setShowHelpModal] = useState(false);

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
                };

                const response = await fetch('https://accounts.spotify.com/api/token', authParameters);

                console.log("response while getting token", response);

                if (response.ok) {

                    const data = await response.json();
                    console.log("token", data.access_token);
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
        setCountry(countryName);
        const searchString = `top 50 ${countryName}`;
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
        
        console.log("search parameers---", searchParameters);

        try {

            console.log(`Fetching playlists with query: ${searchString}`); 
            const response = await fetch(`https://api.spotify.com/v1/search?q=${searchString}&type=playlist&limit=1`, searchParameters);
            
            console.log("response-------", response);

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                const playlist = data.playlists.items[0];
                if (playlist) {
                    const tracksResponse = await fetch(playlist.tracks.href, searchParameters);
                    if (tracksResponse.ok) {
                        const tracksData = await tracksResponse.json();
                        const trackDetails = await Promise.all(tracksData.items.map(async (item) => {
                            const trackResponse = await fetch(item.track.href, searchParameters);
                            return trackResponse.ok ? await trackResponse.json() : null;
                        }));
                        setTracks(trackDetails.filter(track => track !== null));
                        if (audio) {
                            audio.pause();
                            setAudio(null);
                        }
                        setPlayingTrackId(null); // Reset the currently playing track ID
                        setView('table');
                    } else {
                        console.error('Failed to fetch playlists', response.statusText);
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

    const togglePlayPause = (trackId, previewUrl) => {
        if (playingTrackId !== trackId) {
            if (audio) {
                audio.pause();
                setAudio(null);
            }
            const newAudio = new Audio(previewUrl);
            newAudio.play();
            setAudio(newAudio);
            setPlayingTrackId(trackId);
        } else {
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        }
    };

    const toggleView = () => {
        setView(view === 'map' ? 'table' : 'map');
    };

    const handleLike = async (trackId) => {
        const isLiked = likedTracks.has(trackId);
        const endpoint = `/api/liked-tracks/${isLiked ? 'unlike' : 'like'}`;
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ trackId }),
        });
        if (response.ok) {
            setLikedTracks(prev => {
                const newLikedTracks = new Set(prev);
                if (isLiked) {
                    newLikedTracks.delete(trackId);
                } else {
                    newLikedTracks.add(trackId);
                }
                return newLikedTracks;
            });
        }
    };

    const handleHelpClick = () => {
        setShowHelpModal(true);
    };

    const handleCloseModal = () => {
        setShowHelpModal(false);
    };

    return (
        <>
            <NavBarExplore />

            <div className="explore-container">
                <div className="header">
                    <h1 className="heading">Explore Music from Around the World</h1>
                </div>

                {view === 'map' ? (
                    <>
                       
                       <GlobeMap onCountryClick={handleCountryClick} /> 
                    </>
                ) : (
                    <button onClick={toggleView} className="toggle-view-button">Back to Map</button>
                )}

                {view === 'table' && (
                    <div className="tracks-card-container">
                        <h2 className="country-name">Top Tracks of {country}</h2>
                        <div className="tracks-grid">
                            {tracks.map((track, index) => (
                                <div key={track.id} className="track-card">
                                    <div className="track-number">{index + 1}</div>
                                    <img src={track.album.images[1].url} alt={track.album.name} className="album-art" />
                                    <div className="track-info">
                                        <h3 className="track-title">{track.name}</h3>
                                        <p className="track-artist">
                                            <a href={track.artists[0].external_urls.spotify} target="_blank" rel="noopener noreferrer">
                                                {track.artists.map(artist => artist.name).join(', ')}
                                            </a>
                                        </p>
                                        <p className="track-album">{track.album.name}</p>
                                        <p className="track-date">{track.album.release_date}</p>
                                        <p className="track-duration">
                                            {Math.floor(track.duration_ms / 60000)}:
                                            {Math.floor((track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}
                                        </p>
                                    </div>
                                    <div className="track-actions">
                                        <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="listen-link">
                                            Listen on Spotify
                                        </a>
                                        {track.preview_url && (
                                            <button className="play-button" onClick={() => togglePlayPause(track.id, track.preview_url)}>
                                                {playingTrackId === track.id && audio && !audio.paused ? 'Pause' : 'Play'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <button className="help-button" onClick={handleHelpClick}>?</button>

                {showHelpModal && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <button className="modal-close" onClick={handleCloseModal}>×</button>
                            <h2>How to Use</h2>
                            <p>You can rotate the globe with your mouse and zoom in and out using your scroll wheel. Click on any country to view the top songs from that country.</p>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
}
