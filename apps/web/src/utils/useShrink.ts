import { useEffect, useState } from "react";

const getWindowDimensions = (window: Window & typeof globalThis) => {
    const { innerWidth: width } = window;
    return width;
};

export const useShrink = () => {
    const [shrink, setShrink] = useState(true);

    const maxHeightFn = (width: number) => width <= 992 ? false : true;
    useEffect(() => {
        function handleResize() {
            setShrink(maxHeightFn(getWindowDimensions(window)));
        }
        handleResize()
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return [shrink];
};