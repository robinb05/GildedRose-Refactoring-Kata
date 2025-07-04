class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  static PASSTHRESH1 = 10;
  static PASSTHRESH2 = 5;
  static QUAL_LOWER = 0;
  static QUAL_UPPER = 50;
  static REG_DEGRADE_PRE = 1;
  static REG_DEGRADE_POST = 2;

  static updateItemSellIn(item) {
    if (item.name != "Sulfuras, Hand of Ragnaros") {
      return (item.sellIn - 1);
    } else {
      return (item.sellIn);
    }
  }
 
  static updateBrieQuality(item) {
    if (item.sellIn >= 0) {
      return Shop.boundQuality(item.quality + 1);
    } else {
      return Shop.boundQuality(item.quality + 2);
    }
  };

  static updatePassQuality(item) {

    if (item.sellIn >= Shop.PASSTHRESH1) {
      return Shop.boundQuality(item.quality + 1);
    } else if (item.sellIn >= Shop.PASSTHRESH2) {
      return Shop.boundQuality(item.quality + 2);
    } else if (item.sellIn >= 0) {
      return Shop.boundQuality(item.quality + 3);
    } else {
      return 0;
    }

  }

  static updateSulfQuality(item) {
    return item.quality;
  }

  static updateRegularQuality(item) {

    if (item.sellIn >= 0) {
      return Shop.boundQuality(item.quality - Shop.REG_DEGRADE_PRE);
    } else {
      return Shop.boundQuality(item.quality - Shop.REG_DEGRADE_POST);
    }    
  }

  static updateConjuredQuality(item) {
    if (item.sellIn >= 0) {
      return Shop.boundQuality(item.quality - 2*Shop.REG_DEGRADE_PRE);
    } else {
      return Shop.boundQuality(item.quality - 2*Shop.REG_DEGRADE_POST);
    } 
  }

  static boundQuality(quality) {
    if (quality > Shop.QUAL_UPPER) {
      return Shop.QUAL_UPPER;
    } else if (quality < Shop.QUAL_LOWER) {
      return Shop.QUAL_LOWER;
    } else {
      return quality;
    }
  };

  static updateItemQuality(item) {
    if (item.name == 'Aged Brie') {
      return Shop.updateBrieQuality(item);
    } else if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
      return Shop.updatePassQuality(item);
    } else if (item.name == "Sulfuras, Hand of Ragnaros") {
      return Shop.updateSulfQuality(item);
    } else if (item.name == "Conjured") {
      return Shop.updateConjuredQuality(item);
    } else {
      return Shop.updateRegularQuality(item);
    }
  }

  updateQuality() {
    this.items.forEach(item => {
      item.sellIn = Shop.updateItemSellIn(item);
      item.quality = Shop.updateItemQuality(item);
    }
    );

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
