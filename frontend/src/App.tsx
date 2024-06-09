import Canvas from "./components/Canvas";
import LayerNav from "./components/Editor/LayerNav";
import LoadingSpinner from "./components/LoadingSpinner";
import Navbar from "./components/NavBar";
import UploadDialog from "./components/UploadDialog";
import { useLottieStore } from "./store/lottie";

function App() {
  const { lottie } = useLottieStore();

  return (
    <div className="flex flex-col h-full">
      <LoadingSpinner />
      <Navbar />
      <div className="flex flex-row w-100 h-full bg-red-50 flex-grow">
        <div className="flex flex-col h-full w-fit">
          <LayerNav />
        </div>
        <div className="flex flex-col h-full flex-grow bg-gray-300 justify-center items-center">
          {lottie ? <Canvas /> : <UploadDialog />}
        </div>
        {lottie && (
          <div className="flex flex-col h-full w-fit bg-base-200">settings</div>
        )}
      </div>
      {/* {lottie && <div className="w-100 h-1/2 bg-base-300">timeline</div>} */}
      {/* <FloatingActionButton /> */}
    </div>
  );
}

export default App;
