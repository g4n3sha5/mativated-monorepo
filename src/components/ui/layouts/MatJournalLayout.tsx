import { Outlet } from 'react-router-dom';
import { BaseLayout } from './BaseLayout';
import { LeftNavigation } from 'pages/matjournal/common/LeftNavigation';

export default function MatJournalLayout() {
  return (
    <BaseLayout>
      <div
        className="pb-5 min-h-screen 
      TODOlg:h-[150vh] TODOxl:h-screen
        relative pt-navHeight pl-leftNavWidth"
      >
        <LeftNavigation />
        <Outlet />
      </div>
    </BaseLayout>
  );
}
