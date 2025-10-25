 import { useRef, useState } from "react"
 import { CrossIcon } from "../../icons/crossIcon"
import axios from "axios";
import { BACKEND_URL } from "../../config";
 export const CreateContentPopup = ({ open, onClose }) => {
    const titleref  = useRef<HTMLInputElement>(null);
    const linkref  = useRef<HTMLInputElement>(null);
    const platformref  = useRef<HTMLSelectElement>(null);

  async function addcontent() {
    const title = titleref.current?.value.trim();
    const link = linkref.current?.value.trim();
    const platform = platformref.current?.value;

    if (!title || !link || !platform) {
      alert("Please fill in all fields.");
    }
    
    try{
      await axios.post(`${BACKEND_URL}/api/v1/content`, {
        title,
        link,
        type: platform,
      }, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      alert("Content Added Successfully");
      onClose();
    } catch (error) {
      console.error("Error adding content:", error);
      alert("Failed to add content.");
    }

   
  }
  return (
    <div>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-80 transition-opacity duration-300"
          onClick={onClose}
        ></div>
      )}
      {open && (
        <div className="fixed w-full max-w-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-2xl shadow-2xl z-90 transition-all duration-300">
          <button
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 text-gray-500 hover:text-gray-700"
            onClick={onClose}
            aria-label="Close">
            <CrossIcon />
          </button>

          <h2 className="text-2xl font-bold text-gray-900 mb-1">Add New Content</h2>

          <form className="flex flex-col gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                placeholder="Enter content title"
                ref={titleref}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Link</label>
              <input
                type="text"
                placeholder="https://example.com"
                ref={linkref}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Platform</label>
              <select ref={platformref} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white appearance-none cursor-pointer">

                <option value="twitter">𝕏 Twitter</option>
                <option value="youtube">YouTube</option>
                <option value="reddit">Reddit</option>
              </select>
            </div>

            <div className="flex justify-center pt-4">
              <button type="button" onClick={addcontent} className="relative w-full h-12 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold overflow-hidden group hover:shadow-lg transition-all duration-300 active:scale-95">
                <span className="relative z-10 flex items-center justify-center gap-2 group-hover:gap-3 transition-all duration-300">
                  <span>Add Content</span>
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line x1="12" x2="12" y1="5" y2="19"></line>
                    <line x1="5" x2="19" y1="12" y2="12"></line>
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
