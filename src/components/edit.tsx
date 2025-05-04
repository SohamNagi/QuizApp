import { useState } from "react";
import { AwesomeButton } from "react-awesome-button"; // Import AwesomeButton
import styles from "../styles/edit.module.css";
import * as State from "../model/state";

export default function Edit() {
  const [newQuestion, setNewQuestion] = useState(
    State.editQuestion.value.question
  );
  const [newAnswer, setNewAnswer] = useState(State.editQuestion.value.answer);
  const [newOther1, setNewOther1] = useState(State.editQuestion.value.other1);
  const [newOther2, setNewOther2] = useState(State.editQuestion.value.other2);

  function handleQuestionSave() {
    if (
      newQuestion !== State.editQuestion.value.question ||
      newAnswer !== State.editQuestion.value.answer ||
      newOther1 !== State.editQuestion.value.other1 ||
      newOther2 !== State.editQuestion.value.other2
    ) {
      State.pushQuestionEdit(
        State.editQuestion.value,
        newQuestion,
        newAnswer,
        newOther1,
        newOther2
      );
    }
    State.setMode("list");
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.row}>
          <p>Question:</p>
          <input
            type="text"
            value={newQuestion}
            onInput={(e) =>
              setNewQuestion((e.target as HTMLInputElement).value)
            }
          />
        </div>
        <div className={styles.row}>
          <p>Answer:</p>
          <input
            type="text"
            value={newAnswer}
            onInput={(e) => setNewAnswer((e.target as HTMLInputElement).value)}
          />
        </div>
        <div className={styles.row}>
          <p>Option 1:</p>
          <input
            type="text"
            value={newOther1}
            onInput={(e) => setNewOther1((e.target as HTMLInputElement).value)}
          />
        </div>
        <div className={styles.row}>
          <p>Option 2:</p>
          <input
            type="text"
            value={newOther2}
            onInput={(e) => setNewOther2((e.target as HTMLInputElement).value)}
          />
        </div>
        <div className={styles.buttonrow}>
          <AwesomeButton type="primary" onPress={handleQuestionSave}>
            Save
          </AwesomeButton>
          <AwesomeButton type="secondary" onPress={() => State.setMode("list")}>
            Cancel
          </AwesomeButton>
        </div>
      </div>
    </div>
  );
}
