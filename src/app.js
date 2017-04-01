'use strict';

import * as _ from 'underscore';
import { Game } from './game';
// import { generate } from 'dungeon-map-generator';
import { generate } from '../../dungeon-generator';

import { config } from './config';

import './style.css';

let dungeon = generate();

var game = new Game(dungeon);
// game.start();
