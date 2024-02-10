import { SessionIconPair } from 'utils/types';
import gi from 'assets/images/sessionTypes/gi.svg?react';
import nogi from 'assets/images/sessionTypes/nogi.svg?react';
import gym from 'assets/images/sessionTypes/gym.svg?react';
import yoga from 'assets/images/sessionTypes/yoga.svg?react';
import mma from 'assets/images/sessionTypes/mma.svg?react';
import boxing from 'assets/images/sessionTypes/boxing.svg?react';
import run from 'assets/images/sessionTypes/run.svg?react';
import swim from 'assets/images/sessionTypes/swim.svg?react';
import bike from 'assets/images/sessionTypes/bike.svg?react';
import meditation from 'assets/images/sessionTypes/meditation.svg?react';
import other from 'assets/images/sessionTypes/other.svg?react';

// todo
export const sessionTypeIconDictionary: SessionIconPair[] = [
  { type: 'GI', Icon: gi },
  { type: 'NOGI', Icon: nogi },
  { type: 'GYM', Icon: gym },
  { type: 'YOGA', Icon: yoga },
  { type: 'MMA', Icon: mma },
  { type: 'BOXING', Icon: boxing },
  { type: 'RUN', Icon: run },
  { type: 'SWIM', Icon: swim },
  { type: 'BIKE', Icon: bike },
  { type: 'MEDITATION', Icon: meditation },
  { type: 'OTHER', Icon: other },
];
