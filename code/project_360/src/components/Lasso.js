import React, { useState, useEffect, useRef } from 'react';

const LassoCrop = () => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [coordinates, setCoordinates] = useState([]);
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            coordinates.forEach(({ x, y }, index) => {
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            if (isDrawing) {
                ctx.lineTo(coordinates[coordinates.length - 1].x, coordinates[coordinates.length - 1].y);
            }
            ctx.stroke();
        };

        // draw();
    }, [coordinates, isDrawing]);

    const handleMouseDown = (e) => {
        setIsDrawing(true);
        const { offsetX, offsetY } = e.nativeEvent;
        setCoordinates([{ x: offsetX, y: offsetY }]);
    };

    const handleMouseMove = (e) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = e.nativeEvent;
        setCoordinates(prevCoordinates => [...prevCoordinates, { x: offsetX, y: offsetY }]);
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
        // Send coordinates to backend for processing
        console.log("Coordinates:", coordinates);
    };

    return (
        <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        />
    );
};

export default LassoCrop;
