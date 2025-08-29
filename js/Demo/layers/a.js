
// A side layer with achievements, with no prestige
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
            ["display-text", function() { return "Achievements: "+player.a.achievements.length+"/"+(Object.keys(tmp.a.achievements).length-2) }], 
            "blank", "blank",
            "achievements", ]
        },
    },
    achievementPopups: true,
    achievements: {
        11: {
            name: "Your first Achievement",
            done() {return player.points.gte(10)},
            unlocked() {return true},
            tooltip: "Get 10 furry points",
            onComplete() {}
        },
    },
    layerShown(){return true}
},
)