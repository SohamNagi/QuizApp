import { useState } from "react";
import { useSignals } from "@preact/signals-react/runtime";
import { AwesomeButton } from "react-awesome-button"; // Import AwesomeButton
import styles from "../styles/statusbar.module.css";
import * as State from "../model/state";
import HelpModal from "./HelpModal";

export default function StatusBar() {
  useSignals();
  const [showHelp, setShowHelp] = useState(false);

  const toggleHelpModal = () => {
    setShowHelp(!showHelp);
  };

  return (
    <>
      <div className={styles.statusBar}>
        <span>{State.statusText.value}</span>
        {State.cheating.value && (
          <span className={styles.cheatText}>CHEATING!</span>
        )}
        {/* Replace button with AwesomeButton */}
        <AwesomeButton
          type="secondary" // Or choose another type
          size="small"
          onPress={toggleHelpModal}
          className={styles.helpButtonContainer} // Add className prop
        >
          Help
        </AwesomeButton>
      </div>
      <HelpModal show={showHelp} onClose={toggleHelpModal} />
    </>
  );
}
