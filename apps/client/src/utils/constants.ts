import {
  DateScopeKey,
  IntensityDictionary,
  IntensityReadable,
  LabelValue,
  SessionIconRecord,
  StatisticDateScope,
  StatisticsFilter,
} from 'utils/types';
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
import Collection from 'assets/images/sessionTypes/collection.svg?react';
import { IconDefinition, faBoltLightning, faFeather, faFire, faScaleBalanced } from '@fortawesome/free-solid-svg-icons';

export const sessionTypeIconDictionary: SessionIconRecord[] = [
  { label: 'Gi', type: 'GI', Icon: Gi },
  { label: 'No-Gi', type: 'NO_GI', Icon: Nogi },
  { label: 'Gym', type: 'GYM', Icon: Gym },
  { label: 'Yoga', type: 'YOGA', Icon: Yoga },
  { label: 'MMA', type: 'MMA', Icon: Mma },
  { label: 'Boxing', type: 'BOXING', Icon: Boxing },
  { label: 'Running', type: 'RUN', Icon: Run },
  { label: 'Swimming', type: 'SWIM', Icon: Swim },
  { label: 'Bike', type: 'BIKE', Icon: Bike },
  { label: 'Meditation', type: 'MEDITATION', Icon: Meditation },
  { label: 'Other', type: 'OTHER', Icon: Other },
];

export const totalSessionTypeIconDictionary: SessionIconRecord[] = [
  { label: 'Total', type: 'TOTAL', Icon: Collection },
  ...sessionTypeIconDictionary,
];

export const intensityLevels: {
  value: keyof typeof IntensityDictionary;
  label: IntensityReadable;
  icon: IconDefinition;
}[] = [
  { value: 'LIGHT', label: 'Light', icon: faFeather },
  { value: 'MODERATE', label: 'Moderate', icon: faScaleBalanced },
  { value: 'HIGH', label: 'High', icon: faFire },
  { value: 'VERY_HIGH', label: 'Very high', icon: faBoltLightning },
];

export const overviewStatisticOption = {
  label: 'Overview',
  type: 'OVERVIEW',
  Icon: Collection,
} as StatisticsFilter;

export const statisticsTypeOptions = [overviewStatisticOption, ...sessionTypeIconDictionary];
