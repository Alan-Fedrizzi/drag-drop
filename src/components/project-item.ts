import { autobind } from "../decorators/autobind.js";
import { Draggable } from "../models/drag-drop.js";
import { Project } from "../models/project.js";
import Cmp from "./base-component.js";

// ProjectItem Class
export class ProjectItem
  extends Cmp<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;

  // convenção - colocar getters and setters depois dos fields.
  // getter is like a function, that must return a value
  get persons() {
    if (this.project.people === 1) {
      return "1 person";
    } else {
      return `${this.project.people} persons`;
    }
  }

  constructor(hostId: string, project: Project) {
    // id não é sempre o mesmo, temos duas listas
    super("single-project", hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  @autobind
  dragStartHandler(event: DragEvent) {
    // console.log(event);
    // podemos tranferir dados no drag e pegar no drop
    // nem todos drag events tem o dataTransfer
    // conseguimos pegar os dados só com o id do project
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
    // diz que vamos mover o elemento para o browser, o cursor muda ('copy' dá um cursor diferente)
  }

  dragEndHandler(_: DragEvent) {
    console.log("DragEnd");
  }

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    // this.element.querySelector("h3")!.textContent =
    //   this.project.people.toString();
    this.element.querySelector("h3")!.textContent = this.persons + " assigned";
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}
