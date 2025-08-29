addLayer("a", {
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "yellow",
    resource: "achievement power", 
    row: "side",
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Achievements")
    },
    tabFormat: {
        "Achievements": { 
            content: [ 
            ["display-text", function() { return "Achievements: "+player.a.achievements.length+"/"+(Object.keys(tmp.a.achievements).length-2)+". Achievements at the end of a row give a boost of some kind." }], 
            "blank", "blank",
            "achievements", ]
        },
    },
    achievementPopups: true,
    achievements: {
        11: {
            name: "Ha! Furry!",
            done() {return player.points.gte(10)},
            unlocked() {return true},
            tooltip: "Get 10 furry points",
            onComplete() {}
        },
        12: {
             name: "Wickers???",
            done() {return player.w.points.gte(10)},
            unlocked() {return true},
            tooltip: "Get 10 Wickerbeasts",
            onComplete() {}
        },
        13:{
             name: "It's Spreading!",
            done() {return hasUpgrade("w", 15)},
            unlocked() {return true},
            tooltip: "Buy Wicker upgrade 15",
            onComplete() {}
        },
        14:{
             name: "Whoops!",
            done() {return player.f.points.gte(1)},
            unlocked() {return true},
            tooltip: "Reset for a fox.",
            onComplete() {}
        },
        15:{
             name: "YIP YIP YIP YIP YIP YIP YIP YIP YIP YIP",
            done() {return hasUpgrade("f", 14)},
            unlocked() {return true},
            tooltip: "Get fox upgrade 14. Reward: 1.25x foxes and wickerbeasts",
            onComplete() {}
        },
        21:{
           name: "Again?????",
            done() {return hasUpgrade("f", 25)},
            unlocked() {return true},
            tooltip: "Reset for wolves (SOON)",
            onComplete() {}  
        }
    },
    layerShown(){return true}
},
)