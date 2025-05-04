// Use signals-react adapter
import { signal, computed } from "@preact/signals-react";
import { Question, questionSet } from "./questions.ts";
// Import functions and signals from undo.ts, not the class
import {
  Command,
  execute as executeCommand, // Rename to avoid conflict if needed
  undo as undoAction,
  redo as redoAction,
  flush as flushActions,
  canUndoSignal,
  canRedoSignal,
} from "../undo.ts";

// Core state signals
export const activeQuestions = signal<Question[]>([]);
export const cheating = signal(false);
export const editQuestion = signal<Question>(questionSet[0]);
export const quizQuestion = signal<Question | "notStarted" | "done">(
  "notStarted"
);
export const currentQuestion = signal(1);
export const correctAnswers = signal(0);
export const currentMode = signal<"quiz" | "edit" | "list">("list");

// Use the exported signals directly
export const canUndo = canUndoSignal;
export const canRedo = canRedoSignal;

// Remove the local undoManager instance
// const undoManager = new UndoManager();

export const statusText = computed(() => {
  const selectedCount = selectedQuestionsCount.value;
  return activeQuestions.value.length === 1
    ? `${activeQuestions.value.length} question${
        selectedCount > 0 ? ` (${selectedCount} selected)` : ""
      }`
    : `${activeQuestions.value.length} questions${
        selectedCount > 0 ? ` (${selectedCount} selected)` : ""
      }`;
});

export const quizStatus = computed(() => {
  const selectedCount = selectedQuestionsCount.value;
  if (quizQuestion.value === "done") {
    return "Quiz Completed";
  } else {
    return `Question ${currentQuestion.value} of ${selectedCount}`;
  }
});

// Computed Properties
export const selectedQuestionsCount = computed(
  () => activeQuestions.value.filter((q) => q.selected).length
);

export const unansweredQuestions = computed(() =>
  activeQuestions.value.filter((q) => q.answerStatus === "No" && q.selected)
);

export const canAddQuestion = computed(() => activeQuestions.value.length < 10);

export const canDeleteQuestion = computed(
  () => selectedQuestionsCount.value > 0
);

export const canQuiz = computed(
  () => selectedQuestionsCount.value > 0 && currentMode.value === "list"
);

export const canSelectAll = computed(
  () => selectedQuestionsCount.value < activeQuestions.value.length
);

export const canDeselectAll = computed(() => selectedQuestionsCount.value > 0);

// Undo/Redo Methods - Use imported functions
export const flush = () => {
  flushActions();
  // No need to update canUndo/canRedo signals here, undo.ts handles it
};
export const undo = () => {
  undoAction();
  // No need to update canUndo/canRedo signals here, undo.ts handles it
};
export const redo = () => {
  redoAction();
  // No need to update canUndo/canRedo signals here, undo.ts handles it
};

// Mode Management
export const setMode = (mode: "quiz" | "edit" | "list") => {
  currentMode.value = mode;
  if (mode === "quiz") {
    startQuiz();
  }
};

// Quiz Logic
function startQuiz() {
  currentQuestion.value = 1;
  correctAnswers.value = 0;
  setRandomUnansweredQuestion();
}

export const resetQuiz = () => {
  correctAnswers.value = 0;
  currentQuestion.value = 0;
  // Create a new array with updated properties
  activeQuestions.value = activeQuestions.value.map((q) => ({
    ...q,
    selected: false,
    answerStatus: "No" as const, // Ensure type safety
  }));
  quizQuestion.value = "notStarted";
  setMode("list");
};

export const setRandomUnansweredQuestion = () => {
  if (unansweredQuestions.value.length > 0) {
    const randomIndex = Math.floor(
      Math.random() * unansweredQuestions.value.length
    );
    quizQuestion.value = unansweredQuestions.value[randomIndex];
  } else {
    quizQuestion.value = "done";
  }
};

export const answerQuestion = (selectedAnswer: string) => {
  if (quizQuestion.value === "notStarted" || quizQuestion.value === "done")
    return;

  const currentQ = quizQuestion.value; // Cache current question object
  const isCorrect = selectedAnswer === currentQ.answer;

  // Update the activeQuestions array by creating a new one
  activeQuestions.value = activeQuestions.value.map((q) => {
    if (q === currentQ) {
      return {
        ...q,
        answerStatus: isCorrect ? ("Correct" as const) : ("Wrong" as const), // Ensure type safety
      };
    }
    return q;
  });

  // Update quiz state
  if (isCorrect) {
    correctAnswers.value++;
  }

  currentQuestion.value++;
  setRandomUnansweredQuestion();
};

// Question Management Methods - Use imported executeCommand
export const addRandomQuestion = () => {
  let randomQuestion: Question;
  do {
    randomQuestion =
      questionSet[Math.floor(Math.random() * questionSet.length)];
  } while (
    activeQuestions.value.some(
      (activeQuestion) => activeQuestion.question === randomQuestion.question
    )
  );

  const newQuestion = {
    ...randomQuestion,
    selected: false,
    answerStatus: "No" as const,
  };

  const command: Command = {
    do: () => {
      activeQuestions.value = [...activeQuestions.value, newQuestion];
      // No need to update signals here
    },
    undo: () => {
      activeQuestions.value = activeQuestions.value.slice(0, -1);
      // No need to update signals here
    },
  };
  executeCommand(command); // Use imported function
};

export const deleteAllSelectedQuestions = () => {
  const deletedQuestions = activeQuestions.value.filter((x) => x.selected);
  if (deletedQuestions.length === 0) return;

  const command: Command = {
    do: () => {
      activeQuestions.value = activeQuestions.value.filter((x) => !x.selected);
      // No need to update signals here
    },
    undo: () => {
      activeQuestions.value = [...activeQuestions.value, ...deletedQuestions];
      // No need to update signals here
    },
  };

  executeCommand(command); // Use imported function
};

// Selection Methods
export const selectAll = () => {
  activeQuestions.value = activeQuestions.value.map((q) => ({
    ...q,
    selected: true,
  }));
};

export const deselectAll = () => {
  activeQuestions.value = activeQuestions.value.map((q) => ({
    ...q,
    selected: false,
  }));
};

export const pushQuestionEdit = (
  question: Question,
  newQuestion: string,
  newAnswer: string,
  newOther1: string,
  newOther2: string
) => {
  const oldQuestion = question.question;
  const oldAnswer = question.answer;
  const oldOther1 = question.other1;
  const oldOther2 = question.other2;

  const command: Command = {
    do: () => {
      question.question = newQuestion;
      question.answer = newAnswer;
      question.other1 = newOther1;
      question.other2 = newOther2;
      // Force update if needed by creating a new array reference
      activeQuestions.value = [...activeQuestions.value];
      // No need to update signals here
    },
    undo: () => {
      question.question = oldQuestion;
      question.answer = oldAnswer;
      question.other1 = oldOther1;
      question.other2 = oldOther2;
      // Force update if needed by creating a new array reference
      activeQuestions.value = [...activeQuestions.value];
      // No need to update signals here
    },
  };

  executeCommand(command); // Use imported function
};

// Utility Methods
export const toggleCheating = () => {
  cheating.value = !cheating.value;
};

// Initial Setup
export function initializeQuestions() {
  for (let i = 0; i < 2; i++) {
    addRandomQuestion();
  }
  flush(); // Call the updated flush function
}
