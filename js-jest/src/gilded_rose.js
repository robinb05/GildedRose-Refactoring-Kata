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
  static PASS_THRESH1 = 10;
  static PASS_THRESH2 = 5;
  static QUAL_LOWER = 0;
  static QUAL_UPPER = 50;
  static REG_DEGRADE_PRE = 1;
  static REG_DEGRADE_POST = 2;

  static getNewItemSellIn(item) {
    if (item.name != "Sulfuras, Hand of Ragnaros") {
      return (item.sellIn - 1);
    } else {
      return (item.sellIn);
    }
  }
 
  static getNewBrieQuality(item) {
    if (item.sellIn >= 0) {
      return Shop.boundQuality(item.quality + 1);
    } else {
      return Shop.boundQuality(item.quality + 2);
    }
  };

  static getNewPassQuality(item) {
    if (item.sellIn >= Shop.PASS_THRESH1) {
      return Shop.boundQuality(item.quality + 1);
    } else if (item.sellIn >= Shop.PASS_THRESH2) {
      return Shop.boundQuality(item.quality + 2);
    } else if (item.sellIn >= 0) {
      return Shop.boundQuality(item.quality + 3);
    } else {
      return 0;
    }
  }

  static getNewSulfQuality(item) {
    return item.quality;
  }

  static getNewRegularQuality(item) {
    if (item.sellIn >= 0) {
      return Shop.boundQuality(item.quality - Shop.REG_DEGRADE_PRE);
    } else {
      return Shop.boundQuality(item.quality - Shop.REG_DEGRADE_POST);
    }    
  }

  static getNewConjuredQuality(item) {
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

  static getNewItemQuality(item) {
    switch (item.name) {
      case 'Aged Brie':
        return Shop.getNewBrieQuality(item);
      case 'Backstage passes to a TAFKAL80ETC concert':
        return Shop.getNewPassQuality(item);
      case "Sulfuras, Hand of Ragnaros":
        return Shop.getNewSulfQuality(item);
      case "Conjured":
        return Shop.getNewConjuredQuality(item);
      default:
        return Shop.getNewRegularQuality(item);
    }
  }


  updateQuality() {
    this.items.forEach(item => {
      item.sellIn = Shop.getNewItemSellIn(item);
      item.quality = Shop.getNewItemQuality(item);
    }
    );
    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
