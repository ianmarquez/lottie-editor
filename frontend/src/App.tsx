import Canvas from "./components/Canvas";
import LayerNav from "./components/Editor/LayerNav";
import FloatingActionButton from "./components/FloatingActionButton";
import LoadingSpinner from "./components/LoadingSpinner";
import UploadDialog from "./components/UploadDialog";
import { pusher } from "./lib/PusherClient";
import { userConnected } from "./services/lottie";
import { useClientStore } from "./store/client";
import { useLottieStore } from "./store/lottie";
import { useEffect } from "react";

function App() {
  const { lottie } = useLottieStore();
  const { setClientId, clientId } = useClientStore();

  const broadcastUserConnection = async () => {
    try {
      if (clientId) {
        await userConnected(clientId);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    pusher.subscribe("lottie_canvas");
    pusher.connection.bind("connected", () => {
      setClientId(pusher.connection.socket_id);
    });

    return () => pusher.unsubscribe("lottie_canvas");
  }, []);

  useEffect(() => {
    broadcastUserConnection();
  }, [clientId]);

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
