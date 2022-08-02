Hooks.on("init",()=>{
    if(!game.user.isGM) return;

    Hooks.on("renderApplication", (app,html) => {
        function applyTooltip(element, text) {
            const oldTooltip = element.dataset.tooltip;
            if (oldTooltip) {
                text = oldTooltip + " (" + text + ")";
            }
            element.dataset.tooltip = text;
            element.dataset.tooltipDirection = "LEFT";
        }
    
        setTimeout(() => {
    
            const modIdCache = {};
    
            const flags = html[0].querySelectorAll("[name]");
            for(const flag of flags){
                const nameData = flag.getAttribute("name");
                if(!nameData.includes("flags")) continue;
                const moduleId = nameData.split(".")[1];
                const moduleName = modIdCache[moduleId] ?? game.modules.get(moduleId)?.title;
                modIdCache[moduleId] = moduleName;
                if(!moduleName) continue;
                const fg = flag.closest(".form-group");
                applyTooltip(fg ?? flag, moduleName);
            }
    
        }, 1000);
    })

})

