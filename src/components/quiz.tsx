import { useState, useEffect } from "react";
import { useSignals } from "@preact/signals-react/runtime";
import { AwesomeButton } from "react-awesome-button"; // Import AwesomeButton
import * as State from "../model/state";
import styles from "../styles/quiz.module.css";

export default function Quiz() {
  useSignals(); // Add useSignals hook
  const [focusedIndex, setFocusedIndex] = useState(0);

  function shuffleArray(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    if (typeof State.quizQuestion.value !== "string") {
      const allOptions = [
        State.quizQuestion.value.answer,
        State.quizQuestion.value.other1,
        State.quizQuestion.value.other2,
      ];
      shuffleArray(allOptions);
      setShuffledOptions(allOptions);
      setFocusedIndex(0); // Reset focus when question changes
    }
  }, [State.quizQuestion.value]);

  useEffect(() => {
    // Add keyboard event listeners
    const handleKeyDown = (event: KeyboardEvent) => {
      if (typeof State.quizQuestion.value === "string") return;

      switch (event.key) {
        case "ArrowRight":
          setFocusedIndex((prev) => (prev + 1) % shuffledOptions.length);
          break;
        case "ArrowLeft":
          setFocusedIndex((prev) =>
            prev === 0 ? shuffledOptions.length - 1 : prev - 1
          );
          break;
        case "Enter":
        case " ": // Space key
          if (shuffledOptions[focusedIndex]) {
            State.answerQuestion(shuffledOptions[focusedIndex]);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [shuffledOptions, focusedIndex]);

  if (
    State.quizQuestion.value === "done" ||
    State.quizQuestion.value === "notStarted"
  ) {
    return (
      <div className={styles.quizview}>
        <div className={styles.question}>
          {State.correctAnswers.value} Correct,{" "}
          {State.selectedQuestionsCount.value - State.correctAnswers.value}{" "}
          Incorrect
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.quizview}>
        <div className={styles.question}>
          {State.quizQuestion.value.question}
        </div>
        <div className={styles.optionrow}>
          {shuffledOptions.map((option, index) => {
            const isCorrect =
              State.cheating.value &&
              typeof State.quizQuestion.value !== "string" &&
              option === State.quizQuestion.value.answer;

            const isFocused = index === focusedIndex;

            return (
              <AwesomeButton
                key={option}
                type="secondary"
                style={{ flex: 1, height: "100px" }}
                className={`${styles.option} ${
                  isCorrect ? styles.correct : ""
                } ${isFocused ? styles.focus : ""}`}
                onPress={() => State.answerQuestion(option)}
              >
                {option}
              </AwesomeButton>
            );
          })}
        </div>
      </div>
    );
  }
}
