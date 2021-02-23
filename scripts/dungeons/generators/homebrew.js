window.radugen = window.radugen || {};
radugen.generators = radugen.generators || {};
radugen.generators.dungeons = radugen.generators.dungeons || {};

radugen.generators.dungeons[radugen.generators.dungeonGenerator.Homebrew] = class extends radugen.generators.dungeon {
    constructor() {
        super('default');

        const rnd = radugen.helper.getRndFromNum;
        this.liquidChance = Math.max(0, rnd(100) - 20);
    }

    getCorridorTiles(room1, room2, invertAxis) {
        const tiles = [];
        const [Tile, TileType, rnd] = [radugen.classes.tiles.Tile, radugen.classes.tiles.TileType, radugen.helper.getRndFromNum];

        let room1Info = this.getSize(room1.tiles);
        let room2Info = this.getSize(room2.tiles);

        let x1 = invertAxis ? room2Info.left + rnd(room2Info.width - 1) : room2Info.left;
        let x2 = invertAxis ? room1Info.left + rnd(room1Info.width - 1) : room1Info.right + 1;
        let y1 = invertAxis ? room2Info.top : room2Info.top + rnd(room2Info.height - 1);
        let y2 = invertAxis ? room1Info.bottom + 1 : room1Info.top + rnd(room1Info.height - 1);

        //Register tiles as entrance on the room
        for (let tile of room2.tiles) {
            if (tile.x == x1 && tile.y == y1) {
                if (invertAxis) {
                    tile.room.connections += 1;
                    // tile.debug = 'red';
                    tile.disallowObjectPlacement = true;
                    tile.wall.top = false;
                    tile.door.top = true;
                }
                else {
                    tile.room.connections += 1;
                    // tile.debug = 'orange';
                    tile.disallowObjectPlacement = true;
                    tile.wall.left = false;
                    tile.door.left = true;
                }
            }
        }
        for (let tile of room1.tiles) {
            if (tile.x == x2 && tile.y == y2 - 1) {
                tile.room.connections += 1;
                // tile.debug = 'blue';
                tile.disallowObjectPlacement = true;
                tile.wall.bottom = false;
                tile.door.bottom = true;
            }
            if (tile.x == x2 - 1 && tile.y == y2) {
                tile.room.connections += 1;
                // tile.debug = 'green';
                tile.disallowObjectPlacement = true;
                tile.wall.right = false;
                tile.door.right = true;
            }
        }

        // // Vladville

        // //TODO: Vladville Pathfinding
        // let rx1, rx2, ry1, ry2;


        // //Determin target and point zero
        // let rasterizedGrid = this.rasterize();
        // rasterizedGrid.iterate((tile, x, y) => {
        //     if (tile.x == x1) { rx1 = x; }
        //     if (tile.x == x2) { rx2 = x; }
        //     if (tile.y == y1) { ry1 = y; }
        //     if (tile.y == y2) { ry2 = y; }
        // });


        // //Now we have our zero and target, lets find a path
        // let startX = rx1;
        // let startY = ry1;
        // let endX = rx2;
        // let endY = ry2;

        // //Create a copy of the grid with null values
        // let vladGrid = Array.from({ length: rasterizedGrid.height }).map((_, y) => Array.from({ length: rasterizedGrid.width }).map((_, x) => null));

        /*
        let count = 1, found = false;
        grid[startY][startX] = count;
        while (!found) {
            for (let y = 0; y < grid.length; y++) {
                for (let x = 0; x < grid[y].length; x++) {
                    if (grid[y][x] != count) continue;
                    for (let xy of [{x:-1},{y:-1},{x:1},{y:1}]) {
                      	if (y+(xy.y??0)<0 || y+(xy.y??0) >= grid.length) continue;
                      	if (x+(xy.x??0)<0 || x+(xy.x??0) >= grid[y].length) continue;
                        if (y+(xy.y??0) == endY && x+(xy.x??0) == endX) found = true;
                        if (grid[y+(xy.y??0)][x+(xy.x??0)] != null) continue;
                        grid[y+(xy.y??0)][x+(xy.x??0)] = count + 1;                                        
                    }
                }
            }
            count++;
        }
        */
        // return yolo;

        let xDiff = Math.abs(x1 - x2);
        let yDiff = Math.abs(y1 - y2);

        if ((xDiff == 1 || yDiff == 1) && (x1 > 0 && y1 > 0) && (x2 > 0 && y2 > 0)) {
            console.error('yaha');
        }

        let split = invertAxis ? rnd(yDiff) - 1 + Math.min(y1, y2) : rnd(xDiff) - 1 + Math.min(x1, x2);
        let stopAxis = invertAxis ? Math.max(y1, y2) : Math.max(x1, x2);
        for (let axis = invertAxis ? Math.min(y1, y2) : Math.min(x1, x2); axis < stopAxis; axis++) {
            if (axis < split) {
                let tile = new Tile(invertAxis ? x2 : axis, invertAxis ? axis : y2, TileType.Corridor);
                tile.debug = 'green';
                tiles.push(tile);

            } else if (axis > split) {
                let tile = new Tile(invertAxis ? x1 : axis, invertAxis ? axis : y1, TileType.Corridor);
                tile.debug = 'blue';
                tiles.push(tile);
            } else if (axis == split) {
                let stopOppositeAxis = invertAxis ? Math.max(x1, x2) : Math.max(y1, y2);
                for (let oppositeAxis = invertAxis ? Math.min(x1, x2) : Math.min(y1, y2); oppositeAxis <= stopOppositeAxis; oppositeAxis++) {
                    let tile = new Tile(invertAxis ? oppositeAxis : axis, invertAxis ? axis : oppositeAxis, TileType.Corridor);
                    tile.debugInfo = oppositeAxis;

                    tile.debug = 'orange';

                    tiles.push(tile);
                }
            }
            else {
                console.error('wtf', axis, split);
            }
        }
        return tiles;
    }

    getRandomSquareWithinSquare(x, y, w, h) {
        const rnd = radugen.helper.getRndFromNum;
        //What is -3? //A wild magic number has appeared (1. fight, 2. run)
        let xstart = rnd(w - 3) - 1;
        let ystart = rnd(h - 3) - 1;
        let width = rnd(w - xstart);
        let height = rnd(h - ystart);
        xstart += x;
        ystart += y;
        return [xstart, ystart, width, height];
    }

    getTilesForRoom(ox, oy, w, h, room) {
        const [Tile, TileType] = [radugen.classes.tiles.Tile, radugen.classes.tiles.TileType];
        let tiles = [];
        for (let x = ox; x < ox + w; x++) {
            for (let y = oy; y < oy + h; y++) {
                tiles.push(new Tile(x, y, TileType.Room));
            }
        }
        return tiles;
    }

    getRoomTiles(ox, oy, w, h, room) {
        const [Tile, TileType, rnd] = [radugen.classes.tiles.Tile, radugen.classes.tiles.TileType, radugen.helper.getRndFromNum];
        let tiles = [];

        let lavasquares = [];
        if (rnd(100) < this.liquidChance) {
            room.liquid = true;
            let [xstart, ystart, width, height] = this.getRandomSquareWithinSquare(ox, oy, w, h);
            //TODO: perhaps add some logic, if width or height == 1 // bias it to the side of the room
            //Would make for more natural feeling
            for (let x = xstart; x < xstart + width; x++) {
                for (let y = ystart; y < ystart + height; y++) {
                    lavasquares.push(`${x},${y}`);
                }
            }
        }
        else {
            room.liquid = false;
        }

        for (let x = ox; x < ox + w; x++) {
            for (let y = oy; y < oy + h; y++) {
                let roomtile = TileType.Room
                if (lavasquares.indexOf(`${x},${y}`) != -1) {
                    roomtile = TileType.Liquid
                }

                let tile = new Tile(x, y, roomtile);
                tile.room = room;
                if (x == ox) { tile.wall.left = true; }
                if (x == ox + w - 1) { tile.wall.right = true; }
                if (y == oy) { tile.wall.top = true; }
                if (y == oy + h - 1) { tile.wall.bottom = true; }
                tiles.push(tile);
            }
        }
        return tiles;
    };

    generateRooms() {
        const [rnd, directions] = [radugen.helper.getRndFromNum, radugen.helper.directions];
        const [width, height] = radugen.generators.dungeons.rooms.getRoomSize();

        let startRoom = {
            adjecent: null,
            direction: null,
            distance: 0,
            connections: 0,
            tiles: []
        }

        startRoom.tiles = this.getRoomTiles(0, 0, width, height, startRoom);

        for (var tile of startRoom.tiles) { this._grid.push(tile); }

        let rooms = [startRoom];
        let corridors = [];

        for (let roomIndex = 1; roomIndex < this.roomCount; roomIndex++) {
            //We have to create x rooms
            let success = false;
            while (!success) {
                const adjecent = rnd(roomIndex) - 1;
                const [w, h] = radugen.generators.dungeons.rooms.getRoomSize();

                const direction = rnd(4);

                let ox = 0, oy = 0;

                let adjecentRoomInfo = this.getSize(rooms[adjecent].tiles);

                switch (direction) {
                    case directions.North:
                        ox = adjecentRoomInfo.left + rnd(adjecentRoomInfo.width) - rnd(w) - 1;
                        oy = adjecentRoomInfo.top - h - rnd(4) - 2;
                        break;
                    case directions.West:
                        ox = adjecentRoomInfo.left - w - rnd(4) - 2;
                        oy = adjecentRoomInfo.top + rnd(adjecentRoomInfo.height) - rnd(h) - 1;
                        break;
                    case directions.South:
                        ox = adjecentRoomInfo.left + rnd(adjecentRoomInfo.width) - rnd(w) - 1;
                        oy = adjecentRoomInfo.bottom + rnd(4) + 2;
                        break;
                    case directions.East:
                        ox = adjecentRoomInfo.right + rnd(4) + 2;
                        oy = adjecentRoomInfo.top + rnd(adjecentRoomInfo.height) - rnd(h) - 1;
                        break;
                }

                if (rooms.find(r => this.intersects(r.tiles, this.getTilesForRoom(ox, oy, w, h)))) continue;

                success = true;

                let room = {
                    connections: 0,
                    index: roomIndex,
                    adjecent: rooms[adjecent],
                    direction: direction,
                    distance: rooms[adjecent].distance + 1,
                    tiles: []
                };

                room.tiles = this.getRoomTiles(ox, oy, w, h, room);

                let corridor = {
                    tiles: []
                };
                //generate corridor:

                //Push room/corridors to grid
                for (var tile of room.tiles) { this._grid.push(tile); }

                if (room.adjecent != null || room.direction != null) {
                    let directions = radugen.helper.directions;

                    switch (room.direction) {
                        case directions.North:
                            corridor.tiles = this.getCorridorTiles(room, room.adjecent, true);
                            break;
                        case directions.West:
                            corridor.tiles = this.getCorridorTiles(room, room.adjecent, false);
                            break;
                        case directions.South:
                            corridor.tiles = this.getCorridorTiles(room.adjecent, room, true);
                            break;
                        case directions.East:
                            corridor.tiles = this.getCorridorTiles(room.adjecent, room, false)
                            break;
                    }
                }

                
                for (var tile of corridor.tiles) { this._grid.push(tile); }

                rooms.push(room);
            }
        }
        

        this._rooms = rooms;
        this._corridors = corridors;
    }

    generate() {
        this.generateRooms();
    }
};