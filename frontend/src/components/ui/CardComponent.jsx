export default function Card({ title, content }) {
  return (
 <div className="max-w-sm bg-white rounded-2xl shadow-lg p-6 transform transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-2xl">
      <TitleIcon />
      <div>Title</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-3">{title}</h2>
      <p className="text-gray-600 mb-4">{content}</p>
      <p className="text-gray-600 mb-4">
        <blockquote
          className="reddit-embed-bq"
          style={{ height: 500 }}
          data-embed-height="546"
        >
          <a href="https://www.reddit.com/r/unixporn/comments/1o70tf8/hyprland_2nd_rice_and_probably_my_last_hopefully/">
            [Hyprland] 2nd rice and probably my last (hopefully)
          </a>
          <br />
          by{" "}
          <a href="https://www.reddit.com/user/PomegranateOverall84/">
            u/PomegranateOverall84
          </a>{" "}
          in <a href="https://www.reddit.com/r/unixporn/">unixporn</a>
        </blockquote>
      </p>
    </div>
  );
}
