import { useEffect, useRef, useState } from "react";
import { useLottieStore } from "../store/lottie";
import Lottie from "react-lottie-player";
import { FiPause, FiPlay } from "react-icons/fi";
import { AnimationItem } from "lottie-web";

export default function Canvas() {
  const { lottie, speed, changeSpeed } = useLottieStore();
  const lottieRef = useRef<AnimationItem>();
  const [currentFrame, setCurrentFrame] = useState<number>(lottie?.ip | 0);
  let duration = 0;
  const [play, setPlay] = useState(true);

  if (!lottie) return;

  function onSpeedIncrease() {
    if (!lottie) return;
    let newSpeed = speed * 2;
    if (newSpeed > 16) {
      newSpeed = 1;
    }
    changeSpeed(newSpeed, lottie.fr);
  }

  useEffect(() => {
    if (!lottieRef.current) return;
    const _lottie = lottieRef.current;
    duration = _lottie.getDuration();
    const progressBarInterval = setInterval(() => {
      play && setCurrentFrame(Math.floor(_lottie.currentFrame));
    });

    return () => {
      clearInterval(progressBarInterval);
    };
  }, [lottieRef, lottie]);

  return (
    <div className="flex flex-col items-center justify-center flex-grow w-full">
      <Lottie
        ref={lottieRef}
        className="flex-grow"
        loop
        animationData={lottie}
        play={play}
        useSubframes
        style={{ width: 400, height: 400 }}
      />
      <div className="w-full bg-base-100 flex flex-row justify-center p-4 items-center gap-2">
        <button
          className="btn btn-circle btn-primary text-white flex flex-col justify-center items-center"
          onClick={() => setPlay((prevState) => !prevState)}
        >
          {play ? <FiPause size={24} /> : <FiPlay size={24} />}
        </button>

        <button
          className="btn btn-circle btn-outline text-white flex flex-col justify-center items-center"
          onClick={() => onSpeedIncrease()}
        >
          {speed}x
        </button>

        <progress
          className="progress"
          value={currentFrame}
          max={lottie.op}
        ></progress>
        <div>
          {currentFrame}/{lottie.op}
        </div>
      </div>
    </div>
  );
}
