interface HistoryState<T> {
  past: T[];
  present: T;
  future: T[];
}

export class History<T> {
  private state: HistoryState<T>;

  constructor(initialPresent: T) {
    this.state = {
      past: [],
      present: initialPresent,
      future: [],
    };
  }

  get canUndo() {
    return this.state.past.length > 0;
  }

  get canRedo() {
    return this.state.future.length > 0;
  }

  get current() {
    return this.state.present;
  }

  add(newPresent: T) {
    this.state = {
      past: [...this.state.past, this.state.present],
      present: newPresent,
      future: [],
    };
  }

  undo(): T | null {
    if (!this.canUndo) return null;

    const previous = this.state.past[this.state.past.length - 1];
    const newPast = this.state.past.slice(0, -1);

    this.state = {
      past: newPast,
      present: previous,
      future: [this.state.present, ...this.state.future],
    };

    return previous;
  }

  redo(): T | null {
    if (!this.canRedo) return null;

    const next = this.state.future[0];
    const newFuture = this.state.future.slice(1);

    this.state = {
      past: [...this.state.past, this.state.present],
      present: next,
      future: newFuture,
    };

    return next;
  }
} 