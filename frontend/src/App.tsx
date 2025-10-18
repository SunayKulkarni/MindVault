import { Button } from "./components/ui/Button";
import { PlusIcon } from "./icons/plusIcon";
import { ShareIcon } from "./icons/shareIcon";
import { Card } from "./components/ui/Button"
import  { SideBar } from "./components/ui/SideBar";
function App() {
  return (
    <>
      <ShareButton />
    </>
  );
}

function ShareButton() {
  return (
    <div>
      <br />
      <Button startIcon={<PlusIcon />} variant="secondary" size="lg" text="Share" onClick={() => {}} />
      <Button startIcon={<ShareIcon />} variant="primary" size="lg" text="Share" onClick={() => {}} />
      <Card />
      <SideBar />
    </div>
  );
}

export default App;
