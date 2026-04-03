import { Navbar, Welcome, Dock } from "#components";
import { Terminal } from "#windows";

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Terminal />
      <Dock />
    </main>
  );
};

export default App;