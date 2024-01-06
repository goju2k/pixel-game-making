import { useCallback, useEffect, useState } from 'react';

import './EnglishTestGame.scss';
import { GameMain } from './views/GameMain';
import { LogoView } from './views/LogoView';

import { GameManager } from '../../components/manager/game/GameManager';

export function EnglishTestGame() {

  const [ currViewIdx, setCurrViewIdx ] = useState(0);
  useEffect(() => {
    
  }, []);

  const onLogoEnds = useCallback(() => {
    setTimeout(() => {
      setCurrViewIdx(1);
    }, 1500);
  }, []);

  return (
    <>
      <GameManager
        currViewIdx={currViewIdx}
        views={[
          <LogoView key='logo-view' onEnd={onLogoEnds} />,
          <GameMain key='main-view' />,
        ]}
      />
    </>
  );
}