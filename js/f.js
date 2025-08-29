addLayer("f", {
    name: "foxes", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    branches: ["w"],
    color: "#301c1cff",
    requires: new Decimal(5000), // Can be a function that takes requirement increases into account
    resource: "Foxes", // Name of prestige currency
    baseResource: "Wickerbeasts", // Name of resource prestige is based on
    baseAmount() {return player.w.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1);
        if (hasUpgrade("f", 13)) mult = mult.times(2)
        if (hasUpgrade("f", 21)) mult = mult.times(upgradeEffect("f", 21));
        if (hasUpgrade("f", 22)) mult = mult.times(4)
        if (hasUpgrade("f", 23)) mult = mult.times(upgradeEffect("f", 23));
        if (hasUpgrade("f", 24)) mult = mult.times(upgradeEffect("f", 24));
        if (hasAchievement("a", 15)) mult = mult.times(1.25)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "f", description: "F: Reset for Foxes", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11:{
            title: "Anger", 
            description: '"What is so hard to understand? Im literally not a furry."',
            tooltip: "2x wickers and points",
            cost: new Decimal(1)
        },
        12:{
            title:"Laziness",
            description:"You discover a way to automate creating wickers.",
            tooltip: "Passively gain 10% of wickers every second",
            cost: new Decimal(1)
        },
        13:{
            title: "Why did you leave those two alone :/",
            description: "The foxes are now reproducing. Thanks.",
            tooltip: "2x foxes.",
            cost: new Decimal(2)
        },
        14:{
            title:"*yip* *yip*",
            description: "Due to your own mistake, you become more of a furry.",
            tooltip: "Foxes boost points",
            cost: new Decimal(5),
             effect() {
                let eff = player.f.points.plus(1).log10().cbrt().plus(1).times(2);
                return eff
            },
            effectDisplay() { 
                return format(tmp.f.upgrades[14].effect)+"x points" 
            },
        },
        15: {
            title:"Fox workers",
            description: "Some of your foxes have decided to help you create more wickerbeasts",
            tooltip: "Foxes boost wickers",
            cost: new Decimal(10),
             effect() {
                let eff = player.f.points.plus(1).log10().cbrt().plus(1).times(2);
                return eff
            },
            effectDisplay() { 
                return format(tmp.f.upgrades[15].effect)+"x wickers" 
            },
        },
        21: {
            title:"Uh oh, The foxes are multiplying",
            description: "Foxes reproduce faster the more of a furry you are.",
            tooltip: "Points boost foxes",
            cost: new Decimal(20),
            effect() {
                let eff = player.points.plus(1).log10().cbrt().plus(1);
                return eff
            },
            effectDisplay() { 
                return format(tmp.f.upgrades[21].effect)+"x foxes" 
            },
            unlocked() {
                return hasUpgrade("f", 15)
            }
        },
        22: {
            title: "Improved lab",
            description: "Find better ways to automate wickerbeast creation and more efficiently create foxes",
            tooltip: "4x foxes and gain 25% of wickers/sec instead of 10%",
            cost: new Decimal(50),
            unlocked() {
                return hasUpgrade("f", 15)
            },
        },
        23: {
            title:"Wicker workers",
            description: "The wickerbeasts decide to help you produce foxes",
            tooltip: "Wickerbeasts boost foxes",
            cost: new Decimal(200),
            effect() {
                let eff = player.w.points.plus(1).log10().cbrt().plus(1);
                return eff
            },
            effectDisplay() { 
                return format(tmp.f.upgrades[23].effect)+"x foxes" 
            },
            unlocked() {
                return hasUpgrade("f", 15)
            }
        },
        24: {
            title:"Greedy Foxes",
            description: "The foxes decide to grow more of themselves",
            tooltip: "Foxes boost themselves",
            cost: new Decimal(500),
            effect() {
                let eff = player.f.points.plus(1).log10().cbrt().plus(1);
                return eff
            },
            effectDisplay() { 
                return format(tmp.f.upgrades[24].effect)+"x foxes" 
            },
            unlocked() {
                return hasUpgrade("f", 15)
            }
        },
        25:{
            title: "Not again!",
            description: "You did something wrong again and now you have made an entirely new species.",
            tooltip: "Unlock Wolves. (Soon)",
            cost: new Decimal("e69420"),
            unlocked() {
                return hasUpgrade("f", 15)
            }
        }
    },
    layerShown(){return hasUpgrade("w", 25)||player.f.unlocked}
})
