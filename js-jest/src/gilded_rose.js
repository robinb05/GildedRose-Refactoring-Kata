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

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) { //for all items
      //if not aged brie, backstage passes or sulfuras hand ragnaros, and quality is > 0, reduce qual by 1
      if (this.items[i].name == 'Aged Brie') {
        this.items[i].quality = this.boundQuality(this.items[i].quality + 1);
        this.items[i].sellIn = this.items[i].sellIn - 1;
        if (this.items[i].sellIn < 0) {
          this.items[i].quality = this.boundQuality(this.items[i].quality + 1);
        }
      } else if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
        this.items[i].quality = this.boundQuality(this.items[i].quality + 1);
        if (this.items[i].sellIn < 11) {
            this.items[i].quality = this.boundQuality(this.items[i].quality + 1);
          }
        if (this.items[i].sellIn < 6) {
            this.items[i].quality = this.boundQuality(this.items[i].quality + 1);
        }
        this.items[i].sellIn = this.items[i].sellIn - 1;
        if (this.items[i].sellIn < 0) {
          this.items[i].quality = 0;
        }
      } else if (this.items[i].name == "Sulfuras, Hand of Ragnaros") {

      } else {
        this.items[i].quality = this.boundQuality(this.items[i].quality - 1);
        this.items[i].sellIn = this.items[i].sellIn - 1;
        if (this.items[i].sellIn < 0) {
          this.items[i].quality = this.boundQuality(this.items[i].quality - 1);
        }
      }
    }
    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
