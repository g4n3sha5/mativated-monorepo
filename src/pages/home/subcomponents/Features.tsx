import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/Card';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faChartLine, faChartSimple, faLockOpen, faUsersRectangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Feature {
  icon: IconProp;
  title: string;
  description: string;
}

export const Features = () => {
  const darkPurple = getComputedStyle(document.documentElement).getPropertyValue('--darkPurple');

  return (
    <section className="bg-darkPurple lg:px-8 pt-12 min-h-screen  pb-12 ">
      <h1 className="pl-3 font-bold text-paleWhite text-4xl mb-2 ">Features</h1>
      <h2 className="pl-3 text-2xl w-2/3 lg:w-1/2 font-normal text-white tracking-tighter mb-3">
        Unlock a world of possibilities with Mativated, the ultimate companion for every Jiu Jitsu enthusiast. Dive into
        a blend of technology and tradition, designed to elevate your training experience and ignite your passion for
        martial arts.
      </h2>

      <div className="flex gap-x-12 gap-y-8 px-8 w-screen flex-wrap">
        {featuresList.map((feature) => (
          <Card className="w-full lg:w-2/5  h-88 bg-paleWhite shadow-lg shadow-indigo-700">
            <CardHeader className="pb-3">
              <div className="bg-violet-300 w-fit border-2 rounded-lg border-indigo-500 d-flex justify-center p-2">
                <FontAwesomeIcon size="xl" icon={feature.icon as IconProp} color={darkPurple} />
              </div>

              <CardTitle className="text-xl font-semibold text-black tracking-normal font-rubik">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                <p className="text-lg font-rubik text-blue-900 tracking-[1]">{feature.description}</p>
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

const featuresList: Feature[] = [
  {
    icon: faLockOpen,
    title: 'Unlock the Art',
    description:
      'Dive deep into the world of Jiu Jitsu techniques with our innovative technique mastery feature. Explore a curated library of techniques, each accompanied by detailed tutorials and insights from seasoned practitioners. Track your progress, master new moves, and elevate your skill set to new heights.',
  },
  {
    icon: faChartLine,
    title: 'Training Enhancement',
    description:
      "Track, Reflect, Grow: Keep a detailed Brazilian Jiu Jitsu journal to track your progress and reflect on each session's learnings. Gain valuable insights into your training habits and performance with an intuitive dashboard.",
  },
  {
    icon: faChartSimple,
    title: 'Insightful dashboard',
    description:
      'Stay organized and focused on your Jiu Jitsu goals. Prioritize tasks, set goals, and conquer your objectives with ease. Receive personalized notifications to stay informed about club activities and upcoming training sessions.',
  },

  {
    icon: faUsersRectangle,
    title: 'Social Integration',
    description:
      "Connect with fellow enthusiasts, share your achievements, and collaborate on training plans. Compete in friendly challenges, track each other's progress, and celebrate victories together. With our social integration feature, your martial arts journey becomes a vibrant community experience.",
  },
];
