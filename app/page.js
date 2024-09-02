'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [size, setSize] = useState(3);
  const router = useRouter();
  const handleStart = () => {
    router.push(`/select-size/${size}`)
  }

  const handleChange = (e) => {
    setSize(e.target.value);
  }

  return (
    <div>
      <h1>mine</h1>
      <div>
        <label htmlFor="size-select">size:</label>
        <select
          id="size-select"
          value={size}
          onChange={handleChange}
        >
          <option value={3}>3x3</option>
          <option value={4}>4x4</option>
          <option value={5}>5x5</option>
        </select>
      </div>
      <button onClick={handleStart}>
        start
      </button>
    </div>
  );
}
