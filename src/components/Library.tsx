import React from "react";
import LibrarySong from "./LibrarySong";

interface Song {
  id: string;
  name: string;
  cover: string;
  artist: string;
  audio: string;
  color: [string, string];
  active: boolean;
}

interface LibraryProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  songs: Song[];
  setSongs: React.Dispatch<React.SetStateAction<Song[]>>;
  setCurrentSong: React.Dispatch<React.SetStateAction<Song>>;
  libraryStatus: boolean;
}

const Library: React.FC<LibraryProps> = ({
  audioRef,
  isPlaying,
  songs,
  setSongs,
  setCurrentSong,
  libraryStatus,
}) => {
  return (
    <div
      className={`library-container ${libraryStatus ? "active-library" : ""}`}
    >
      <h1>Library</h1>
      <div className="library">
        {songs.map((song) => (
          <LibrarySong
            isPlaying={isPlaying}
            song={song}
            songs={songs}
            setSongs={setSongs}
            setCurrentSong={setCurrentSong}
            id={song.id}
            key={song.id}
            audioRef={audioRef}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
