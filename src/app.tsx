import { useEffect, useState } from "react";
import { useSignals } from "@preact/signals-react/runtime";
import Content from "./components/content";
import ModeBar from "./components/modebar";
import StatusBar from "./components/statusbar";
import * as State from "./model/state";
import Edit from "./components/edit";
import { undo, redo } from "./undo"; // Import undo and redo
import HelpModal from "./components/HelpModal";

export function App() {
  useSignals(); // Add useSignals hook
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    State.initializeQuestions();
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Handle cheating toggle
      if (event.key === "?") {
        State.toggleCheating();
        return; // Prevent other handlers if '?' is pressed
      }

      // Handle help modal toggle with 'q' key
      if ((event.key === "q" || event.key === "Q") && State.canQuiz.value) {
        State.setMode("quiz");
        return;
      }

      if (event.key === "Escape" && State.currentMode.value === "list") {
        State.deselectAll();
        return;
      }

      if (event.key === "+") {
        State.addRandomQuestion();
        return; // Prevent other handlers if '?' is pressed
      }

      if (event.key === "Delete") {
        State.deleteAllSelectedQuestions();
        return; // Prevent other handlers if 'Delete' is pressed
      }

      // Handle help modal toggle with 'h' key
      if (event.key === "h" || event.key === "H") {
        setShowHelp((prev) => !prev);
        return;
      }

      // Handle Escape key to exit quiz mode
      if (event.key === "Escape" && State.currentMode.value === "quiz") {
        State.setMode("list");
        return;
      }

      // Handle Ctrl+A/Cmd+A to select all questions
      if ((event.ctrlKey || event.metaKey) && event.key === "a") {
        // Only in list or edit mode where selection makes sense
        if (
          State.currentMode.value === "list" ||
          State.currentMode.value === "edit"
        ) {
          event.preventDefault(); // Prevent browser's select all behavior
          State.selectAll();
          return;
        }
      }

      // Handle Undo/Redo
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const isUndo =
        (isMac ? event.metaKey : event.ctrlKey) && event.key === "z";
      const isRedo =
        (isMac ? event.metaKey && event.shiftKey : event.ctrlKey) &&
        event.key === "y";
      const isRedoShiftZ =
        (isMac
          ? event.metaKey && event.shiftKey
          : event.ctrlKey && event.shiftKey) && event.key === "z";

      if (isUndo && !event.shiftKey) {
        // Standard Undo
        event.preventDefault(); // Prevent browser default undo
        undo();
      } else if (isRedo || isRedoShiftZ) {
        // Standard Redo (Ctrl+Y or Cmd+Shift+Z)
        event.preventDefault(); // Prevent browser default redo
        redo();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []); // Rerun if undo/redo functions change (though they likely won't)

  return (
    <>
      {State.currentMode.value === "edit" && <Edit />}
      <ModeBar />
      <Content />
      <StatusBar />
      <HelpModal show={showHelp} onClose={() => setShowHelp(false)} />
    </>
  );
}
