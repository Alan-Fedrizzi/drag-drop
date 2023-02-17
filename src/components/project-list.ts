import { autobind } from "../decorators/autobind.js";
import { DragTarget } from "../models/drag-drop.js";
import { Project, ProjectStatus } from "../models/project.js";
import { projectState } from "../state/project-state.js";
import Cmp from "./base-component.js";
import { ProjectItem } from "./project-item.js";

// ProjectList Class
export class ProjectList
  extends Cmp<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: Project[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);

    this.assignedProjects = [];

    // this.attach(); removido pois vai ocorrer no super
    this.configure();
    this.renderContent();
    // esses dois método são chamados aqui e não na class Component pois podem depender de dados que a class Component ainda não tem, por isso é mais seguro chamar eles aqui.
  }

  @autobind
  dragOverHandler(event: DragEvent) {
    // checar se o drag é permitido, se é do tipo que especificamos
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      // o drop só funciona se fizermos o preventDefault aqui.
      event.preventDefault();
      // mudar o visual da ul qd é uma droppable area
      // no css tem uma classe droppable (muda o background)
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  }

  @autobind // vai se referir ao ProjectList, que tem propriedade type
  dropHandler(event: DragEvent) {
    // console.log(event);
    // console.log(event.dataTransfer!.getData("text/plain")); // É o Project id.
    const projId = event.dataTransfer!.getData("text/plain");
    projectState.moveProject(
      projId,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  @autobind
  dragLeaveHandler(_: DragEvent) {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }

  configure() {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);

    projectState.addListener((projects: Project[]) => {
      // filter the projects
      const relevantProjects = projects.filter((prj) => {
        if (this.type === "active") {
          // se é true, mantemos o item, se é false ele cai fora
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector(
      "h2"
    )!.textContent = `${this.type.toUpperCase()} PROJECTS`;
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    // vamos esvazias a lista antes de renderizar ela inteira novamente
    // poderíamos checar o que existe no DOM e renderizar só o que falta, mas assim é mais fácil
    listEl.innerHTML = "";
    for (const prjItem of this.assignedProjects) {
      // const listItem = document.createElement("li");
      // listItem.textContent = prjItem.title;
      // listEl?.appendChild(listItem);
      new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
    }
  }
}
