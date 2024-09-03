'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { updateGrid } from './utils/updateGrid';

export default function GridPage({ params }) {
    const { size } = params; //解構出size
    const router = useRouter();
    const handleBack = () => {
        router.push(`/`);
    }
    const gridSize = parseInt(size);

    const randomArray2D = () => {
        const flatArray = randomArray(gridSize);
        const grid = [];
        for (let i = 0; i < gridSize; i++) {
            grid.push(flatArray.slice(i * gridSize, (i + 1) * gridSize));
        }
        return grid;
    };

    function randomArray(e) {
        const all = e * e;
        const num_m = e;
        const num_0 = all - num_m;

        let arr = new Array(num_m).fill("m").concat(new Array(num_0).fill(0));

        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        return arr;
    }
    const [grid, setGrid] = useState(randomArray2D);

    useEffect(() => {
        const updatedGrid = updateGrid(grid, gridSize);
        setGrid([...updatedGrid]);
    }, []);


    const blank = Array.from({ length: gridSize }, () => Array(gridSize).fill(true))
    const [mask, setMask] = useState(blank);

    const handleCellClick = (rowIndex, colIndex) => {
        const newMask = mask.map((row, rIdx) =>
            row.map((cell, cIdx) => {
                if (rIdx === rowIndex && cIdx === colIndex) {
                    return !cell; // 拿掉mask
                }
                return cell;
            })
        );
        setMask(newMask);
    };

    return (
        <div>
            <h1>{size}x{size}</h1>
            <table className="relative"  >
                <tbody >
                    {grid.map((row, rowIndex) => (
                        <tr className="" key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                <td className="w-12 h-12 border border-collapse border-black text-center" key={colIndex}>
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tbody className="absolute top-0 " >
                    {mask.map((row, rowIndex) => (
                        <tr className="" key={rowIndex}>
                            {row.map((hasColor, colIndex) => (
                                <td className={`w-12 h-12 border border-black ${hasColor ? 'bg-blue-500' : ''
                                    }`} key={colIndex}
                                    onClick={() => handleCellClick(rowIndex, colIndex)}
                                >

                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleBack}>
                back
            </button>
        </div>
    )
}
