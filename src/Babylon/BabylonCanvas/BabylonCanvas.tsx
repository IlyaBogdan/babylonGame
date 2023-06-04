import { useRef, useEffect, useState } from "react";
import BasicScene from "../BasicScene";
import styles from './style.module.css';
import { LevelUI } from "../Components/LevelUI";

export const BabylonCanvas: React.FC = () => {

    const babylonCanvas = useRef(null);
    let [basicScene] = useState<BasicScene>();

    useEffect(function() {
        const canvas = babylonCanvas.current!;
        basicScene = new BasicScene(canvas)
    }, []);

    return (
        <>
            {/* <LevelUI/> из-за этого компонента видеокарта с ума сходит. Пока не разобрался почему */} 
            <canvas className={styles.canvas} ref={babylonCanvas}></canvas>
        </>
    ); 
}