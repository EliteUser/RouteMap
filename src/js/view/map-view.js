import AbstractView from './abstract-view';

export default class MapView extends AbstractView {
  constructor(model) {
    super();

    this.model = model;
    this.init();
  }

  get template() {
    return `      
        <div class="map" id="map"></div>
    `;
  }

  init() {
    const init = () => {
      this.yMap = new window.ymaps.Map(`map`, {
        center: [55.76, 37.64],
        zoom: 10
      });
    };

    window.ymaps.ready(init);
  }

  drawPolyline() {
    if (this._polyline) {
      this.yMap.geoObjects.remove(this._polyline);
    }

    this._polyline = new window.ymaps.GeoObject({
      geometry: {
        type: `LineString`,
        coordinates: this.model.placemarksCoords
      }
    });

    this.yMap.geoObjects.add(this._polyline);
  }

  setAddress(placemark, description) {
    window.ymaps.geocode(placemark.geometry._coordinates)
      .then((res) => {
        const firstGeoObject = res.geoObjects.get(0);
        placemark.properties
          .set({
            balloonContent: firstGeoObject.getAddressLine() + `</br>` + description
          });
      })
      .catch(() => {
        placemark.properties
          .set({
            balloonContent: description
          });
      });
  }

  resetMap() {
    this.yMap.geoObjects.removeAll();
  }

  renderPlacemark() {
  }
}

