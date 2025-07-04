const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  // it("should foo", function() {
  //   const gildedRose = new Shop([new Item("foo", 0, 0)]);
  //   const items = gildedRose.updateQuality();
  //   expect(items[0].name).toBe("fixme");
  // });

  // it("quality should never be negative", function(){
  //   const gildedRose = new Shop([new Item("foo", 0, 0)]);
  //   const items = gildedRose.decreaseQuality();
  //   expect(items[0].quality).toBeGreaterThanOrEqual(0);
  // })

  // it("quality should never greater than 50", function(){
  //   const gildedRose = new Shop([new Item("foo", 0, 0)]);
  //   const items = gildedRose.increaseQuality();
  //   expect(items[0].quality).toBeLessThanOrEqual(50);
  // })

   it("aged brie increases quality over time", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 3, 4)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(5);
  });
  it("aged brie increases quality doubly after sell by", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 16)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(18);
  });
  it("sulfuras sell by never changes", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 16), new Item("Sulfuras, Hand of Ragnaros", 14, 15)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(0);
    expect(items[1].sellIn).toBe(14);
  });
  it("sulfuras quality never changes", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
  });
  it("passes quality increase as sellin approaches", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 2, 5), new Item("Backstage passes to a TAFKAL80ETC concert", 8, 8)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(8);
    expect(items[1].quality).toBe(10);
  })

});
