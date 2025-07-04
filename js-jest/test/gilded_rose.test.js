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
  });
  it("backstage passes sellin decreases over time", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 3, 3)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(2);
  });

  it("backstage passes quality 0 after concert", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 3)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });


  it("generic item quality decreases by 1 before sellin data", function() {
    const gildedRose = new Shop([new Item("foo", 3, 3)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(2);
  });

  it("quality degrades 2x speed as sell in passes", function(){
    const gildedRose = new Shop([new Item("hello", -1, 3)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(1);
  })

  it("quality bounded at 0 and 50", function() {
    const q1 = -1;
    const q2 = 51;
    expect(Shop.boundQuality(q1)).toBe(0);
    expect(Shop.boundQuality(q2)).toBe(50);

  })

  it("conjured quality degrades twice as fast as normal", function(){
    const gildedRose = new Shop([new Item("Conjured", -1, 5), new Item("Conjured", 1, 7)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(1);
    expect(items[1].quality).toBe(5);
  })
});
