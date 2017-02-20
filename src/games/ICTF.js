import Game from '../Game';

class ICTF extends Game {
  get name() {
    return 'iCTF';
  }

  get spots() {
    return 1;
  }
}

export default ICTF;
