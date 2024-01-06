import { Flex } from '@mint-ui/core';
import { useEffect } from 'react';
import styled from 'styled-components';

import { MobileController } from './mobile-control/MobileController';

const Container = styled(Flex)`
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 10;
  pointer-events:none;

  @media(min-width:700px){
    .mobile-control {
      display:none;
    }
  }

`;

const Top = styled(Flex)`
  // background: #d3d3d380;
`;
const Bottom = styled(Flex)`
  // background: #d3d3d380;
`;

export function GameUI() {
  useEffect(() => {
    console.log('game ui');
  }, []);
  return (
    <Container justifyContent='space-between' style={{ position: 'absolute', left: '0px' }}>
      <Top flexSize='50px' />
      <Bottom flexSize='50px' />
      <MobileController disabled={false} />
    </Container>
  );
}