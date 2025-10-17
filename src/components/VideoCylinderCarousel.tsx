import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { VideoPlayer } from "@/components/VideoPlayer";

type CarouselItem = {
  src: string;
  title: string;
  client: string;
  impact: string;
  aspectRatio: "16:9" | "9:16";
};

interface VideoCylinderCarouselProps {
  items: CarouselItem[];
  className?: string;
}

const VideoCylinderCarousel: React.FC<VideoCylinderCarouselProps> = ({ items, className }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [rotation, setRotation] = useState(0);
  const [radius, setRadius] = useState(600); // px fallback
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startRotation, setStartRotation] = useState(0);

  const count = Math.max(items.length, 1);
  const step = 360 / count;

  // Compute radius responsively based on panel width and count
  useEffect(() => {
    const ro = new ResizeObserver(() => {
      const panel = panelRef.current;
      const container = containerRef.current;
      if (!panel || !container) return;
      const panelWidth = panel.getBoundingClientRect().width;
      const n = Math.max(items.length, 1);
      const rad = panelWidth / (2 * Math.tan(Math.PI / n));
      // Clamp radius to keep panels visible and avoid overlap
      const clamped = Math.min(Math.max(rad, 350), Math.max(container.clientWidth, 700));
      setRadius(clamped);
    });

    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [items.length]);

  // Pointer/drag to rotate
  const dragFactor = 0.3; // deg per px

  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartRotation(rotation);
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    setRotation(startRotation - delta * dragFactor);
  };

  const snapToNearest = (rot: number) => {
    const idx = Math.round(((rot % 360) + 360) % 360 / step);
    const snapped = idx * step;
    // We rotate ring negatively so active item faces front
    return snapped;
  };

  const onPointerUp = () => {
    setIsDragging(false);
    setRotation((r) => snapToNearest(r));
  };

  const next = () => setRotation((r) => r + step);
  const prev = () => setRotation((r) => r - step);

  const panels = useMemo(() => items.map((item, i) => ({ item, angle: i * step })), [items, step]);

  return (
    <div className={cn("relative w-full", className)}>
      <div className="flex items-center justify-center">
        <div
          ref={containerRef}
          className="relative w-full max-w-6xl mx-auto h-[360px] md:h-[440px] lg:h-[520px] perspective"
          style={{ perspective: "1200px" }}
        >
          <div
            className={cn(
              "absolute inset-0 mx-auto will-change-transform",
              isDragging ? "cursor-grabbing" : "cursor-grab"
            )}
            style={{
              transformStyle: "preserve-3d",
              transform: `translateZ(${-radius}px) rotateY(${-rotation}deg)`,
              transition: isDragging ? "none" : "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            {panels.map(({ item, angle }, idx) => (
              <div
                key={idx}
                ref={idx === 0 ? panelRef : undefined}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[78%] md:w-[56%] lg:w-[48%]"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="rounded-xl border border-border bg-card/90 shadow-elegant overflow-hidden">
                  <VideoPlayer
                    src={item.src}
                    title={item.title}
                    client={item.client}
                    impact={item.impact}
                    aspectRatio={item.aspectRatio}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <Button variant="outline" size="icon" aria-label="Previous" onClick={prev}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" aria-label="Next" onClick={next}>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default VideoCylinderCarousel;
