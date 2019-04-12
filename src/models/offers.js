
export class ModelOffers {
  constructor(data) {
    this.offers = data[`offers`] || [];
    this.offers.map((it)=>{
      it.title = it.name;
      it.accepted = false;
      delete it.name;
    });
    this.type = data[`type`];
  }

static parseOffer(data) {
    return new ModelOffers (data);
  }


  static parseOffers(data) {
    return data.map(ModelOffers.parseOffer);
  }

}
