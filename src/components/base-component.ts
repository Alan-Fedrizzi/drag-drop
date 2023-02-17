// se o arquivo só exporta uma coisa, nessa caso a class Component, podemos usar default
// ainda podemos exportar outras oisas por nome (só com o export, sem o default)

// Component Base Class
// abstract class, nunca deve ser instanciada, deve ser usada para herança
// se é abstract TS não deixa instanciar a class
export default abstract class Component<
  T extends HTMLElement,
  U extends HTMLElement
> {
  templateElement: HTMLTemplateElement;
  hostElement: T; // depois podemos espcificar melhor, qual tipo de elemento html vai ser
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string // optional elements sempre devem ser os últimos
  ) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach(insertAtStart);
  }

  private attach(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? "afterbegin" : "beforeend",
      this.element
    );
  }

  // força as classes que herdarem essa a ter esses dois métodos abaixo:
  abstract configure(): void;
  abstract renderContent(): void;
  // obs: não podemos ter private abstract methods
}
