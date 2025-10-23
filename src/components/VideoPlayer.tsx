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

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure audio is enabled on first user interaction (mobile browsers)
    if (isMuted || video.muted) {
      video.muted = false;
      setIsMuted(false);
    }

    try {
      if (isPlaying) {
        await video.pause();
        setIsPlaying(false);
      } else {
        try { video.volume = 1.0; } catch {}
        await video.play();
        setIsPlaying(true);
      }
    } catch (err) {
      // Fallback: try unmuting and playing again
      try {
        video.muted = false;
        setIsMuted(false);
        await video.play();
        setIsPlaying(true);
      } catch {}
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
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
      video.addEventListener("timeupdate", handleTimeUpdate);
      // Ensure inline playback and audio on mobile (iOS Safari)
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');
      // Ensure not muted by default
      try { video.volume = 1.0; } catch {}
      video.muted = false;
      return () => video.removeEventListener("timeupdate", handleTimeUpdate);
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
          className="w-full h-full object-cover cursor-pointer"
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          onClick={togglePlay}
        />
        
        {/* Play/Pause Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
            <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center">
              <Play className="text-primary-foreground ml-1" size={32} fill="currentColor" />
            </div>
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
