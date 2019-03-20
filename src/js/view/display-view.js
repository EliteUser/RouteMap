import AbstractView from './abstract-view';

export default class DisplayView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
      <section class="display page-main__display">
        <form class="display__form" action="#">
          <fieldset class="display__fieldset">
            <legend class="visually-hidden">Добавление метки</legend>
            
            <label class="display__label" for="input-title">Название метки</label>
            <input class="display__input" type="text" id="input-title" placeholder="Название метки" maxlength="50">
            
            <label class="display__label" for="input-description">Описание метки</label>
            <input class="display__input" type="text" id="input-description" placeholder="Описание метки" maxlength="50">
          </fieldset>
          
          <div class="display__buttons">
            <button type="submit" class="button display__button" id="add-btn">Добавить метку</button>
            <button type="button" class="button button--reset button--disabled display__button" id="reset-btn" disabled>Очистить маршрут</button>
          </div>
        </form>
      </section>
    `;
  }

  bind() {
    this.formElement = this.element.querySelector(`.display__form`);
    this.inputTitle = this.element.querySelector(`#input-title`);
    this.inputDescription = this.element.querySelector(`#input-description`);

    this.addButton = this.element.querySelector(`#add-btn`);
    this.addButton.addEventListener(`click`, (evt) => {
      this.onAddBtnClick(evt);
    });

    this.resetButton = this.element.querySelector(`#reset-btn`);
    this.resetButton.addEventListener(`click`, (evt) => {
      this.onResetBtnClick(evt);
    });
  }

  enableResetBtn() {
    this.resetButton.disabled = false;
    this.resetButton.classList.remove(`button--disabled`);
  }

  disableResetBtn() {
    this.resetButton.disabled = true;
    this.resetButton.classList.add(`button--disabled`);
  }

  onAddBtnClick() {
  }

  onResetBtnClick() {
  }
}
