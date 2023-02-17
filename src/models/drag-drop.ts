// Drag & Drop Interfaces
export interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

export interface DragTarget {
  // permite o drop
  dragOverHandler(event: DragEvent): void;
  // handle the drop
  dropHandler(event: DragEvent): void;
  // visual feedback qd desiste do drop
  dragLeaveHandler(event: DragEvent): void;
}
