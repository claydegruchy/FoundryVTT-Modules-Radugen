window.radugen = window.radugen || {};
radugen.customScene = class extends Scene {
    /**
     * Generate a new random dungeon scene.
     * @param {number} width
     * @param {number} height
     * @param {number} tilesize of 64 128 192 256 ...
     */
    constructor(width, height, img) {
        const dungeon_names = ["Vault", "Catacombs", "Dungeon", "Palace", "Eternal", "Repository", "Lair"];
        const curiosities = ["Endless Suffering", "Agony Burrows", "Dream Cells", "Mystic", "Back Itches", "Paper Cuts", "Random Bugs", "Calories"];
        const id = radugen.helper.uuidv4();

        let grid = [width, height];
        let size = 256;

        super({
            _id: id,
            name: `The ${radugen.helper.getRndFromArr(dungeon_names)} of ${radugen.helper.getRndFromArr(curiosities)}`,
            shiftX: 0,
            shiftY: 0,
            width: grid[0] * size,
            height: grid[1] * size,
            grid: size,
            padding: 0,
            tiles: [],
            img: `modules/Radugen/uploads/scenes/${id}.webp`
        });

        //    {
        //    _id: id,
        //    name: `The ${getRndFromArr(dungeon_names)} of ${getRndFromArr(curiosities)}`,
        //    "flags": {
        //        "exportSource": {
        //            "world": "dev",
        //            "system": "dnd5e",
        //            "coreVersion": "0.7.9",
        //            "systemVersion": "1.2.4"
        //        }
        //    },
        //    "description": "",
        //    "navigation": true,
        //    "navOrder": 100001,
        //    "active": true,
        //    "initial": null,
        //    "backgroundColor": "#999999",
        //    "tiles": [],
        //    "gridType": 1,
        //    "grid": 100,
        //    "shiftX": 0,
        //    "shiftY": 0,
        //    "gridColor": "#000000",
        //    "gridAlpha": 0.2,
        //    "gridDistance": 5,
        //    "gridUnits": "ft",
        //    "tokens": [],
        //    "walls": [],
        //    "tokenVision": true,
        //    "fogExploration": true,
        //    "lights": [],
        //    "globalLight": false,
        //    "globalLightThreshold": null,
        //    "darkness": 0,
        //    "sounds": [],
        //    "templates": [],
        //    "notes": [],
        //    "drawings": [],
        //    "size": null,
        //    "navName": "",
        //    "img": "",
        //    "hasGlobalThreshold": false,
        //    "journal": "",
        //    "playlist": "",
        //    "weather": ""
        //}
    }

    uploadFile(blob) {
        let file = new File([blob], `${this._id}.webp`);
        let self = this;
        FilePicker.upload(
            "data",
            `modules/Radugen/uploads/scenes/`,
            file
        ).then(function () {
            radugen.compendium.scene.importEntity(self);
        });
    }

    getImage(width, height) {
        let self = this;
        let grid = [width, height];
        let size = 256;

        const canvas = document.createElement('canvas');
        canvas.width = grid[0] * size;
        canvas.height = grid[1] * size;

        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
 
        let imgcount = 0;
        for (let x = 0; x < grid[0]; x++) {
            for (let y = 0; y < grid[1]; y++) {
                ((x, y) => {
                    //Get random image
                    const img = new Image();
                    img.onload = function () {
                        if (radugen.helper.getRndFromNum(2) == 1) {
                            ctx.transform(-1, 0, 0, 1, (x + 1) * size, y * size); // flip and move tile
                        } else {
                            ctx.translate(x * size, y * size); // move tile
                        }
                        ctx.translate(size / 2, size / 2);
                        ctx.rotate((Math.PI / 2) * radugen.helper.getRndFromNum(4)); // rotate tile
                        ctx.translate(-size / 2, -size / 2);

                        ctx.drawImage(img, 0, 0, size, size);

                        //Reset transform
                        ctx.setTransform(1, 0, 0, 1, 0, 0);

                        imgcount++;
                        if (imgcount == grid[0] * grid[1]) {

                            canvas.toBlob(function (imageBlob) {
                                self.uploadFile(imageBlob);
                            }, "image/webp", 0.80);


                            //ctx.fillStyle = `rgba(${radugen.helper.getRndFromNum(255)},${radugen.helper.getRndFromNum(255)},${radugen.helper.getRndFromNum(255)},0.5)`;
                            //ctx.fillRect(0, 0, vancas.width, vancas.height);
                            
                            //imageloaded.bind(this, canvas.toDataURL())();
                        }
                    };
                    img.src = `/modules/Radugen/tiles/rough_${radugen.helper.getRndFromNum(16)}.png`;
                })(x, y);
            }
        }

        
    }

    /**
     * @type {number}
     */
    get width(){
        return this._width;
    }

    /**
     * @type {number}
     */
    get height(){
        return this._height;
    }
};