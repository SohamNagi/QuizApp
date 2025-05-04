import { useSignals } from "@preact/signals-react/runtime";
import { AwesomeButton } from "react-awesome-button";
import styles from "../styles/modebar.module.css";
import * as State from "../model/state";

export default function ModeBar() {
  useSignals();
  return (
    <div
      className={`${styles.modebar} ${
        State.currentMode.value === "quiz" ? styles.quizMode : "lightgrey"
      }`}
    >
      {State.currentMode.value !== "quiz" && (
        <>
          <AwesomeButton
            type="secondary"
            size="small" // Optional: Adjust size
            // className={styles.undobutton} // Keep custom styles if needed
            onPress={() => State.undo()}
            disabled={!State.canUndo.value}
          >
            Undo
          </AwesomeButton>
          <AwesomeButton
            type="secondary"
            size="small" // Optional: Adjust size
            // className={styles.redobutton} // Keep custom styles if needed
            onPress={() => State.redo()}
            disabled={!State.canRedo.value}
          >
            Redo
          </AwesomeButton>
        </>
      )}
      {State.currentMode.value === "quiz" && (
        <div className={styles.quizStatus}>{State.quizStatus.value}</div>
      )}
      {State.currentMode.value === "quiz" && (
        <AwesomeButton
          type="danger"
          className={styles.quizButton}
          onPress={() => {
            State.resetQuiz();
            State.setMode("list");
          }}
        >
          Exit
        </AwesomeButton>
      )}

      {State.currentMode.value !== "quiz" && (
        <AwesomeButton
          type="primary"
          className={styles.quizButton} //  Update to use the correct class name
          onPress={() => State.setMode("quiz")}
          disabled={!State.canQuiz.value}
        >
          Quiz
        </AwesomeButton>
      )}
    </div>
  );
}
