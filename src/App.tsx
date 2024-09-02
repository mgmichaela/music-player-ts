import React, { useState, useRef, useCallback } from "react";
import "./styles/App.scss";
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import PlayList from "./PlayList";
import Nav from "./components/Nav";

interface SongType {
  id: string;
  name: string;
  artist: string;
  cover: string;
  audio: string;
  active: boolean;
  color: [string, string];
}

interface SongSpan {
  currentTime: number;
  duration: number;
}

const App: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [songs, setSongs] = useState<SongType[]>(PlayList());
  const [currentSong, setCurrentSong] = useState<SongType>(songs[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [libraryStatus, setLibraryStatus] = useState<boolean>(false);
  const [songSpan, setSongSpan] = useState<SongSpan>({
    currentTime: 0,
    duration: 0,
  });

  const timeUpdateHandler = useCallback(
    (e: React.SyntheticEvent<HTMLAudioElement>) => {
      const { currentTime, duration } = e.currentTarget;
      setSongSpan({ currentTime, duration });
    },
    []
  );

  const songEndHandler = useCallback(async () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const nextSong = songs[(currentIndex + 1) % songs.length];
    setCurrentSong(nextSong);

    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    }
  }, [currentSong.id, isPlaying, songs]);

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        songSpan={songSpan}
        setSongSpan={setSongSpan}
        songs={songs}
        setSongs={setSongs}
      />
      <Library
        audioRef={audioRef}
        isPlaying={isPlaying}
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        libraryStatus={libraryStatus}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      />
    </div>
  );
};

export default App;
