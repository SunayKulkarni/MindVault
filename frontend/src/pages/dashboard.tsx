import { Button } from "../components/ui/Button";
import { PlusIcon } from "../icons/plusIcon";
import { ShareIcon } from "../icons/shareIcon";
import { Card } from "../components/ui/CardComponent";
import { SideBar } from "../components/ui/SideBar";
import { CreateContentPopup } from "../components/ui/CreateContentPopup";
import { useState } from "react";
import SignUp from "../pages/signUp";

export function MainLayout() {
  const [open, setOpen] = useState(false);

  return (

    
    <div className="flex h-screen">

      
      <SideBar />

      
      <div className="flex flex-col flex-1 bg-gray-50 p-6 overflow-y-auto">
        
        <div className="flex justify-end gap-4 mb-6">
          <Button
            startIcon={<PlusIcon />}
            variant="secondary"
            size="lg"
            text="Add"
            onClick={() => setOpen(true)}
          />
          <Button
            startIcon={<ShareIcon />}
            variant="primary"
            size="lg"
            text="Share"
          />
        </div>

        {/* Popup */}
        <CreateContentPopup open={open} onClose={() => setOpen(false)} />

        {/* Cards section */}
        <div className="flex flex-wrap gap-6">
          <Card
            title="Twitter Post"
            link="https://twitter.com/tacchan56110/status/1979532952381100186"
            type="twitter"
          />
          <Card
            title="YouTube Video"
            link="https://www.youtube.com/embed/dQw4w9WgXcQ"
            type="youtube"
          />
          <Card
            title="Reddit Post"
            link="https://www.reddit.com/r/ClashRoyale/comments/1o9rd6d/are_any_of_these_rare/"
            type="reddit"
          />
        </div>
      </div>
    </div>
  );
}


