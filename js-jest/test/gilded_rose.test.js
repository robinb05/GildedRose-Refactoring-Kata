const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {

  it("backstage passes sellin decreases over time within bounds", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 3, 3)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(2);
  });
});
