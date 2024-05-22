import { MatJournalSection } from '@/pages/matjournal/common/MatJournalSection';
import { StatisticsPanel } from '@/pages/matjournal/dashboard/subcomponents/statisticsPanel/StatisticsPanel';

export const Dashboard = () => (
  <MatJournalSection>
    {/* <h1>Average fight time per week</h1>
    <h1>Average fight time per month</h1>
    <h1>Average training time per week</h1> */}

    <StatisticsPanel />
  </MatJournalSection>
);
