import { SessionIconRecord } from 'utils/types';
import Gi from 'assets/images/sessionTypes/gi.svg?react';
import Nogi from 'assets/images/sessionTypes/no-gi.svg?react';
import Gym from 'assets/images/sessionTypes/gym.svg?react';
import Yoga from 'assets/images/sessionTypes/yoga.svg?react';
import Mma from 'assets/images/sessionTypes/mma.svg?react';
import Boxing from 'assets/images/sessionTypes/boxing.svg?react';
import Run from 'assets/images/sessionTypes/run.svg?react';
import Swim from 'assets/images/sessionTypes/swim.svg?react';
import Bike from 'assets/images/sessionTypes/bike.svg?react';
import Meditation from 'assets/images/sessionTypes/meditation.svg?react';
import Other from 'assets/images/sessionTypes/other.svg?react';
import Choke from 'assets/images/techniqueTypes/choke.png';
import JointLock from 'assets/images/techniqueTypes/joint-lock.png';
import Sweep from 'assets/images/techniqueTypes/sweep.png';
import Takedown from 'assets/images/techniqueTypes/takedown.png';
import Control from 'assets/images/techniqueTypes/control.png';
import Transition from 'assets/images/techniqueTypes/transition.png';
import GuardPass from 'assets/images/techniqueTypes/guard-pass.png';
import Position from 'assets/images/techniqueTypes/position.png';
import Guard from 'assets/images/techniqueTypes/guard.png';
import Defence from 'assets/images/techniqueTypes/defence.png';
import Escape from 'assets/images/techniqueTypes/escape.png';
import Submission from 'assets/images/techniqueTypes/submission.png';
import { faBoltLightning, faFeather, faFire, faScaleBalanced } from '@fortawesome/free-solid-svg-icons';
import { Collection } from 'react-bootstrap-icons';

export const sessionTypeOptions: SessionIconRecord[] = [
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

export const techniqueTypeOptions: { label: string; type: string; image: string }[] = [
  { label: 'Choke', type: 'CHOKE', image: Choke },
  { label: 'Takedown', type: 'TAKEDOWN', image: Takedown },
  { label: 'Joint Lock', type: 'JOINT_LOCK', image: JointLock },
  { label: 'Sweep', type: 'SWEEP', image: Sweep },
  { label: 'Transition', type: 'TRANSITION', image: Transition },
  { label: 'Guard', type: 'GUARD', image: Guard },
  { label: 'Guard Pass', type: 'GUARD_PASS', image: GuardPass },
  { label: 'Control', type: 'CONTROL', image: Control },
  { label: 'Defence', type: 'DEFENCE', image: Defence },
  { label: 'Escape', type: 'ESCAPE', image: Escape },
  { label: 'Position', type: 'POSITION', image: Position },
  { label: 'Submission', type: 'SUBMISSION', image: Submission },
];

export const totalSessionTypeOptions: SessionIconRecord[] = [
  { label: 'Total', type: 'TOTAL', Icon: Collection },
  ...sessionTypeOptions,
];

export const intensityLevelsOptions: { value: string; label: string; icon: any }[] = [
  { value: 'LIGHT', label: 'Light', icon: faFeather },
  { value: 'MODERATE', label: 'Moderate', icon: faScaleBalanced },
  { value: 'HIGH', label: 'High', icon: faFire },
  { value: 'VERY_HIGH', label: 'Very high', icon: faBoltLightning },
];
