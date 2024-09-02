'use client';
import { useRouter } from "next/navigation";
export default function GridPage({ params }) {
    const { size } = params; //解構出size
    const router = useRouter();
    const handleBack = () => {
        router.push(`/`);
    }
    const gridSize = parseInt(size)
    const grid = Array(gridSize)
        .fill(null)
        .map(() => Array(gridSize).fill(null));
    return (
        <div>
            <h1>{size}x{size}</h1>
            <table  >
                <tbody >
                    {grid.map((row, rowIndex) => (
                        <tr className="border border-collapse border-black" key={rowIndex}>
                            {row.map((_, colIndex) => (
                                <td className="border border-collapse border-black" key={colIndex}>
                                    {rowIndex},{colIndex}
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