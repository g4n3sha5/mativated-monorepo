import { Outlet } from 'react-router-dom';
import { BaseLayout } from './BaseLayout';
import { LeftNavigation } from 'pages/matjournal/common/LeftNavigation';

export default function MatJournalLayout() {
  return (
    <BaseLayout>
      <div className="min-h-screen h-[150vh] xl:h-screen  relative pt-navHeight pl-leftNavWidth">
        <LeftNavigation />
        <Outlet />
      </div>
    </BaseLayout>
  );
}
