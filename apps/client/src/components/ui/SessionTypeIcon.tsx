import { type SessionType } from '@mativated-monorepo/server/src/utils/types';
import { useMemo } from 'react';
import { sessionTypeOptions } from 'utils/constants';
import cx from 'classnames';

export const SessionTypeIcon = ({ type, className }: { type: SessionType; className?: string }) => {
  const entry = useMemo(() => sessionTypeOptions.find((entry) => entry.type === type), [type]);
  if (!entry) return type;

  return (
    <div className="lg:ml-2">
      <entry.Icon className={cx(className ? className : 'w-auto lg:py-1 h-8 lg:h-14 fill-white stroke-white')} />
    </div>
  );
};
