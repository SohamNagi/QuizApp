import { useSignals } from "@preact/signals-react/runtime";
import { AwesomeButton } from "react-awesome-button";
import styles from "../styles/toolbar.module.css"; // Import CSS module
import * as State from "../model/state";

export default function Toolbar() {
  useSignals(); // Add useSignals hook
  return (
    <div className={styles.toolbar}>
      <AwesomeButton
        type="secondary"
        onPress={() => State.selectAll()}
        disabled={!State.canSelectAll.value}
      >
        All
      </AwesomeButton>
      <AwesomeButton
        type="secondary"
        onPress={() => State.deselectAll()}
        disabled={!State.canDeselectAll.value}
      >
        None
      </AwesomeButton>
      <AwesomeButton
        type="danger"
        onPress={() => State.deleteAllSelectedQuestions()}
        disabled={!State.canDeleteQuestion.value}
      >
        Delete
      </AwesomeButton>
      <AwesomeButton
        type="primary"
        onPress={() => State.addRandomQuestion()}
        disabled={!State.canAddQuestion.value}
      >
        Add
      </AwesomeButton>
    </div>
  );
}
