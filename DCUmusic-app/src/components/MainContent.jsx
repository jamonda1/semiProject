import { useState, useEffect } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import { useAuthStore } from '../stores/authStore';
import { userLikedSong } from '../api/userApi';
import { useSongsListStore } from '../stores/likedSongsList';

const MainContent = () => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Use a Map to track the liked status of each song by its rank
    const [likedSongs, setLikedSongs] = useState(new Map());
    const authUser = useAuthStore((s) => s.authUser); // loginAuthUser를 통해 저장된 값을 가져오기 위해
    const notifyUpdate = useSongsListStore((s) => s.notifyUpdate); // 좋아요 누른 노래를 store에 저장

    const fetchChartData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:1234/api/melon-chart');
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
            const data = await response.json();
            setChartData(data);
        } catch (e) {
            console.error('Failed to fetch chart data:', e);
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChartData();
    }, []);

    const handleLikeClick = async ({ song }) => {
        if (!authUser) {
            // 로그인하지 않았을 경우 좋아요 이용 불가
            alert('로그인이 필요한 서비스입니다!');
            return;
        }
        // alert(authUser.id);
        const newLikedSongs = new Map(likedSongs);
        const isCurrentlyLiked = newLikedSongs.get(song.rank) || false;
        newLikedSongs.set(song.rank, !isCurrentlyLiked);
        setLikedSongs(newLikedSongs);

        try {
            const response = await userLikedSong(song, authUser.id);
            notifyUpdate();
            if (response.status === 200) {
                alert(response.data.message);
            }
        } catch (error) {
            if (error.response) {
                const { message } = error.response.data;
                alert(message);
            } else {
                alert('Server Error: ' + error.message);
            }
        }
    };

    if (loading) {
        return <div className="text-center my-5">차트 데이터를 로딩 중입니다...</div>;
    }

    if (error) {
        return <div className="text-center my-5 text-danger">오류: {error}</div>;
    }

    return (
        <div style={{ paddingBottom: '100px' }}>
            <div>
                <Container className="my-5">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2 className="mb-0" style={{ color: '#3565af', fontSize: '1.5em' }}>
                            TOP 100
                        </h2>
                        <Button
                            onClick={fetchChartData}
                            style={{ backgroundColor: '#3565af', width: '110px', height: '35px', fontSize: '0.8em' }}
                        >
                            Refresh Chart
                        </Button>
                    </div>
                    {chartData.length > 0 ? (
                        <div className="border rounded shadow-sm" style={{ maxHeight: '590px', overflowY: 'auto' }}>
                            <Table bordered hover responsive className="mb-0">
                                <thead className="chart-Thead">
                                    <tr>
                                        <th>TOP</th>
                                        <th style={{ width: '80px' }}>앨범사진</th>
                                        <th>곡명</th>
                                        <th>아티스트</th>
                                        <th>앨범명</th>
                                        <th>Like</th>
                                    </tr>
                                </thead>
                                <tbody style={{ textAlign: 'center', alignItems: 'center' }}>
                                    {chartData.map((song) => (
                                        <tr key={song.rank} className="chart-all">
                                            <td>{song.rank}</td>
                                            <td>
                                                <img
                                                    src={song.albumImage}
                                                    alt={song.albumName}
                                                    style={{ width: '70px', height: '70px' }}
                                                />
                                            </td>
                                            <td>{song.songName}</td>
                                            <td>{song.artistName}</td>
                                            <td>{song.albumName}</td>
                                            <td>
                                                <button
                                                    id={song.rank}
                                                    type="button"
                                                    style={{ backgroundColor: 'white', all: 'unset' }}
                                                    onClick={() => handleLikeClick({ song })}
                                                >
                                                    {likedSongs.get(song.rank) ? '💙' : '♡'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    ) : (
                        <div className="text-center">차트 데이터가 없습니다.</div>
                    )}
                </Container>
            </div>
        </div>
    );
};

export default MainContent;
