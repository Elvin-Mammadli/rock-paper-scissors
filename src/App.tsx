import Balance from "@/components/Balance";
import Betting from "@/components/Betting";
import Result from "@/components/Result";
import AppContextProvider from "@/context/AppContextProvider";

function App() {
  return (
    <AppContextProvider>
      <main className="flex flex-col flex-1 bg-slate-400 h-screen bg-gradient-to-b from-[#484848] to-[#1e1e1e]">
        <Balance />
        <Result />
        <Betting />
      </main>
    </AppContextProvider>
  );
}

export default App;
