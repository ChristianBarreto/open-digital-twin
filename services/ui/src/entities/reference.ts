export type Messurements = {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
}

export interface ScreenType {
  id: string;
  top: number;
  left: number;
  height: number;
  width: number;
  initX: number;
  initY: number;
  screenRefY: number;
  screenRefX: number;
  moveScreenReference(deltaX: number, deltaY: number): void;
}

class Screen {
  id: string;
  top: number;
  left: number;
  height: number;
  width: number;
  initX: number = 50;
  initY: number = 50;
  screenRefY: number = 0 + this.initY;
  screenRefX: number = 0 + this.initX;
  constructor(id: string, left: number, top: number, width: number, height: number) {
    this.id = id;
    this.top = top;
    this.left = left;
    this.width = width;
    this.height = height;
  }

  moveScreenReference(deltaX: number, deltaY: number) {
    this.screenRefY += deltaY;
    this.screenRefX += deltaX;
  };
}

export interface ReferenceType {
  screens: ScreenType[],
  create5050Screens: () => void,
};

export class Reference {
  screens: Screen[] = [];

  create5050Screens() {
    // console.log('>>>', m)
    // if (m === undefined) return
    // this.screens.push(new Screen('window1', 0, 0, m.width, (m.height-m.top)/2 ))
    // this.screens.push(new Screen('window2', 0, (m.height-m.top)/2, m.width, (m.height-m.top)/2))
    this.screens.push(new Screen('window1', 0, 0, 500, 500 ))
    this.screens.push(new Screen('window1', 500, 0, 500, 500 ))

  }


  screenX: number = 200;
  screenY: number = 200;
  incrementScreenReference(x: number, y: number) {
    this.screenX += x;
    this.screenY += y;
  };
}