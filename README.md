# discord-pickup

Pickup Game Bot for [Discord](https://discordapp.com).
This is very WIP and far from finished, so use at your own risk.

## Installation

Node.js v6.x or newer is required.

Install dependencies using `npm install`.

```bash
npm install
npm run build
npm run start
```

Or `npm run serve` to start the bot while monitoring for changes (handy while developing).

## Configuration

Create a config.json that looks like this:

```json
{
  "token": "DISCORD_BOT_TOKEN",
  "prefix": "."
}
```

## TODO

All the things and more:

- discord.on('message') is not triggered after editing the message.
- Store games for later reference (`.last`, `.lastt`, `.lasttt`).
- Store player stats (`.stats @playername`).
- Remove players when they disconnect.
- Remove player from other pugs when a pug starts.
- Auto remove users after a while (timeout).

#### Commands

Commands that might be implemented in the future:

```
.j ictf - join ictf pug
.l ictf - leave ictf pug
.lva - leave all pugs
.p ictf - promote ictf
.last(tt) - shows last pug(s)
.nocapt - opt to not be captain
.captain - opt to be captain
.nomic -  to show you have no microphone
.tag [message] - tag your name
.invite -  shows invite link for discord server
.server(s) - shows server ip addresses
.stats - shows your stats
.stats @playername - shows stats for player
.pugstats - shows complete pugstats
```

Admin commands that might be implemented in the future:

```
.addserver 'adds a server'
.removeserver 'removes a server'
.server 'shows servers'
.rules 'shows the actual rules for our community on discord'
.addrule 'adds a rules for our community on discord'
.removerule 'removes a rule for our community on discord'
.addgamemode 'iCTF' '5v5 Instagib CTF' '10' 'True' 'True' (just example)
.removegamemode <id> 'removes a gamemode'
.showwarnings 'shows the active warnings'
.addwarning '<player> <reason> adds a warning for a player'
.deactivatewarning '<warningnumber> deletes a warning'
.showwarningslog 'shows the warningslog'
.reportwarning '<player> <reason> reports a warning for a player to the staffs'
.showkickedlog 'shows the kicked players log'
.kick '<playername> <reason> kicks a player'
.showbanned 'shows banned players'
.addbanned '<playername> <reason> <timerange> <timestep> bans a player'
.removebanned '<playername> <reason> unbans a player'
.extendbanned <playername> <reason> <timerange> <timestep> extends the ban duration of a player'
.showbannedlog 'shows the log of banned players'
.adminadd '<player> <ids> <pg>' (adds player in pug)
.adminremove '<player> <ids> <pg> Removes player from pugs'
.adminremoveall '<players> Removes players from all pugs'
.reset '<id> <pg> Resets a pug'
.deletepug '<id> <pg> Deletes a pug'
.adminpick '<player> Picks a player for current team'
.admintag '<player> <text> Tags/untags a text for a player'
```

## Contributions

We are open for suggestions. Please feel free to open a new issue to post your ideas.
