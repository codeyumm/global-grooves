import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import "../styles/global.css";
import "../styles/explore.css";
import NavBarExplore from "@/components/navBar/navBarExplore";
import Footer from "@/components/footer/footer";

// Get the 3D globe
const GlobeMap = dynamic(() => import('@/pages/svgmap'), { ssr: false });

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

        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${searchString}&type=playlist&limit=1`, searchParameters);
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



    return (
        <>
            <NavBarExplore />

            <div className="explore-container">
                <div className="header">
                    <h1 className="heading">Explore Music from Around the World</h1>
                   
                </div>

              
                    {view === 'map' ? '' :   <button onClick={toggleView} className="toggle-view-button">Back to map</button>}
                

                {view === 'map' ? (
                    <GlobeMap onCountryClick={handleCountryClick} />
                ) : (
                    <div className="tracks-table-container">
                        <h2 className="country-name">Top Tracks of {country}</h2>
                        <table className="tracks-table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Artist</th>
                                    <th>Album</th>
                                    <th>Date Added</th>
                                    <th>Duration</th>
                                    <th>Listen</th>
                                    <th>Play</th>
                                    {/* <th>Like</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {tracks.map(track => (
                                    <tr key={track.id}>
                                        <td className="track-title">
                                            <img src={track.album.images[2].url} alt={track.album.name} className="album-art" />
                                            {track.name}
                                        </td>
                                        <td>
                                            <a href={track.artists[0].external_urls.spotify} target="_blank" rel="noopener noreferrer">
                                                {track.artists.map(artist => artist.name).join(', ')}
                                            </a>
                                        </td>
                                        <td>{track.album.name}</td>
                                        <td>{track.album.release_date}</td>
                                        <td>{Math.floor(track.duration_ms / 60000)}:{Math.floor((track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}</td>
                                        <td>
                                            <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                                                Listen on Spotify
                                            </a>
                                        </td>
                                        <td>
                                            {track.preview_url && (
                                                <button className="play-button" onClick={() => togglePlayPause(track.id, track.preview_url)}>
                                                    {playingTrackId === track.id && audio && !audio.paused ? 'Pause' : 'Play'}
                                                </button>
                                            )}
                                        </td>
                                        {/* <td>
                                            <button className="like-button" onClick={() => handleLike(track.id)}>
                                                {likedTracks.has(track.id) ? 'Unlike' : 'Like'}
                                            </button>
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <Footer/>
        </>
    );
}
