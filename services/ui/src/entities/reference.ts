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
  
  createOneScreen() {
    this.screens = [];
    this.screens.push(new Screen('window1', 0, 0, 500, 500 ))
  }

  createTwoScreens() {
    this.screens = [];
    this.screens.push(new Screen('window1', 0, 0, 500, 500 ))
    this.screens.push(new Screen('window2', 100, 100, 500, 500 ))

  }

  resizeSingleScreen(m: Messurements) {
    if (m === undefined) return;
    this.screens[0].left = 0;
    this.screens[0].top = 0;
    this.screens[0].width = m.width;
    this.screens[0].height = (m.height - m.top);
  }

  resize5050Horizontal(m: Messurements) {
    if (m === undefined) return;
    this.screens[0].left = 0;
    this.screens[0].top = 0;
    this.screens[0].width = m.width;
    this.screens[0].height = (m.height - m.top)/2;
    this.screens[1].left = 0;
    this.screens[1].top = (m.height - m.top)/2;
    this.screens[1].width = m.width;
    this.screens[1].height =  (m.height - m.top)/2;
  };

  resize5050Vertical(m: Messurements) {
    if (m === undefined) return;
    this.screens[0].left = 0;
    this.screens[0].top = 0;
    this.screens[0].width = m.width /2;
    this.screens[0].height = (m.height - m.top);
    this.screens[1].left = m.width /2;
    this.screens[1].top = 0;
    this.screens[1].width = m.width /2;
    this.screens[1].height =  (m.height - m.top);
  };


  screenX: number = 200;
  screenY: number = 200;
  incrementScreenReference(x: number, y: number) {
    this.screenX += x;
    this.screenY += y;
  };
}