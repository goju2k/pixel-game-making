export class ViewCommonUtil {
  static isMobile() {

    // 모바일 디스플레이 여부
    let isMobile = false;
    const { angle } = window.screen.orientation;
    if (
      (window.screen.width > window.screen.height && (angle !== 0 && angle !== 180))
    || (window.screen.width < window.screen.height && (angle === 0 || angle === 180))
    ) {
      isMobile = true;
    }

    return isMobile;
    
  }
}