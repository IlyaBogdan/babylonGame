import { useRef, useEffect, useState } from "react";
import BasicScene from "../BasicScene";
import styles from './style.module.css';

export const BabylonCanvas: React.FC = () => {

    const babylonCanvas = useRef(null);
    let [basicScene] = useState<BasicScene>();

    useEffect(function() {
        const canvas = babylonCanvas.current!;
        basicScene = new BasicScene(canvas)
    }, []);

    return (
        <>
            <canvas className={styles.canvas} ref={babylonCanvas}></canvas>
        </>
    ); 
}