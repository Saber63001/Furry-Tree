addLayer("w", {
    name: "wickers", // This is optional, only used in a few places, If absent it just uses the layer id.
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
        if (hasUpgrade("w",12)) mult = mult.times(2);
        if (hasUpgrade("w",13)) mult = mult.times(upgradeEffect("w", 13));
        if (hasUpgrade("w",21)) mult = mult.times(upgradeEffect("w", 21));
        if (hasUpgrade("w",23)) mult = mult.times(4);
        if (hasUpgrade("w",24)) mult = mult.times(1.5);
        if (hasUpgrade("f",11)) mult = mult.times(2);
        if (hasUpgrade("f",15)) mult = mult.times(upgradeEffect("f", 15));
        if (hasAchievement("a", 15)) mult = mult.times(1.5)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration(){
        let gen = new Decimal(0)
        if(hasUpgrade("f", 12)) gen = gen.add(0.1)
        if(hasUpgrade("f", 22)) gen = gen.times(2.5)
            return gen
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "w", description: "W: Reset for wickerbeasts", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
          title: "Denial",
          description: '"Im not a furry!"',
          tooltip:"2x Points.",
          cost: new Decimal(1),
        },
        12: {
            title: "Reproduction",
            description: "2x wickerbeasts",
            cost: new Decimal(3),
        },
        13: {
            title: "Oh god they're multiplying",
            description: "Wickerbeasts reproduce faster the more of a furry you are",
            tooltip:"Furry points boost Wickerbeasts.",
            cost: new Decimal(10),
            effect() {
                let eff = player.points.plus(1).log10().cbrt().plus(1);
                return eff
            },
            effectDisplay() { return format(tmp.w.upgrades[13].effect)+"x wickerbeasts" },
        },
        14: {
             title: "Cuddles!",
            description: "The wickerbeasts cuddle you making you more of a furry",
            tooltip:"Wickerbeasts boost furry points.",
            cost: new Decimal(25),
            effect() {
                let eff = player.w.points.plus(1).log10().cbrt().plus(1).times(2);
                return eff
            },
            effectDisplay() { return format(tmp.w.upgrades[14].effect)+"x points" },
        },
        15: {
             title: "Spread",
            description: "The pathowogen spreads.",
            tooltip:"Furry points boost themselves.",
            cost: new Decimal(35),
            effect() {
                let eff = player.points.plus(1).log10().cbrt().plus(1);
                return eff
            },
            effectDisplay() { return format(tmp.w.upgrades[15].effect)+"x points" },
        },



        21: {
             title: "WICKERS??!!?",
            description: "Some wickerbeasts can reproduce without a partner.",
            tooltip:"Wickerbeasts boost themselves.",
            cost: new Decimal(100),
            effect() {
                let eff = player.w.points.plus(1).log10().cbrt().plus(1);
                return eff
            },
            effectDisplay() { return format(tmp.w.upgrades[21].effect)+"x wickerbeasts" },
            unlocked() {return hasUpgrade("w", 15)}
        },
        22: {
            title: "Okay we gotta speed this up",
            description: "This is going a bit too slow so heres 4x furry points",
            cost: new Decimal(250),
            unlocked() {return hasUpgrade("w", 15)}
        },
        23: {
            title:"Lab grown wickerbeasts",
            description: "Discover how to make your own wickerbeasts.",
            tooltip: "4x Wickerbeasts.",
            cost: new Decimal(500),
            unlocked() {return hasUpgrade("w", 15)}
        },
        24: {
            title: "Wait, where's the 5th upgrade?",
            description: "Improve the way you grow wickerbeasts. This may have unintended side effects...",
            tooltip: "1.5x points and wickers.",
            cost: new Decimal(1000),
            unlocked() {return hasUpgrade("w", 15)}
        },
        25: {
            title: "Whats this?",
            description: "While growing some wickerbeasts, you accidentally create something new...",
            tooltip: "Unlock Foxes.",
            cost: new Decimal(2500),
            unlocked() {return (hasUpgrade("w", 24)&&player.w.points.gte(2000)) || hasUpgrade("w", 25)}
        }
    },
    layerShown(){return true}
})
