import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Swap } from "./pages/swap/Swap";
import "./index.css";

function App() {
  return (
    <Theme
      appearance="dark"
      accentColor="violet"
      grayColor="slate"
      radius="medium"
    >
      <div className="app">
        <Swap />
      </div>
    </Theme>
  );
}

export default App;
