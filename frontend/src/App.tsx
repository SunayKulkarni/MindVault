import { Button } from "./components/ui/Button";
import { PlusIcon } from "./icons/plusIcon";
import { ShareIcon } from "./icons/shareIcon";
import { Card } from "./components/ui/CardComponent";
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
      <Card title="Twitter Post" link="https://twitter.com/tacchan56110/status/1979532952381100186" type="twitter" />
      <br />
      <Card title="YouTube Video" link="https://www.youtube.com/embed/dQw4w9WgXcQ" type="youtube" />
      <br />
      <Card title="Reddit Post" link="https://www.reddit.com/r/ClashRoyale/comments/1o9rd6d/are_any_of_these_rare/" type="reddit" />
    </div>
  );
}

export default App;
