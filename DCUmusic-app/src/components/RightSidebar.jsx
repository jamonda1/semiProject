import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useAuthStore } from '../stores/authStore';
import { getLikedSongs, deleteLikedSong } from '../api/userApi';
import { useSongsListStore } from '../stores/likedSongsList';

const RightSidebar = () => {
    const [randomSongs, setRandomSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const authUser = useAuthStore((s) => s.authUser); // loginAuthUser를 통해 저장된 값을 가져오기 위해
    const [likedSongs, setLikedSongs] = useState(null);
    const lastUpdated = useSongsListStore((s) => s.lastUpdated); // 추가된 노래를 가져오기 위해
    const notifyUpdate = useSongsListStore((s) => s.notifyUpdate);

    useEffect(() => {
        fetchChartData();
    }, []);
    useEffect(() => {
        if (authUser) {
            loadLikedSongs();
        }
    }, [authUser, lastUpdated]);

    const loadLikedSongs = async () => {
        try {
            // 아이디 보내서 목록 가져오기
            const response = await getLikedSongs(authUser.id);
            // 결과값 저장 [{}, {}] 이런 방식으로 들어올듯?
            setLikedSongs(response.data.data);
        } catch (error) {
            if (error.response) {
                const { message } = error.response.data;
                alert(message);
            } else {
                alert('Server Error: ' + error.message);
            }
        }
    };

    // 노래 삭제
    const handleRemoveSong = async (index) => {
        try {
            const response = await deleteLikedSong(index, authUser.id);
            notifyUpdate();
        } catch (error) {
            if (error.response) {
                const { message } = error.response.data;
                alert(message);
            } else {
                alert('Server Error: ' + error.message);
            }
        }
    };

    const fetchChartData = async () => {
        const songsList = useSongsListStore.getState().songsList;
        alert(JSON.stringify(songsList));
        setLoading(true);
        setError(null);
        // alert(JSON.stringify(authUser));
        // alert(authUser.name); 값이 어떻게 전달되고 있는지 확인
        try {
            const response = await fetch('http://localhost:1234/api/melon-chart');
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
            const data = await response.json();

            selectRandomSongs(data);
        } catch (e) {
            console.error('Failed to fetch chart data:', e);
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const selectRandomSongs = (dataArray) => {
        if (dataArray.length === 0) {
            setRandomSongs([]);
            return;
        }

        const shuffled = [...dataArray].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 6);
        setRandomSongs(selected);
    };

    if (error) {
        return <div>오류가 발생했습니다: {error}</div>;
    }

    return (
        <div className="collapse d-md-block" id="recommendCollapse" style={{ marginTop: '3em' }}>
            <div className="recommend-section mb-5">
                <div className="section-header">
                    {/* 좋아요한 음악 */}
                    <h5>Like Music</h5>
                </div>
                {!authUser && (
                    <div
                        // id="div-music"
                        style={{
                            color: '#3565af',
                            maxHeight: '220px', // 높이 제한
                            overflowY: 'auto', // 넘치면 스크롤
                            padding: '1em',
                        }}
                    >
                        <p>로그인이 필요한 서비스입니다!</p>
                    </div>
                )}
                {authUser && !likedSongs && (
                    <div
                        // id="div-music"
                        style={{
                            color: '#3565af',
                            maxHeight: '220px', // 높이 제한
                            overflowY: 'auto', // 넘치면 스크롤
                            padding: '1em',
                        }}
                    >
                        <p>노래를 추가해주세요!</p>
                    </div>
                )}
                {authUser && likedSongs && (
                    <div
                        id="div-music"
                        style={{
                            // display: 'grid',
                            // gridTemplateColumns: 'repeat(3, 1fr)',
                            // color: '#3565af',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)', // 3개씩
                            gap: '1em', // 카드 사이 간격
                            color: '#3565af',
                            maxHeight: '220px', // 높이 제한
                            overflowY: 'auto', // 넘치면 스크롤
                            padding: '0.5em',
                        }}
                    >
                        {likedSongs.map((song, index) => (
                            <div
                                className="music-card"
                                key={index}
                                style={{
                                    positrion: 'relative', // 삭제 버튼을 위해 추가
                                    color: '#3565af',
                                    fontWeight: 'bold',
                                    fontSize: '0.9em',
                                }}
                            >
                                {/* X 버튼 */}
                                <button
                                    onClick={() => handleRemoveSong(index)}
                                    style={{
                                        // position: 'absolute',
                                        top: '5px',
                                        right: '5px',
                                        border: 'none',
                                        background: 'transparent',
                                        color: '#ff4d4f',
                                        fontWeight: 'bold',
                                        fontSize: '1em',
                                        cursor: 'pointer',
                                    }}
                                >
                                    ×
                                </button>
                                <img
                                    src={song.album_image}
                                    className="circular"
                                    alt={`${song.songName} 앨범 커버`}
                                    style={{ marginTop: '1em', width: '70%', height: '60%' }}
                                />
                                <div
                                    className="card-title"
                                    style={{
                                        color: '#3565af',
                                        fontWeight: 'bold',
                                        fontSize: '0.9em',
                                    }}
                                >
                                    {song.song_name}
                                </div>
                                <div
                                    className="card-artist"
                                    style={{
                                        color: '#3565af',
                                        fontWeight: 'bold',
                                        fontSize: '0.9em',
                                    }}
                                >
                                    {song.artist_name}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <hr style={{ border: '2px solid #3565af' }}></hr>
                <div className="section-header">
                    <h5>Random Songs</h5>
                    <Button
                        onClick={fetchChartData}
                        style={{ backgroundColor: '#3565af', width: '110px', height: '35px', fontSize: '0.8em' }}
                    >
                        Refresh
                    </Button>
                </div>
                <div
                    id="div-music"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        color: '#3565af',
                    }}
                >
                    {randomSongs.map((song, index) => (
                        <div
                            className="music-card"
                            key={index}
                            style={{
                                color: '#3565af',
                                fontWeight: 'bold',
                                fontSize: '0.9em',
                            }}
                        >
                            <img
                                src={song.albumImage}
                                className="circular"
                                alt={`${song.songName} 앨범 커버`}
                                style={{ marginTop: '1em', width: '70%', height: '60%' }}
                            />
                            <div
                                className="card-title"
                                style={{
                                    color: '#3565af',
                                    fontWeight: 'bold',
                                    fontSize: '0.9em',
                                }}
                            >
                                {song.songName}
                            </div>
                            <div
                                className="card-artist"
                                style={{
                                    color: '#3565af',
                                    fontWeight: 'bold',
                                    fontSize: '0.9em',
                                }}
                            >
                                {song.artistName}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RightSidebar;
