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
    console.log('isFull()', this._players.length, this.playersRequired)
    return this._players.length === this.playersRequired;
  }

  get players() {
    return this._players;
  }

  /**
   * Add a player to this game
   */
  addPlayer(user) {
    // Ignore if the game is already filled
    if (this.isFull) {
      console.log('PUG is already filled')
      return;
    }

    // Ignore if the player is already added
    if (this.findPlayer(user)) {
      console.log('Player is already added')
      return;
    }

    // Add the player
    const player = {
      id: user.id,
      name: user.username,
      timestamp: +new Date(),
    }
    this._players.push(player);

    return player;
  }

  /**
   * Find a player in this game
   */
  findPlayer(user) {
    return this._players.find(p => p.id === user.id);
  }
}

export default Game;
