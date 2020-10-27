const { Gio } = imports.gi;
const ExtensionUtils = imports.misc.extensionUtils;

const Extension = ExtensionUtils.getCurrentExtension();

const getGIcon = (name, pack = 'cat') => Gio.icon_new_for_string(`${Extension.path}/icons/${pack}/my-${name}-symbolic.svg`);

var IconProvider = class IconProvider {
    constructor(runCount = 5, sleepCount = 5) {
        this.runCount = runCount;
        this.runIndex = 0;
        this.runSprites = [...Array(runCount).keys()]
            .map(i => getGIcon(`running-${i}`));

        this.sleepCount = sleepCount;
        this.sleepIndex = 0;
        this.sleepSprites = [...Array(sleepCount).keys()]
            .map(i => getGIcon(`sleeping-${i}`));
    }

    get nextRunSprite() {
        this.sleepIndex = 0;
        this.runIndex = (this.runIndex < this.runCount-1) ? this.runIndex+1 : 0;
        return this.runSprites[this.runIndex];    
    }

    get nextSleepSprite() {
        this.runIndex = 0;
        this.sleepIndex = (this.sleepIndex < this.sleepCount-1) ? this.sleepIndex+1 : 0;
        return this.sleepSprites[this.sleepIndex];    
    }

}
