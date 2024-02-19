import { SessionIconDictionary } from 'utils/types';
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
import { IconDefinition, faBoltLightning, faFeather, faFire, faScaleBalanced } from '@fortawesome/free-solid-svg-icons';

// todo
export const sessionTypeIconDictionary: SessionIconDictionary[] = [
  { visibleName: 'Gi', type: 'GI', Icon: gi },
  { visibleName: 'No-Gi', type: 'NO_GI', Icon: nogi },
  { visibleName: 'Gym', type: 'GYM', Icon: gym },
  { visibleName: 'Yoga', type: 'YOGA', Icon: yoga },
  { visibleName: 'MMA', type: 'MMA', Icon: mma },
  { visibleName: 'Boxing', type: 'BOXING', Icon: boxing },
  { visibleName: 'Running', type: 'RUN', Icon: run },
  { visibleName: 'Swimming', type: 'SWIM', Icon: swim },
  { visibleName: 'Bike', type: 'BIKE', Icon: bike },
  { visibleName: 'Meditation', type: 'MEDITATION', Icon: meditation },
  { visibleName: 'Other', type: 'OTHER', Icon: other },
];

export const quickTimeValues = Array.from(Array(65).keys())
  .map((number) => {
    if (number > 1 && number % 5 === 0) return number;
  })
  .filter(Number);

export const IntensityDictionary = {
  LIGHT: 'Light',
  MODERATE: 'Moderate',
  HIGH: 'High',
  VERY_HIGH: 'Very high',
} as const;

export const intensityLevels: {
  value: (typeof IntensityDictionary)[keyof typeof IntensityDictionary];
  icon: IconDefinition;
}[] = [
  { value: 'Light', icon: faFeather },
  { value: 'Moderate', icon: faScaleBalanced },
  { value: 'High', icon: faFire },
  { value: 'Very high', icon: faBoltLightning },
];
