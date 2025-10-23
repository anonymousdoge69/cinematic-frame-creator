import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface VideoPlayerProps {
  src: string;
  title: string;
  client: string;
  impact: string;
  aspectRatio: "16:9" | "9:16";
}

export const VideoPlayer = ({ src, title, client, impact, aspectRatio }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSoundPrompt, setShowSoundPrompt] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure audio is enabled on first user interaction (mobile browsers)
    video.muted = false;
    setIsMuted(false);

    try { video.volume = 1.0; } catch {}

    try {
      if (isPlaying) {
        await video.pause();
        setIsPlaying(false);
      } else {
        await video.play();
        setIsPlaying(true);
      }
    } catch (err) {
      // If play is blocked (Android/iOS), show explicit sound prompt
      setShowSoundPrompt(true);
    }

    // If after attempting, still muted or volume zero, show prompt
    if (video.muted || video.volume === 0) {
      setShowSoundPrompt(true);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      if (!videoRef.current.muted && videoRef.current.volume > 0) {
        setShowSoundPrompt(false);
      }
    }
  };

  const handleUnmutePlay = async () => {
    const video = videoRef.current;
    if (!video) return;
    try { video.volume = 1.0; } catch {}
    video.muted = false;
    setIsMuted(false);
    try {
      await video.play();
      setIsPlaying(true);
    } catch {}
    setShowSoundPrompt(false);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = clickX / rect.width;
      videoRef.current.currentTime = percentage * videoRef.current.duration;
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const onTime = handleTimeUpdate;
      const onVolume = () => {
        setIsMuted(video.muted);
        if (!video.muted && video.volume > 0) setShowSoundPrompt(false);
      };
      const onPlaying = () => {
        if (!video.muted) setShowSoundPrompt(false);
      };

      video.addEventListener("timeupdate", onTime);
      video.addEventListener("volumechange", onVolume);
      video.addEventListener("playing", onPlaying);

      // Ensure inline playback and audio on mobile (iOS Safari + Android Chrome)
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');
      try { video.volume = 1.0; } catch {}
      video.muted = false;

      // Show native controls on touch devices for reliability
      if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
        setShowControls(true);
      }

      return () => {
        video.removeEventListener("timeupdate", onTime);
        video.removeEventListener("volumechange", onVolume);
        video.removeEventListener("playing", onPlaying);
      };
    }
  }, []);

  return (
    <div 
      className={`group relative overflow-hidden rounded-lg bg-card border-2 border-primary/30 hover:border-primary transition-all duration-500 ${
        aspectRatio === "9:16" ? "md:col-span-1" : "md:col-span-2"
      }`}
      style={{
        boxShadow: "0 0 40px rgba(241, 196, 15, 0.4), 0 0 80px rgba(241, 196, 15, 0.2), 0 8px 32px -8px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent -z-10 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute inset-0 rounded-lg" style={{ boxShadow: "inset 0 0 60px rgba(241, 196, 15, 0.15)" }}></div>
      
      <div className={`relative overflow-hidden bg-black ${aspectRatio === "16:9" ? "aspect-video" : "aspect-[9/16]"}`}>
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-cover cursor-pointer pointer-events-auto"
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          controls={showControls}
          onClick={togglePlay}
          onTouchStart={togglePlay}
          onVolumeChange={() => {
            const v = videoRef.current; if (!v) return;
            setIsMuted(v.muted);
            if (!v.muted && v.volume > 0) setShowSoundPrompt(false);
          }}
          onPlay={() => {
            const v = videoRef.current; if (!v) return;
            if (!v.muted) setShowSoundPrompt(false);
          }}
        />
        
        {/* Play/Pause Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
            <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center">
              <Play className="text-primary-foreground ml-1" size={32} fill="currentColor" />
            </div>
          </div>
        )}

        {/* Sound Prompt for Mobile */}
        {showSoundPrompt && (
          <div className="absolute inset-x-0 bottom-16 flex justify-center z-10">
            <button
              onClick={handleUnmutePlay}
              className="px-4 py-2 rounded-full bg-primary text-primary-foreground shadow-lg ring-1 ring-primary/50 hover:brightness-110 transition"
            >
              Tap for sound
            </button>
          </div>
        )}

        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={togglePlay}
              className="text-white hover:text-primary transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
            </button>
            
            <button
              onClick={toggleMute}
              className="text-white hover:text-primary transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>

          {/* Progress Bar */}
          <div 
            className="w-full h-1 bg-white/30 rounded-full cursor-pointer overflow-hidden"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full bg-primary transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-6 bg-card">
        <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mb-1">{client}</p>
        <p className="text-sm text-primary font-medium">{impact}</p>
      </div>
    </div>
  );
};
