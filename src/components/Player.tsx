import React, { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

interface Song {
  id: string;
  name: string;
  cover: string;
  artist: string;
  audio: string;
  color: [string, string];
  active: boolean;
}

interface PlayerProps {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  audioRef: React.RefObject<HTMLAudioElement>;
  songSpan: { currentTime: number; duration: number };
  setSongSpan: React.Dispatch<
    React.SetStateAction<{ currentTime: number; duration: number }>
  >;
  songs: Song[];
  setSongs: React.Dispatch<React.SetStateAction<Song[]>>;
  currentSong: Song;
  setCurrentSong: React.Dispatch<React.SetStateAction<Song>>;
  playSong: () => void;
}

const Player: React.FC<PlayerProps> = ({
  isPlaying,
  setIsPlaying,
  audioRef,
  songSpan,
  setSongSpan,
  songs,
  setSongs,
  currentSong,
  setCurrentSong,
  playSong,
}) => {
  useEffect(() => {
    const currentSelectedSong = songs.map((song) => {
      if (song.id === currentSong.id) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong]);

  const playHandler = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        playSong();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const getTime = (time: number): string => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    audioRef.current!.currentTime = Number(e.target.value);
    setSongSpan({ ...songSpan, currentTime: Number(e.target.value) });
  };

  const skipHandler = async (direction: "skip-forward" | "skip-back") => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
      } else {
        await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      }
    }

    if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songSpan.currentTime)}</p>
        <input
          className="player-input-range"
          min={0}
          max={songSpan.duration || 0}
          value={songSpan.currentTime}
          onChange={dragHandler}
          type="range"
        />
        <p>{songSpan.duration ? getTime(songSpan.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipHandler("skip-back")}
          className="play-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipHandler("skip-forward")}
          className="play-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;
