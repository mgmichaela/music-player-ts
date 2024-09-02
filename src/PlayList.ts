import { v4 as uuidv4 } from "uuid";
import beach from "./images/beach.jpg";
import boat from "./images/boat.jpg";
import lighthouse from "./images/lighthouse.jpg";
import pictures from "./images/pictures.jpg";
import tea from "./images/tea.jpg";
import waffle from "./images/waffle.jpg";

interface Song {
  name: string;
  cover: string;
  artist: string;
  audio: string;
  color: [string, string];
  id: string;
  active: boolean;
}

const PlayList = (): Song[] => {
  return [
    {
      name: "Beaver Creek",
      cover: lighthouse,
      artist: "Aso, Middle School, Aviino",
      audio: "https://mp3.chillhop.com/serve.php/?mp3=10075",
      color: ["#205950", "#2ab3bf"],
      id: uuidv4(),
      active: true,
    },
    {
      name: "Daylight",
      cover: beach,
      artist: "Aiguille",
      audio: "https://mp3.chillhop.com/serve.php/?mp3=9272",
      color: ["#EF8EA9", "#ab417f"],
      id: uuidv4(),
      active: false,
    },
    {
      name: "Keep Going",
      cover: boat,
      artist: "Swørn",
      audio: "https://mp3.chillhop.com/serve.php/?mp3=9222",
      color: ["#CD607D", "#c94043"],
      id: uuidv4(),
      active: false,
    },
    {
      name: "Nightfall",
      cover: tea,
      artist: "Aiguille",
      audio: "https://mp3.chillhop.com/serve.php/?mp3=9148",
      color: ["#EF8EA9", "#ab417f"],
      id: uuidv4(),
      active: false,
    },
    {
      name: "Reflection",
      cover: pictures,
      artist: "Swørn",
      audio: "https://mp3.chillhop.com/serve.php/?mp3=9228",
      color: ["#CD607D", "#c94043"],
      id: uuidv4(),
      active: false,
    },
    {
      name: "Under the City Stars",
      cover: waffle,
      artist: "Aso, Middle School, Aviino",
      audio: "https://mp3.chillhop.com/serve.php/?mp3=10074",
      color: ["#205950", "#2ab3bf"],
      id: uuidv4(),
      active: false,
    },
  ];
};

export default PlayList;
