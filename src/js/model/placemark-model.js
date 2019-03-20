export default class PlacemarkModel {
  constructor(id, placemark, name, description) {
    this._id = id;
    this.placemark = placemark;
    this.name = name;
    this.description = description;
  }

  set id(id) {
    this._id = id;
  }

  get id() {
    return this._id;
  }
}
