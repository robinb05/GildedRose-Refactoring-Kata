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
 
  updateBrie(item) {
    
  };

  updatePass(item) {

  }

  updateSulf(item) {

  }

  updateRegular(item) {

  }

  boundQuality(quality) {
    if (quality > 50) {
      return 50;
    } else if (quality < 0) {
      return 0;
    } else {
      return quality;
    }
  };

  updateItemQuality(item) {
    if (item.name == 'Aged Brie') {
      item.quality = this.boundQuality(item.quality + 1);
      item.sellIn = item.sellIn - 1;
      if (item.sellIn < 0) {
        item.quality = this.boundQuality(item.quality + 1);
      }
    } else if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
      item.quality = this.boundQuality(item.quality + 1);
      if (item.sellIn < 11) {
          item.quality = this.boundQuality(item.quality + 1);
      }
      if (item.sellIn < 6) {
          item.quality = this.boundQuality(item.quality + 1);
      }
      item.sellIn = item.sellIn - 1;
      if (item.sellIn < 0) {
        item.quality = 0;
      }
    } else if (item.name == "Sulfuras, Hand of Ragnaros") {

    } else {
      item.quality = this.boundQuality(item.quality - 1);
      item.sellIn = item.sellIn - 1;
      if (item.sellIn < 0) {
        item.quality = this.boundQuality(item.quality - 1);
      }
    }
    return item;
  }

  updateQuality() {
    this.items.forEach(item => this.updateItemQuality(item))
    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
