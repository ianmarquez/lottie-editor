import { useLottieStore } from "../../store/lottie";

export default function MainLayer() {
  const { lottie } = useLottieStore();

  if (!lottie) return null;

  return (
    <div>
      {lottie.nm}({lottie.op})
    </div>
  );
}
