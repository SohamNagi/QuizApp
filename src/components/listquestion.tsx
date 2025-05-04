import styles from "../styles/ListQuestion.module.css";
import { Question } from "../model/questions";
import * as State from "../model/state";

interface ListQuestionProps {
  question: Question;
}

const ListQuestion = ({ question }: ListQuestionProps) => {
  const handleCheckboxChange = (questionText: string) => {
    State.activeQuestions.value = State.activeQuestions.value.map((q) =>
      q.question === questionText ? { ...q, selected: !q.selected } : q
    );
  };

  function handleDoubleClick() {
    State.editQuestion.value = question;
    State.setMode("edit");
  }

  return (
    <div className={styles.questionbox}>
      <input
        type="checkbox"
        checked={question.selected}
        className={styles.checkbox}
        onChange={() => handleCheckboxChange(question.question)}
      />
      <div onDoubleClick={handleDoubleClick} className={styles.text}>
        <p>{question.question}</p>
      </div>
    </div>
  );
};

export default ListQuestion;
