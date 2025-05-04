import React from "react";
import { AwesomeButton } from "react-awesome-button"; // Import AwesomeButton
import styles from "../styles/helpmodal.module.css";

interface HelpModalProps {
  show: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Help & Controls</h2>
        <p>
          <strong>Modes:</strong>
        </p>
        <ul>
          <li>
            <strong>List Mode:</strong> View all questions. Click a question to
            start the quiz with that question.
          </li>
          <li>
            <strong>Quiz Mode:</strong> Answer the current question. Use the
            navigation buttons (Previous/Next) or keyboard arrows (Left/Right)
            to move between questions. Click 'Submit' or press Enter to check
            your answer.
          </li>
          <li>
            <strong>Edit Mode:</strong> Add new questions or modify existing
            ones. Click 'Add Question' to create a new one. Click on an existing
            question in the list to edit it. Use 'Save' to keep changes or
            'Cancel' to discard.
          </li>
        </ul>
        <p>
          <strong>Keyboard Shortcuts:</strong>
        </p>
        <ul>
          <li>
            <strong>Arrow Left/Right:</strong> Navigate between questions in
            Quiz mode.
          </li>
          <li>
            <strong>Enter/Space:</strong> Submit answer in Quiz mode.
          </li>
          <li>
            <strong>Escape:</strong> Exit Quiz mode and return to List mode.
          </li>
          <li>
            <strong>h:</strong> Toggle this Help modal.
          </li>
          <li>
            <strong>+:</strong> Add a new question (in Edit mode).
          </li>
          <li>
            <strong>-:</strong> Delete the current question (in Edit mode).
          </li>
          <li>
            <strong>?:</strong> Toggle cheat mode (shows correct answers in Quiz
            mode).
          </li>
          <li>
            <strong>Ctrl+Z / Cmd+Z:</strong> Undo last action (like
            adding/deleting questions).
          </li>
          <li>
            <strong>Ctrl+Y / Cmd+Shift+Z:</strong> Redo last undone action.
          </li>
          <li>
            <strong>Ctrl+A / Cmd+A:</strong> Select all questions.
          </li>
        </ul>
        <AwesomeButton
          type="danger"
          onPress={onClose}
          // className={styles.closeButton} // Keep custom styles if needed
        >
          Close
        </AwesomeButton>
      </div>
    </div>
  );
};

export default HelpModal;
