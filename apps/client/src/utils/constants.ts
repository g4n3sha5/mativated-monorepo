import { IntensityReadable, SessionIconDictionary } from 'utils/types';
import Gi from 'assets/images/sessionTypes/gi.svg?react';
import Nogi from 'assets/images/sessionTypes/nogi.svg?react';
import Gym from 'assets/images/sessionTypes/gym.svg?react';
import Yoga from 'assets/images/sessionTypes/yoga.svg?react';
import Mma from 'assets/images/sessionTypes/mma.svg?react';
import Boxing from 'assets/images/sessionTypes/boxing.svg?react';
import Run from 'assets/images/sessionTypes/run.svg?react';
import Swim from 'assets/images/sessionTypes/swim.svg?react';
import Bike from 'assets/images/sessionTypes/bike.svg?react';
import Meditation from 'assets/images/sessionTypes/meditation.svg?react';
import Other from 'assets/images/sessionTypes/other.svg?react';
import { IconDefinition, faBoltLightning, faFeather, faFire, faScaleBalanced } from '@fortawesome/free-solid-svg-icons';

export const sessionTypeIconDictionary: SessionIconDictionary[] = [
  { visibleName: 'Gi', type: 'GI', Icon: Gi },
  { visibleName: 'No-Gi', type: 'NO_GI', Icon: Nogi },
  { visibleName: 'Gym', type: 'GYM', Icon: Gym },
  { visibleName: 'Yoga', type: 'YOGA', Icon: Yoga },
  { visibleName: 'MMA', type: 'MMA', Icon: Mma },
  { visibleName: 'Boxing', type: 'BOXING', Icon: Boxing },
  { visibleName: 'Running', type: 'RUN', Icon: Run },
  { visibleName: 'Swimming', type: 'SWIM', Icon: Swim },
  { visibleName: 'Bike', type: 'BIKE', Icon: Bike },
  { visibleName: 'Meditation', type: 'MEDITATION', Icon: Meditation },
  { visibleName: 'Other', type: 'OTHER', Icon: Other },
];

export const quickTimeValues = Array.from(Array(65).keys())
  .map((number) => {
    if (number > 1 && number % 5 === 0) return number;
  })
  .filter(Number) as number[];

export const IntensityDictionary = {
  LIGHT: 'Light',
  MODERATE: 'Moderate',
  HIGH: 'High',
  VERY_HIGH: 'Very high',
} as const;

export const intensityLevels: {
  value: keyof typeof IntensityDictionary;
  readable: IntensityReadable;
  icon: IconDefinition;
}[] = [
  { value: 'LIGHT', readable: 'Light', icon: faFeather },
  { value: 'MODERATE', readable: 'Moderate', icon: faScaleBalanced },
  { value: 'HIGH', readable: 'High', icon: faFire },
  { value: 'VERY_HIGH', readable: 'Very high', icon: faBoltLightning },
];
