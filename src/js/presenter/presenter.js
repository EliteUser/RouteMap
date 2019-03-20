import MapModel from '../model/map-model';
import MapView from '../view/map-view';
import PlacemarkModel from '../model/placemark-model';
import PlacemarkView from '../view/placemark-view';
import DisplayView from '../view/display-view';
import ListView from '../view/list-view';

export default class UserPresenter {
  constructor() {
    this.id = 0;
  }

  /* Показ карты */

  showMap() {
    const main = document.querySelector(`.page-main`);
    this.mapModel = new MapModel();
    this.mapView = new MapView(this.mapModel);

    main.appendChild(this.mapView.element);

    /* Добавление метки */

    this.mapView.renderPlacemark = (id, name, description) => {
      name = (name === ``) ? `Без имени` : name;
      description = (description === ``) ? `Без описания` : description;

      /* Создаем объект карты (метка) */
      const placemarkObject = new window.ymaps.GeoObject({
        geometry: {
          type: `Point`,
          coordinates: this.mapView.yMap.getCenter()
        },

        properties: {
          iconContent: id,
          hintContent: name,
          balloonContentHeader: name
        }
      }, {
        draggable: true,
        balloonPane: `outerBalloon`
      });

      /* Добавляем события перетаскивания */
      placemarkObject.events.add(`dragend`, () => {
        this.mapView.setAddress(placemarkObject, description);
        this.mapView.drawPolyline();
      });

      /* Устанавливаем адрес в описании балуна */
      this.mapView.setAddress(placemarkObject, description);

      /* Добавляем метку и рисуем ее на карте, перерисовываем линии */
      this.showPlacemark(id, placemarkObject, name, description);
      this.mapView.yMap.geoObjects.add(placemarkObject);
      this.mapView.drawPolyline();
    };
  }

  /* Добавление метки в лист */

  showPlacemark(id, placemarkObject, name, description) {
    /* Создаем метку на основе объекта карты */
    const placemarkModel = new PlacemarkModel(id, placemarkObject, name, description);
    const placemarkView = new PlacemarkView(placemarkModel);

    /* Обработчик удаления метки из списка */
    placemarkView.onDeleteClick = () => {
      /* Удаляем узел из списка */
      this.listView.removePlacemark(placemarkView);

      /* Удаляем обьект метки и саму метку с карты */
      this.mapView.model.removePlacemark(placemarkModel);
      this.mapView.yMap.geoObjects.remove(placemarkObject);

      /* Перенумеровываем метки на карте и список, перерисовываем линию */
      this.mapModel.renumberPlacemarks();
      this.listView.renumberList();
      this.mapView.drawPolyline();

      /* Устанавливаем текущий id (для следующей метки) */
      this.id = this.mapModel.placemarks.length;

      /* Сбрасываем состояние, если удалили последнюю метку из списка*/
      if (this.mapModel.placemarks.length === 0) {
        this.displayView.resetButton.click();
      }
    };

    /* Добавляем метку в массив и отрисовываем карточку в лист */
    this.mapView.model.addPlacemark(placemarkModel);
    this.listView.addPlacemark(placemarkView);
  }

  /* Показ контролов и полей ввода */

  showDisplay() {
    const mainWrapper = document.querySelector(`.page-main__wrapper`);
    this.displayView = new DisplayView();

    /* Обработчик нажатия на кнопку добавления метки */

    this.displayView.onAddBtnClick = (evt) => {
      evt.preventDefault();

      /* Забираем значения полей ввода*/
      const name = this.displayView.inputTitle.value;
      const description = this.displayView.inputDescription.value;

      /* Рисуем метку на карте */
      this.mapView.renderPlacemark(++this.id, name, description);

      /* Активируем кнопку сброса */
      if (this.mapModel.placemarks.length !== 0) {
        this.displayView.enableResetBtn();
      }

      this.displayView.formElement.reset();
    };

    /* Обработчик нажатия на кнопку сброса маршрута */

    this.displayView.onResetBtnClick = (evt) => {
      evt.preventDefault();

      /* Сбрасываем id для следующей метки*/
      this.id = 0;

      /* Отключаем кнопку */
      this.displayView.disableResetBtn();

      /* Сбрасываем все метки, удаляем объекты на карте и чистим список */
      this.mapModel.resetPlacemarks();
      this.mapView.resetMap();
      this.listView.resetList();
    };

    mainWrapper.appendChild(this.displayView.element);
  }

  /* Показ списка с описанием меток */

  showList() {
    const mainWrapper = document.querySelector(`.page-main__wrapper`);

    this.listView = new ListView();
    this.listView.mapPlacemarks = this.mapModel.placemarks;

    /* Коллбэк по дропу карточки */

    this.listView.onDrop = (currentNumber, targetNumber) => {
      if (currentNumber !== targetNumber) {
        /* Переставляем метки в массиве объектов, перенумеровываем и перерисовываем метки*/
        this.mapModel.rearrangePlacemarks(currentNumber, targetNumber);
        this.mapModel.renumberPlacemarks();
        this.listView.renumberList();
        this.mapView.drawPolyline();
      }
    };

    mainWrapper.appendChild(this.listView.element);
  }
}
