import { TwitterIcon } from "../../icons/TwitterIcon"
import { YoutubeIcon } from "../../icons/YoutubeIcon"
import { RedditIcon } from "../../icons/RedditIcon"
import { MainIcon } from "../../icons/MainIcon"

export const SideBar = () => {
  return (
    <div className="flex flex-col w-64 h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white p-6 border-r border-slate-800">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center font-bold text-slate-900">
          <MainIcon />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent">
          MindVault
        </h2>
      </div>

      <ul className="space-y-3 w-full flex-1">
        <li className="group flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-slate-800/50 hover:border-cyan-400/30 border border-transparent hover:shadow-lg hover:shadow-cyan-500/10">
          <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors">
            <TwitterIcon />
          </div>
          <span className="font-medium group-hover:text-cyan-300 transition-colors">Twitter</span>
        </li>

        <li className="group flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-slate-800/50 hover:border-cyan-400/30 border border-transparent hover:shadow-lg hover:shadow-cyan-500/10">
          <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors">
            <YoutubeIcon />
          </div>
          <span className="font-medium group-hover:text-cyan-300 transition-colors">Youtube</span>
        </li>

        <li className="group flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-slate-800/50 hover:border-cyan-400/30 border border-transparent hover:shadow-lg hover:shadow-cyan-500/10">
          <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors">
            <RedditIcon />
          </div>
          <span className="font-medium group-hover:text-cyan-300 transition-colors">Reddit</span>
        </li>
      </ul>

      <div className="pt-6 border-t border-slate-800/50">
        <p className="text-xs text-slate-400 text-center">
          Powered by <span className="text-cyan-400 font-semibold">MindVault</span>
        </p>
      </div>
    </div>
  )
}
