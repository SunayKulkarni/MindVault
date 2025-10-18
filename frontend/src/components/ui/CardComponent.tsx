import { useEffect } from "react";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "reddit";
}

export const Card = ({ title, link, type }: CardProps) => {
  useEffect(() => {
    if (type === "twitter" && (window as any).twttr) {
      (window as any).twttr.widgets.load();
    } else if (type === "reddit" && (window as any).reddit) {
      (window as any).reddit.init();
    }
  }, [type, link]);

  return (
    <div className="max-w-sm bg-white rounded-2xl shadow-lg p-6 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-3">{title}</h2>
      <p className="text-gray-600 mb-4">
        This is a description of the card content. It subtly moves when hovered.
      </p>

      
      {type === "youtube" && (
        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={link}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      )}


      {type === "twitter" && (
        <blockquote className="twitter-tweet">
          <a href={link}></a>
        </blockquote>
      )}

      
      {type === "reddit" && (
        <blockquote
          className="reddit-embed-bq"
          data-embed-height="490"
          style={{ height: "500px" }}
        >
          <a href={link}></a>
        </blockquote>
      )}
    </div>
  );
};
