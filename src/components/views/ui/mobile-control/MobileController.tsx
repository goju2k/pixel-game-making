import { Flex } from '@mint-ui/core';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import context from '../../../../modules/draw/context/GlobalContext';

const Container = styled(Flex)`
  pointer-events: auto;
  position: absolute;
  left: 10px;
  top: calc(100% - 250px);
  width: 200px;
  height: 200px;
  background: #d3d3d380;
`;

const JoyStick = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background: red;
  opacity: 0.5;
`;

export interface MobileControllerProps {
  disabled?:boolean;
}
export function MobileController({ disabled = true }:MobileControllerProps) {

  const stick = useRef<HTMLDivElement | null>(null);
  const stickTouched = useRef(false);
  const stickTouchStart = useRef<[number, number]>([ 0, 0 ]);

  useEffect(() => {

    const handleTouchStart = (e: TouchEvent) => {
      // console.log('start', e);
      if (!stickTouched.current) {
        e.touches.length === 1 ? context.keyContext.MouseLeft = true : context.keyContext.MouseRight = true;
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      // console.log('move', e);
      if (stickTouched.current) {

        // 가상 조이스틱 위치 설정
        let deltaX = e.touches[0].clientX - stickTouchStart.current[0];
        let deltaY = e.touches[0].clientY - stickTouchStart.current[1];
        deltaX = deltaX > 0 ? Math.min(50, deltaX) : Math.max(-50, deltaX);
        deltaY = deltaY > 0 ? Math.min(50, deltaY) : Math.max(-50, deltaY);
        if (stick.current) {

          stick.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

          // 방향키 처리
          const left = stick.current.offsetLeft + deltaX;
          const top = stick.current.offsetTop + deltaY;
          // console.log('left', left, 'top', top);

          clearMoveKeys();
          left < 50 && (context.keyContext.KeyA = true);
          left > 50 && (context.keyContext.KeyD = true);
          top < 50 && (context.keyContext.KeyW = true);
          top > 50 && (context.keyContext.KeyS = true);

          if (left > 25 && left < 75) {
            context.keyContext.KeyA = false;
            context.keyContext.KeyD = false;
          }
          if (top > 25 && top < 75) {
            context.keyContext.KeyW = false;
            context.keyContext.KeyS = false;
          }
          
        }

      } else {
        context.keyContext.MouseX = e.touches[e.touches.length - 1].clientX / (context.renderContext ? context.renderContext.getScale() : 1);
        context.keyContext.MouseY = e.touches[e.touches.length - 1].clientY / (context.renderContext ? context.renderContext.getScale() : 1);
      }
    };
    const handleTouchEnd = () => {
      // console.log('end', e);
      if (stickTouched.current) {
        stickTouched.current = false;
        stick.current && (stick.current.style.transform = `translate(${0}px, ${0}px)`);
        clearMoveKeys();
      } else {
        context.keyContext.MouseLeft = false;
        context.keyContext.MouseRight = false;        
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };

  }, []);

  return (
    <>
      {!disabled && (
        <Container flexAlign='center' className='mobile-control'>
          <JoyStick
            ref={stick}
            onTouchStart={(e) => {
              // console.log('stick start');
              stickTouched.current = true;
              stickTouchStart.current = [ e.touches.item(0).clientX, e.touches.item(0).clientY ];
            }}
          /> 
        </Container>
      )}
    </>
  );
}

function clearMoveKeys() {
  context.keyContext.KeyA = false; context.keyContext.KeyD = false; context.keyContext.KeyW = false; context.keyContext.KeyS = false;
}