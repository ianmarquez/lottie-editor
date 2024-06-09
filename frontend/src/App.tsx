import Canvas from "./components/Canvas";
import LayerNav from "./components/Editor/LayerNav";
import FloatingActionButton from "./components/FloatingActionButton";
import LoadingSpinner from "./components/LoadingSpinner";
import UploadDialog from "./components/UploadDialog";
import { useLottieStore } from "./store/lottie";

function App() {
  const { lottie } = useLottieStore();

  return (
    <div className="flex flex-col h-full ">
      <LoadingSpinner />
      <div className="flex flex-row w-full flex-grow bg-red-50">
        <LayerNav />
        <div className="flex flex-col flex-grow h-[100vh] bg-gray-300 justify-center items-center">
          {lottie ? <Canvas /> : <UploadDialog />}
        </div>
      </div>
      <FloatingActionButton />
    </div>
  );
}

export default App;
