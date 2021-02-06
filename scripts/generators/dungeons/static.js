window.radugen = window.radugen || {};
radugen.generators = radugen.generators || {};
radugen.generators.dungeons = radugen.generators.dungeons || {};

radugen.generators.dungeons[radugen.generators.dungeonGenerator.Static] = class extends radugen.generators.dungeon {
    /**
     * @param {radugen.generators.dungeonSize} dungeonSize
     */
    constructor(dungeonSize) {
        super('Static');
    }


    generate() {
        let r = 1;
        let h = 99;

        this._map = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, r, r, r, r, 0, 0, 0, 0, 0, 0, 0, 0, 0, r, r, r, 0, 0],
            [0, 0, r, r, r, r, h, h, h, h, h, 0, 0, 0, 0, r, r, r, 0, 0],
            [0, 0, r, r, r, r, 0, 0, 0, 0, h, 0, 0, 0, 0, r, r, r, 0, 0],
            [0, 0, r, r, r, r, 0, 0, 0, 0, h, 0, 0, 0, 0, r, r, r, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, h, 0, 0, 0, 0, 0, h, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, h, h, h, h, h, h, h, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, h, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, h, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, r, r, r, h, h, h, h, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, r, r, r, 0, 0, 0, h, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, r, r, r, 0, 0, 0, h, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, h, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, r, r, r, r, r, r, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, r, r, r, r, r, r, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, r, r, r, r, r, r, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, r, r, r, r, r, r, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];

        return this._map;
    }
};