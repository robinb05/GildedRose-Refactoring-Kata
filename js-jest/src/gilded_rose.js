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
    item.quality = this.boundQuality(item.quality + 1);
    item.sellIn = item.sellIn - 1;
    if (item.sellIn < 0) {
      item.quality = this.boundQuality(item.quality + 1);
    }
  };

  updatePass(item) {
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
  }

  updateSulf(item) {
    return;
  }

  updateRegular(item) {
    item.quality = this.boundQuality(item.quality - 1);
    item.sellIn = item.sellIn - 1;
    if (item.sellIn < 0) {
      item.quality = this.boundQuality(item.quality - 1);
    }
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
      this.updateBrie(item);
    } else if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
      this.updatePass(item);
    } else if (item.name == "Sulfuras, Hand of Ragnaros") {
      this.updateSulf(item);
    } else {
      this.updateRegular(item);
    }
  }

  updateQuality() {
    // side effects ??!!!
    this.items.forEach(item => this.updateItemQuality(item))
    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
