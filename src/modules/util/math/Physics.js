class Physics {

  constructor() {
      
    // 로컬 계산용 변수
    this.localArr = [];

    // 상수
    this.PI2 = 2 * Math.PI;
      
  }

  random(max) {
    return Number(Number(Math.random() * max).toFixed(0));
  }

  getDistance(targetX, targetY) {
    return Math.sqrt(Math.abs(targetX) ** 2 + Math.abs(targetY) ** 2);
  }

  checkCrossBox(rect1x, rect1y, rect1width, rect1height, rect2x, rect2y, rect2width, rect2height) {

    if (
      rect1x < rect2x + rect2width
      && rect1x + rect1width > rect2x
      && rect1y < rect2y + rect2height
      && rect1y + rect1height > rect2y
    ) {
      // Rectangles intersect
      return true;
    } 
    // Rectangles do not intersect
    return false;

  }

  checkCrossBoxAndCircle(x, y, x2, y2, circlex, circley, radius) {
      
    let disT;

    const line = this.localArr;
    for (let i = 0, len = 4; i < len; i++) {

      if (i === 0) {
        line[0] = x; line[1] = y; line[2] = x2; line[3] = y;
      } else if (i === 1) {
        line[0] = x2; line[1] = y; line[2] = x2; line[3] = y2;
      } else if (i === 2) {
        line[0] = x2; line[1] = y2; line[2] = x; line[3] = y2;
      } else if (i === 3) {
        line[0] = x; line[1] = y2; line[2] = x; line[3] = y;
      }

      disT = this.getDistance(line[0] - circlex, line[1] - circley);
      if (radius >= disT) {
        return true;
      }
      disT = this.getDistance(line[2] - circlex, line[3] - circley);
      if (radius >= disT) {
        return true;
      }

    }

    return false;
  }

}

export const PhysicsUtil = new Physics();