Hooks.on("ready",()=>{
    const MODULE_ID = "what-the-flag";

    game.settings.register(MODULE_ID, "enableForPlayers", {
        name: `${MODULE_ID}.settings.enableForPlayers.name`,
        hint: `${MODULE_ID}.settings.enableForPlayers.hint`,
        scope: "world",
        config: true,
        type: Boolean,
        default: false,
    });

    game.settings.register(MODULE_ID, "showFlagPath", {
        name: `${MODULE_ID}.settings.showFlagPath.name`,
        hint: `${MODULE_ID}.settings.showFlagPath.hint`,
        scope: "world",
        config: true,
        type: Boolean,
        default: false,
    });

    game.settings.register(MODULE_ID, "tooltipPosition", {
        name: `${MODULE_ID}.settings.tooltipPosition.name`,
        hint: `${MODULE_ID}.settings.tooltipPosition.hint`,
        scope: "world",
        config: true,
        type: String,
        choices: {
            "LEFT": `${MODULE_ID}.settings.tooltipPosition.left`,
            "RIGHT": `${MODULE_ID}.settings.tooltipPosition.right`,
            "UP": `${MODULE_ID}.settings.tooltipPosition.top`,
            "DOWN": `${MODULE_ID}.settings.tooltipPosition.bottom`,
        },
        default: "LEFT",
    });



    if(!game.user.isGM && !game.settings.get(MODULE_ID, "enableForPlayers")) return;

    Hooks.on("renderApplication", (app,html) => {

        const tooltipPosition = game.settings.get(MODULE_ID, "tooltipPosition");
        const showFlagPath = game.settings.get(MODULE_ID, "showFlagPath");

        function applyTooltip(element, text) {
            const oldTooltip = element.dataset.tooltip;
            if (oldTooltip) {
                text = oldTooltip + " (" + text + ")";
            }
            element.dataset.tooltip = text;
            element.dataset.tooltipDirection = tooltipPosition;
        }
    
        setTimeout(() => {
    
            const modIdCache = {};
            const flags = html[0].querySelectorAll("[name]");
            for(const flag of flags){
                const nameData = flag.getAttribute("name");
                if(!nameData.includes("flags")) continue;
                const moduleId = nameData.split(".")[1];
                let moduleName = modIdCache[moduleId] ?? game.modules.get(moduleId)?.title;
                modIdCache[moduleId] = moduleName;
                if(!moduleName) continue;
                if(showFlagPath) moduleName+= ` [${nameData}]`;
                const fg = flag.closest(".form-group");
                applyTooltip(fg ?? flag, moduleName);
            }
    
        }, 1000);
    })

})

