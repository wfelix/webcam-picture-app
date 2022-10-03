/* eslint-disable @typescript-eslint/no-unused-expressions */
import "./App.css";
import { createRef, useCallback, useEffect, useState } from "react";

function App() {
  const [settings, setSettings] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const localVideoref = createRef<HTMLVideoElement>();
  const appRef = createRef<HTMLDivElement>();

  const onAudio = useCallback(() => {
    console.log("onAudio...");
    setIsAudioEnabled(!isAudioEnabled);
    setSettings(!settings);
  }, [isAudioEnabled, settings]);

  const onContextMenu = useCallback(
    (e: any) => {
      console.log("onContextMenu...");
      setSettings(!settings);
    },
    [settings]
  );

  const getMedia = useCallback(async () => {
    let stream = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (localVideoref && localVideoref.current) {
        localVideoref.current.srcObject = stream;
        localVideoref.current.muted = isAudioEnabled;
      }
    } catch (error) {}
  }, [localVideoref, isAudioEnabled]);

  useEffect(() => {}, [appRef]);

  useEffect(() => {
    getMedia();
  }, [getMedia]);

  return (
    <div className={"app"} onContextMenu={onContextMenu}>
      <div className="wrapper">
        <video ref={localVideoref} autoPlay></video>
      </div>
      {settings && (
        <>
          <div className="settings-card">
            <h5>Configurações</h5>
            <ul>
              <li className={isAudioEnabled ? "inactive" : "active"}>
                <div onClick={onAudio}>
                  <span>
                    {isAudioEnabled ? "Habilitar" : "Desabilitar"} Audio
                  </span>
                </div>
              </li>
              <li onClick={() => setSettings(false)}>Sair</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
