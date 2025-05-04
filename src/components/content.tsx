import { useSignals } from "@preact/signals-react/runtime";
import * as State from "../model/state";
import List from "./list";
import Quiz from "./quiz";
import styles from "../styles/content.module.css";

export default function Content() {
  useSignals(); // Add useSignals hook
  return (
    <div className={styles.contentView}>
      {State.currentMode.value !== "quiz" && <List />}
      {State.currentMode.value === "quiz" && <Quiz />}
    </div>
  );
}
