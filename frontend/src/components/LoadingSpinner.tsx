import { useLoadingStore } from "../store/loading";

export default function LoadingSpinner() {
  const { loading } = useLoadingStore();

  if (!loading) return null;

  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 bg-base-100/80 flex flex-col justify-center items-center z-[1000]">
      <span className="loading loading-spinner loading-lg"></span>
      <p>Loading please wait</p>
    </div>
  );
}
