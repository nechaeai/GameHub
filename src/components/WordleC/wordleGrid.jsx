import React from "react";
import wordleRow from "./wordleRow";

export default function WordleGrid() {
    const numRow = [1, 2, 3, 4, 5, 6]
    return (
        <div className="m-4">
            {
                numRow.map((wordleRow, index) => (<wordleRow key={index} id={index} />))
            }
        </div>
    );
}