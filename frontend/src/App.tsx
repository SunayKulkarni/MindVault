import { Button } from "./components/ui/Button";
import { PlusIcon } from "./icons/plusIcon";
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
      <Button startIcon={PlusIcon} variant="primary" size="sm" text="Share" onClick={() => {}} />
        <br />
      <Button variant="secondary" size="lg" text="Share" onClick={() => {}} />
    </div>
  );
}

export default App;
