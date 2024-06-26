import progress from 'assets/images/Gregor_Cresnar.png';
import buddha from 'assets/images/amit-kumar.webp';
import { Button } from 'components/ui/Button';
import { Card, CardContent, CardHeader } from 'components/ui/Card';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export const Buddha = () => {
  return (
    <section className="w-full bg-buddhaSection lg:p-20 lg:pt-10 row grid grid-cols-16 justify-center lg:justify-between items-start gap-5 ">
      <div className="lg:col-span-7 flex justify-center col-span-full pt-32 lg:pt-12 fitIMG">
        <img className="shadow-buddha w-2/3 md:w-3/4 lg:w-full xl:w-3/4" src={buddha} alt="Buddha" />
      </div>

      <div className="lg:col-span-9 col-span-full px-3 pt-12 lg:pl-16  flex flex-col justify-center items-center rounded-md pb-10">
        <Card className="shadow-blockQuote m-0 bg-gray-100 p-2 py-4 flex flex-col justify-center">
          <CardHeader className="pt-0 mb-1 pb-2 flex flex-row justify-center">
            <img src={progress} alt="Growth icon" className="w-12 " />
          </CardHeader>
          <CardContent className="text-center mb-0">
            <blockquote className="blockquote p-3 text-xl font-light">
              <div className="pb-5">
                <p className="lead font-italic tracking-tight">
                  <FontAwesomeIcon icon={faQuoteLeft} className="mr-2" size="sm" color="rgb(13, 110, 253)" />
                  Every action you take is a vote for the person you wish to become.
                  <br />
                  The only way I made progress – the only choice I had – was to start small.
                </p>
              </div>
              <figcaption className="-mt-1 text-[#6c757d] text-lg  mb-0">- James Clear - Atomic Habits</figcaption>
            </blockquote>
          </CardContent>
        </Card>

        <div className="text-2xl pt-5 text-white text-center px-2">
          <article>
            As science proves, the best way to achieve our goals is to create a system, that will make us embrace the
            routine without obsessing over the final objective. <br />
            The best way to boost your motivation is to appreciate your small wins. Every small step you accomplish
            gives you a feeling of power.
            <h2 className="my-5 tracking-tight text-4xl lg:text-5 font-bold font-rubik">
              STAY MATI<span className="font-extrabold">VA</span>TED.
            </h2>
          </article>
        </div>

        <Button variant="secondaryCyan" className="text-paleWhite text-lg font-semibold  tracking-tight rounded-lg bg">
          <Link to="sign-up">Join Now</Link>
        </Button>
      </div>
    </section>
  );
};
