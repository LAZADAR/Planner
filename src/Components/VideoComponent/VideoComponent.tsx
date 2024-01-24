import React from 'react';
import styles from './VideoComponent.module.scss';
import LightVideo from '../../videos/Video1BG.mp4';
import DarkVideo from '../../videos/vecteezy_gradiente-de-cor-movendo-o-fundo-na-tela_7704135.mp4';
import { useAppSelector } from '../../hooks';
const VideoComponent = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    const preventFullscreen = () => {
      const currentVideoRef = videoRef.current;
      if (currentVideoRef && document.fullscreenElement) {
        exitFullscreen();
      }
    };

    if (videoRef.current) {
      videoRef.current.addEventListener('play', preventFullscreen);
    }

    document.addEventListener('fullscreenchange', preventFullscreen);

    return () => {
      const currentVideoRef = videoRef.current;
      if (currentVideoRef) {
        currentVideoRef.removeEventListener('play', preventFullscreen);
      }

      document.removeEventListener('fullscreenchange', preventFullscreen);
    };
  }, []);

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    }
  };
  return (
    <>
      <video
        ref={videoRef}
        src={DarkVideo}
        autoPlay
        muted
        loop
        playsInline
        className={theme ? 'DarkVideo ' : 'DarkVideo Transperent '}
      />
      <video
        ref={videoRef}
        src={LightVideo}
        autoPlay
        muted
        loop
        playsInline
        className={!theme ? 'LightVideo ' : 'LightVideo Transperent '}
      />
    </>
  );
};

export default VideoComponent;
