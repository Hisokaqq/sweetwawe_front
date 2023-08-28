import {
    v4 as uuidv4
} from "uuid";

const songss = [{
        name: "Under the City Stars",
        cover: "https://chillhop.com/wp-content/uploads/2020/09/0255e8b8c74c90d4a27c594b3452b2daafae608d-1024x1024.jpg",
        artist: "Aso, Middle School, Aviino",
        audio: "https://mp3.chillhop.com/serve.php/?mp3=10074",
        id: uuidv4(),
        active: false,
        isLiked: false,
    },
    {
        name: "Tokyo Drift",
        cover: "/images/tokyo.jpg",
        artist: "Teriyaki Boyz",
        audio: "/images/tokyo.mp3",
        id: uuidv4(),
        active: false,
        isLiked: false,
    },
    {
        name: "Bad Decisions",
        cover: "/images/badDecisions.jpg",
        artist: "benny blanco",
        audio: "/images/badDecisions.mp3",
        id: uuidv4(),
        active: false,
        isLiked: false,
    },
    {
        name: "RICKY",
        cover: "/images/RICKY.jpg",
        artist: "DENZELCURRYPH",
        audio: "/images/RICKY.mp3",
        id: uuidv4(),
        active: false,
        isLiked: false,
    },
    {
        name: "Get Back",
        cover: "/images/Get Back.jpg",
        artist: "Pop Smoke",
        audio: "/images/Get Back.mp3",
        id: uuidv4(),
        active: false,
        isLiked: false,
    },
    {
        name: "Best Friend",
        cover: "/images/Best Friend.jpg",
        artist: "50 Cent",
        audio: "/images/Best Friend.mp3",
        id: uuidv4(),
        active: false,
        isLiked: false,
    },
    //ADD MORE HERE
];

export default songss;