import moment from 'moment';

export class ModelEvent {
  constructor(data) {

    this.id = data[`id`];
    this.price = data[`base_price`];
    this.dateFrom = new Date(data[`date_from`]);
    this.dateTo = new Date(data[`date_to`]);
    this.description = data[`destination`].description;
    this.city = data[`destination`].name;
    this.photos = data[`destination`].pictures || [];
    this.isFavorite = data[`is_favorite`];
    this.offers = new Set(data[`offers`] || []);
    this.type = data[`type`];
  }

  toRAW() {

    return {
      'id': this.id,
      'type': this.type,
      'base_price': this.price,
      'date_from': this.dateFrom,
      'date_to': this.dateTo,
      'is_favorite': this.isFavorite,
      'destination': {
        description: this.description,
        name: this.city,
        pictures: this._photos
      },
      'offers': [...this.offers],
    }
  }



  static parseEvent(data) {
    return new ModelEvent(data);
  }

  static parseEvents(data) {
    return data.map(ModelEvent.parseEvent);
  }
}
