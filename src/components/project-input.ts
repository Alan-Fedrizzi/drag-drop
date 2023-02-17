// podemos trocar o nome do import
import { autobind as Autobind } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";
// import { Validatable, validate } from "../util/validation.js";
// podemos agrupar em um objeto
import * as Validation from "../util/validation.js";
import Cmp from "./base-component.js";
// qd import default, podemos dar o nome no import

// ProjectInput Class
// Making the form visible
export class ProjectInput extends Cmp<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

    // pegando os inputs do html e armazenar como properties of this class
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
    // this.attach();
  }

  // é convenção colocar os métodos públicos antes dos privados
  // private configure() {
  configure() {
    // this.element.addEventListener('submit', this.submitHandler.bind(this));
    // estamos dizendo que dento do submitHandler, o this vai ser o mesmo que o this do configure
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent() {} // vai ficar vazio

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validation.Validatable = {
      value: enteredTitle,
      required: true,
    };

    const descriptionValidatable: Validation.Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };

    const peopleValidatable: Validation.Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    // validation
    if (
      !Validation.validate(titleValidatable) ||
      !Validation.validate(descriptionValidatable) ||
      !Validation.validate(peopleValidatable)
      // vamos checar se algum deles é falso, se ao menos um for falso, vai disparar o alert
    ) {
      // verifica se nenhum input está vazio
      alert("Invalid input, please try again!");
      // se entrarmos nesse alert, não estamos retornando um tuple
      // poderíamos throw new Error, mas ele não quer lidar com os erros
      return; // vamos retornar nada
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  // clear the inputs after the submit
  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    // console.log(this.titleInputElement.value); // this não aponta para a class
    // temos que colocar bind no event listener
    const userInput = this.gatherUserInput();
    // vamos checar se userInput é um tuple
    // at run time, não temos como checar se é tuple
    // tuple é um array, vamos checar se é um array
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      // console.log(title, desc, people);

      projectState.addProject(title, desc, people);
      this.clearInputs();
    }
  }
}
