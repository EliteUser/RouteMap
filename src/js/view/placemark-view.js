import AbstractView from './abstract-view';

export default class PlacemarkView extends AbstractView {
  constructor(model) {
    super();

    this.model = model;
  }

  get template() {
    return `
      <li class="placemarks__item" draggable="true">
        <div class="placemark">
           <div class="placemark__dragzone">
             <span class="placemark__icon"></span>
           </div>
           <span class="placemark__number">${this.model.id}</span>
           <div class="placemark__wrapper">
              <h2 class="placemark__title">${this.model.name}</h2>
              <p class="placemark__text">${this.model.description}</p>
           </div>
           <button type="button" class="placemark__button" aria-label="Удалить метку"></button>
        </div>
      </li>
    `;
  }

  bind() {
    this.deleteButton = this.element.querySelector(`.placemark__button`);
    this.deleteButton.addEventListener(`click`, () => {
      this.onDeleteClick();
    });
  }

  onDeleteClick() {
  }
}
