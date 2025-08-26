addLayer("w", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#6f00ffff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Wickerbeasts", // Name of prestige currency
    baseResource: "Furry Points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("w",12)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "w", description: "P: Reset for wickerbeasts", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
          title: "Denial",
          description: '"Im not a furry!" x2 Furry Points',
          cost: new Decimal(2),
        },
        12: {
            title: "Reproduction",
            description: "2x wickerbeasts",
            cost: new Decimal(5),
        },
        13: {
            title: "Oh god they're multiplying",
            description: "Wickerbeasts reproduce faster the more of a furry you are",
            cost: new Decimal(15),
            effect() {
                let eff = player.points.plus(1).log10().cbrt().plus(1);
                return eff
            },
            effectDisplay() { return format(tmp.w.upgrades[13].effect)+"x wickerbeasts" },
        }
    },
    layerShown(){return true}
})
