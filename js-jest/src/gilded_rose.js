class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality; //bounded 0 and 50
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  static PASSTHRESH1 = 10;
  static PASSTHRESH2 = 5
 
  static updateBrie(item) {
    item.sellIn = item.sellIn - 1;
    if (item.sellIn >= 0) {
      item.quality = Shop.boundQuality(item.quality + 1);
    } else {
      item.quality = Shop.boundQuality(item.quality + 2);
    }
  };

  static updatePass(item) {
    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0) {
      item.quality = 0;
      return;
    }

    let increase;

    if (item.sellIn >= Shop.PASSTHRESH1) {
      increase = 1;
    } else if (item.sellIn >= Shop.PASSTHRESH2) {
      increase = 2;
    } else {
      increase = 3;
    }

    item.quality = Shop.boundQuality(item.quality + increase);
    
  }

  static updateSulf(item) {
    return;
  }

  static updateRegular(item) {
    item.sellIn = item.sellIn - 1;

    if (item.sellIn >= 0) {
      item.quality = Shop.boundQuality(item.quality - 1);
    } else {
      item.quality = Shop.boundQuality(item.quality - 2);
    }    
  }

  static boundQuality(quality) {
    if (quality > 50) {
      return 50;
    } else if (quality < 0) {
      return 0;
    } else {
      return quality;
    }
  };

  static updateItemQuality(item) {
    if (item.name == 'Aged Brie') {
      Shop.updateBrie(item);
    } else if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
      Shop.updatePass(item);
    } else if (item.name == "Sulfuras, Hand of Ragnaros") {
      Shop.updateSulf(item);
    } else {
      Shop.updateRegular(item);
    }
  }

  updateQuality() {
    // side effects ??!!!
    this.items.forEach(item => Shop.updateItemQuality(item))
    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
