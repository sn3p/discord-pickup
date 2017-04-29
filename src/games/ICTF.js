import Game from '../Game';

class ICTF extends Game {
  get name() {
    return 'iCTF';
  }

  get playersRequired() {
    return 1;
  }
}

export default ICTF;
