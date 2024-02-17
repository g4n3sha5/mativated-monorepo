import { Outlet } from 'react-router-dom';
import { LeftNavigation } from 'pages/matjournal/common/LeftNavigation';
import { ProtectedBaseLayout } from 'components/ui/layouts/ProtectedBaseLayout';

export default function MatJournalLayout() {
  return (
    <ProtectedBaseLayout>
      <div
        className="pb-5 min-h-screen 
      TODOlg:h-[150vh] TODOxl:h-screen
        relative pt-navHeight pl-leftNavWidth"
      >
        <LeftNavigation />
        <Outlet />
      </div>
    </ProtectedBaseLayout>
  );
}
