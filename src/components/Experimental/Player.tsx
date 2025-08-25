import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import type { Advertisement } from "../../models/Advertisement";
import { useAdvertisement } from "../../hooks/useAdvertisment";
import TableDisplay from "../TableDisplay/TableDisplay";

const Player: React.FC = () => {
    const playerRef = useRef(null)
    const {advertisements} = useAdvertisement();
    const [blocks, setBlocks] = useState<(Advertisement[] | "table")[]>([]);
    const [currentBlock, setCurrentBlock] = useState(0);
    const [currentVideo, setCurrentVideo] = useState(0);

    useEffect(() => {
        const b = generateBlocks(advertisements);
        setBlocks(b);
    }, []);

    const handleVideoEnded = () => {
        const block = blocks[currentBlock] as Advertisement[];

        if (currentVideo + 1 < block.length) {
            setCurrentVideo((prev) => prev + 1);
        } else {
            // terminaron los videos del bloque
            setCurrentBlock((prev) => (prev + 1) % blocks.length);
            setCurrentVideo(0);
        }
    };

    if (blocks.length === 0) return <p>Cargando...</p>;

    const block = blocks[currentBlock];

    if (block === "table") {
        return <TableDisplay></TableDisplay>;
    }

    return (
        <div className="w-screen justify-center">
            <ReactPlayer
                ref={playerRef}
                src={block[currentVideo].URL}
                playing={true}
                muted={true}
                controls={false}
                style={{
                    width: "100%",
                    height: "100%",
                    aspectRatio: "16/9",
                }}
                onEnded={() => {
                    handleVideoEnded()
                }} />
        </div>
    );
};

// 🔹 Aquí se definen los bloques
function generateBlocks(ads: Advertisement[]): (Advertisement[] | "table")[] {
    const grouped: Record<number, Advertisement[]> = {};

    ads.forEach((ad) => {
        if (!grouped[ad.repetitions]) grouped[ad.repetitions] = [];
        grouped[ad.repetitions].push(ad);
    });

    const blocks: (Advertisement[] | "table")[] = [];

    // Primero todos los de 100
    if (grouped[100]) {
        blocks.push(grouped[100]);
        blocks.push("table");
    }

    // Luego 100 + 50 juntos
    if (grouped[50]) {
        const combined = [...(grouped[100] ?? []), ...grouped[50]];
        blocks.push(combined);
        blocks.push("table");
    }

    return blocks;
}

export default Player;