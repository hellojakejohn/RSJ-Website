import { useState } from "react";
import { Play } from "lucide-react";

interface YouTubeEmbedProps {
  id: string;
  title: string;
  className?: string;
}

// Shows the YouTube thumbnail first and only loads the player iframe on click.
export const YouTubeEmbed = ({ id, title, className = "" }: YouTubeEmbedProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const playing = activeId === id;

  if (playing) {
    return (
      <iframe
        className={`w-full h-full ${className}`}
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActiveId(id)}
      className={`relative w-full h-full block group/yt ${className}`}
      aria-label={`Play ${title}`}
    >
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
        onError={(e) => { e.currentTarget.style.visibility = "hidden"; }}
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/yt:bg-black/10 transition-colors">
        <span className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center">
          <Play className="w-7 h-7 text-white ml-1" fill="currentColor" />
        </span>
      </span>
    </button>
  );
};
