import KnitAuth from "./components/Knit";

function App() {
  return (
    <div style={{ marginLeft: "3rem" }}>
      <KnitAuth btnString="Connect with your app" />
      <div style={{ display: "flex", margin: "5rem 0", width: "600px" }}>
        <div style={{ width: "50%" }}>
          <KnitAuth category="HRIS" btnString="Connect with your HRIS" />
        </div>
        <div style={{ width: "50%" }}>
          <KnitAuth
            category="HRIS"
            apps={["successfactors"]}
            btnString="Connect with Successfactors"
          />
        </div>
      </div>
      <div style={{ display: "flex", margin: "5rem 0", width: "600px" }}>
        <div style={{ width: "50%" }}>
          <KnitAuth category="ATS" btnString="Connect with your ATS" />
        </div>
        <div style={{ width: "50%" }}>
          <KnitAuth
            category="ATS"
            apps={["greenhouse"]}
            btnString="Connect with Greenhouse"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
