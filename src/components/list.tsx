import { useSignals } from "@preact/signals-react/runtime";
import styles from "../styles/List.module.css";
import Toolbar from "./toolbar";
import * as State from "../model/state";
import ListQuestion from "./listquestion";

export default function List() {
  useSignals(); // Add useSignals hook
  return (
    <div className={styles.listview}>
      <Toolbar />
      <div id="qbox">
        <div id="bottom" className={styles.bottom}>
          {State.activeQuestions.value.map((question) => (
            <ListQuestion key={question.question} question={question} />
          ))}
        </div>
      </div>
    </div>
  );
}
