import AbstractView from './abstract-view';

export default class ListView extends AbstractView {
  constructor() {
    super();

    this.placemarksList = [];
    this.draggedElement = null;
  }

  get template() {
    return `
    <section class="placemarks">
      <ol class="placemarks__list">
      </ol>
    </section>
  `;
  }

  bind() {
    this.placemarskList = this.element.querySelector(`.placemarks__list`);
  }

  resetList() {
    this.placemarskList.innerHTML = ``;
  }

  addPlacemark(placemark) {
    this.placemarksList.push(placemark);
    this.placemarskList.appendChild(placemark.element);
    this.addDnDHandlers(placemark.element);
  }

  removePlacemark(placemark) {
    this.placemarskList.removeChild(placemark.element);
  }

  renumberList() {
    Array.from(this.placemarskList.children).forEach((elem, index) => {
      elem.querySelector(`.placemark__number`).innerText = ++index;
    });
  }

  addDnDHandlers(elem) {
    const dragStartHandler = (evt) => {
      this.draggedElement = evt.target.closest(`li`);

      evt.dataTransfer.effectAllowed = `move`;
      evt.dataTransfer.setData(`text/html`, this.draggedElement.outerHTML);

      this.draggedElement.classList.add(`placemarks__item--dragged`);
    };

    const dragOverHandler = (evt) => {
      evt.preventDefault();
      const overElement = evt.target.closest(`li`);

      overElement.classList.add(`placemarks__item--dragover`);
      evt.dataTransfer.dropEffect = `move`;
      return false;
    };

    const dragLeaveHandler = (evt) => {
      const overElement = evt.target.closest(`li`);

      overElement.classList.remove(`placemarks__item--dragover`);
    };

    const dragDropHandler = (evt) => {
      evt.stopPropagation();

      const targetElement = evt.target.closest(`li`);

      if (this.draggedElement !== targetElement) {
        const deletedElem = targetElement.parentNode.removeChild(this.draggedElement);

        targetElement.parentNode.insertBefore(deletedElem, targetElement);

        this.addDnDHandlers(targetElement);
      }

      targetElement.classList.remove(`placemarks__item--dragover`);
      this.draggedElement.classList.remove(`placemarks__item--dragged`);

      const currentElementNumber = parseInt(this.draggedElement.querySelector(`.placemark__number`).textContent, 10);
      const targetElementNumber = parseInt(targetElement.querySelector(`.placemark__number`).textContent, 10);
      this.onDrop(currentElementNumber, targetElementNumber);
      return false;
    };

    const dragEndHandler = () => {
      this.draggedElement.classList.remove(`placemarks__item--dragged`);
      this.draggedElement.classList.remove(`placemarks__item--dragover`);
    };

    elem.addEventListener(`dragstart`, dragStartHandler, false);
    // elem.addEventListener(`touchstart`, dragStartHandler, false);

    elem.addEventListener(`dragover`, dragOverHandler, false);
    // elem.addEventListener(`touchmove`, dragOverHandler, false);

    elem.addEventListener(`dragleave`, dragLeaveHandler, false);
    elem.addEventListener(`drop`, dragDropHandler, false);

    elem.addEventListener(`dragend`, dragEndHandler, false);
    // elem.addEventListener(`touchend`, dragEndHandler, false);
  }

  onDrop() {
  }
}

