import "./App.css";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Swap } from "./Swap";

function App() {
  return (
    <Theme
      appearance="dark"
      accentColor="violet"
      grayColor="slate"
      radius="medium"
    >
      <Swap />
    </Theme>
  );
}

export default App;
