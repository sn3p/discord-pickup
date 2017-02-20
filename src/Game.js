class Game {
  constructor(options) {
    this._players = [];
  }

  get name() {
    return 'unknown';
  }

  get playersRequired() {
    return 10;
  }

  get isFull() {
    this._players.count === this.playersRequired;
  }

  get players() {
    return this._players;
  }

  addPlayer(user) {
    // Check if the pug is full
    if (this.isFull) {
      return;
    }

    // Is player is already added?
    let player = this.findPlayer(user);
    if (player) {
      return;
    }

    // Create new player entry
    // TODO: Create a player/entry Class
    player = {
      id: user.id,
      name: user.username,
      timestamp: +new Date(),
    }
    this._players.push(player);

    // Check if the pug is filled
    // if (this.isFull) {
    //   return;
    // }

    return player;
  }

  findPlayer(user) {
    return this._players.find(p => p.id === user.id);
  }
}

export default Game;
