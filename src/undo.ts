import { signal } from "@preact/signals-react";

export interface Command {
  do(): void;
  undo(): void;
}

// Keep class internal
class UndoManager {
  private undoStack: Command[] = [];
  private redoStack: Command[] = [];

  constructor() {}

  execute(command: Command) {
    command.do();
    this.undoStack.push(command);
    this.redoStack = [];
    this.updateSignals(); // Update signals after execution
  }

  // Added function to clean all stacks
  flush() {
    this.undoStack = [];
    this.redoStack = [];
    this.updateSignals(); // Update signals after flushing
  }

  undo() {
    const command = this.undoStack.pop();
    if (command) {
      this.redoStack.push(command);
      command.undo();
      this.updateSignals(); // Update signals after undo
    }
  }

  redo() {
    const command = this.redoStack.pop();
    if (command) {
      this.undoStack.push(command);
      command.do();
      this.updateSignals(); // Update signals after redo
    }
  }

  get canUndo() {
    return this.undoStack.length > 0;
  }

  get canRedo() {
    return this.redoStack.length > 0;
  }

  // Method to update signals
  private updateSignals() {
    canUndoSignal.value = this.canUndo;
    canRedoSignal.value = this.canRedo;
  }
}

// Create a single instance of the UndoManager
const undoManager = new UndoManager();

// Export functions that use the instance
export function execute(command: Command) {
  undoManager.execute(command);
}

export function undo() {
  undoManager.undo();
}

export function redo() {
  undoManager.redo();
}

export function flush() {
  undoManager.flush();
}

// Export signals for UI binding
export const canUndoSignal = signal(undoManager.canUndo);
export const canRedoSignal = signal(undoManager.canRedo);

// Re-export Command if needed elsewhere, otherwise remove
export type { Command };
