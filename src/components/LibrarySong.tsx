import React from "react";

interface Song {
  id: string;
  name: string;
  cover: string;
  artist: string;
  audio: string;
  color: [string, string];
  active: boolean;
}

interface LibrarySongProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  song: Song;
  songs: Song[];
  setSongs: React.Dispatch<React.SetStateAction<Song[]>>;
  setCurrentSong: React.Dispatch<React.SetStateAction<Song>>;
  id: string;
}

const LibrarySong: React.FC<LibrarySongProps> = ({
  audioRef,
  isPlaying,
  song,
  songs,
  setSongs,
  setCurrentSong,
  id,
}) => {
  const songSelectHandler = async () => {
    const selectedSong = songs.filter((state) => state.id === id);
    await setCurrentSong(selectedSong[0]);

    const currentSelectedSong = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(currentSelectedSong);

    if (isPlaying) {
      audioRef.current?.play();
    }
  };

  return (
    <div
      onClick={songSelectHandler}
      className={`library-song-container ${song.active ? "selected" : ""}`}
    >
      <img alt={song.name} src={song.cover} />
      <div className="song-description">
        <h2>{song.name}</h2>
        <h3>{song.artist}</h3>
      </div>
    </div>
  );
};

export default LibrarySong;
