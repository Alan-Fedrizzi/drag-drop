import { Project, ProjectStatus } from "../models/project.js";

// manage the states of the app
// Project State Management
// listener é uma function:
// type Listener = (item: Project[]) => void;
type Listener<T> = (item: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

export class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  // qd clicar no add project button. será adicionado um item no array
  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active // o default de começar um projeto é active
    );
    this.projects.push(newProject);

    this.updateListeners();
    //código colocado no método
    // quando adicionamos um novo projeto, chamamos os listeners
    // for (const listenerFn of this.listeners) {
    // listenerFn(this.projects.slice()); // vamos passar uma cópia do array, por isso o slice
    // não pode ser editado no listener
    // }
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    // o usuário pode mover de uma lista para outra ou soltar na mesma lista
    const project = this.projects.find((prj) => prj.id === projectId); // é true se as ids forem iguais
    // if (project) {
    // vamos checar se mudou o status do projeto antes de renderizar de novo
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      // precisamos avisar os listener que algo mudou e devem renderizar novamente
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice()); // vamos passar uma cópia do array, por isso o slice
      // não pode ser editado no listener
    }
  }
}

export const projectState = ProjectState.getInstance();
// estamos exportando uma constante
// e importando ela em diversos arquivos.
// qts vezes ela roda?? uma só ou uma por arquivo que importamos??
// roda uma vez qd o arquivo é importado por aqulquer outro arquivo.
// se outro arquivo roda isso, ela não roda, pq já rodou uma vez.
