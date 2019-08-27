import { useState, useEffect } from "react";
import { createStage } from "../../gameHelpers";
import collideSound from "../../audio/collideSound.wav";
import clearRow from "../../audio/clearRow.wav";

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage());
    const [rowsCleared, setRowsCleared] = useState(0);



    useEffect(() => {
        setRowsCleared(0);
        const audio = new Audio(collideSound);
        const collidingSound = function () {
            audio.play();
        }
        const audio2 = new Audio(clearRow)
        const clearRowSound = function () {
            audio2.play();
        }
        const sweepRows = newStage =>
            newStage.reduce((acc, row) => {
                if (row.findIndex(cell => cell[0] === 0) === -1) {
                    setRowsCleared(prev => prev + 1);
                    acc.unshift(new Array(newStage[0].length).fill([0, "clear"]));
                    clearRowSound();
                    return acc;
                }
                acc.push(row);
                return acc;
            }, [])

        const updateStage = prevStage => {
            // First flush the stage
            const newStage = prevStage.map(row =>
                row.map(cell => (cell[1] === "clear" ? [0, 'clear'] : cell)),
            )
            // Then draw the tetromino
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collided ? "merged" : "clear"}`
                        ]
                    }
                });
            });

            // Check if we collided
            if (player.collided) {
                // play audio here
                collidingSound();
                resetPlayer();
                return sweepRows(newStage);
            }

            return newStage;
        }

        setStage(prev => updateStage(prev));

    }, [player, resetPlayer]);
    return [stage, setStage, rowsCleared];
};