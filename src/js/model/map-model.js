import {rearrangeElements} from "../util";

export default class MapModel {
  constructor() {
    this._placemarks = [];
  }

  get placemarks() {
    return this._placemarks;
  }

  get placemarksCoords() {
    return this._placemarks.map((elem) => (elem.placemark.geometry._coordinates));
  }

  addPlacemark(placemark) {
    this._placemarks.push(placemark);
  }

  removePlacemark(placemark) {
    this._placemarks.splice(this._placemarks.indexOf(placemark), 1);
  }

  renumberPlacemarks() {
    this.placemarks.forEach((elem, index) => {
      const currentIndex = ++index;
      elem.id = currentIndex;
      elem.placemark.properties
        .set({
          iconContent: currentIndex,
        });
    });
  }

  rearrangePlacemarks(moveFrom, moveTo) {
    rearrangeElements(this.placemarks, moveFrom, moveTo);
  }

  resetPlacemarks() {
    this._placemarks = [];
  }
}
