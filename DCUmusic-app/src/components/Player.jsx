import {
    Shuffle,
    SkipStartFill,
    PlayCircleFill,
    PauseCircleFill,
    SkipEndFill,
    ArrowRepeat,
    VolumeUp,
    MusicNoteList,
} from "react-bootstrap-icons";

const Player = () => {
    const isPlaying = false;
    // const audioPlayer = document.getElementById("music-player");
    // const volumeSlider = document.getElementById("volume-slider");

    // volumeSlider.addEventListener("input", () => {
    //     audioPlayer.volume = volumeSlider.value;
    // });

    return (
        <>
            <footer id="player" className="fixed-bottom d-flex align-items-center px-4 py-2">
                <div id="mobile-progress-bar">
                    <div id="mobile-progress"></div>
                </div>
                <div className="player-song-info d-flex align-items-center">
                    <img src="https://via.placeholder.com/56" className="rounded-circle me-3" alt="Album Art" />
                    <div style={{ color: "#3565af" }}>
                        <div className="fw-bold">Alone</div>
                        <div className="text-muted small">Highlight (하이라이트)</div>
                    </div>
                </div>

                <div className="player-controls d-flex flex-column align-items-center flex-grow-1 mx-5">
                    <div className="control-buttons d-flex align-items-center mb-1">
                        {/* <i> 태그를 컴포넌트로 교체 */}
                        <button className="btn-icon mx-2">
                            <Shuffle />
                        </button>
                        <button className="btn-icon mx-2">
                            <SkipStartFill />
                        </button>
                        <button className="btn-icon btn-play-main mx-2">
                            {/* isPlaying 상태에 따라 아이콘이 바뀌도록 설정 */}
                            {isPlaying ? <PauseCircleFill size={36} /> : <PlayCircleFill size={36} />}
                        </button>
                        <button className="btn-icon mx-2">
                            <SkipEndFill />
                        </button>
                        <button className="btn-icon mx-2">
                            <ArrowRepeat />
                        </button>
                    </div>
                    <div className="progress-bar-wrapper d-flex align-items-center w-100">
                        <span className="time-current">2:26</span>
                        <input
                            type="range"
                            className="form-range mx-2"
                            defaultValue="70"
                            style={{ backgroundColor: "#3565af" }}
                        />
                        <span className="time-total">3:04</span>
                    </div>
                </div>

                <div className="player-volume d-flex align-items-center">
                    <button className="btn-icon" style={{ color: "#3565af" }}>
                        <VolumeUp />
                    </button>
                    <input type="range" className="form-range volume-slider mx-2" style={{ width: "100px" }} />
                    <button className="btn-icon" style={{ color: "#3565af" }}>
                        <MusicNoteList />
                    </button>
                </div>
            </footer>
            <audio id="audio-player" src="https://samplelib.com/lib/preview/mp3/sample-3s.mp3"></audio>
        </>
    );
};

export default Player;
