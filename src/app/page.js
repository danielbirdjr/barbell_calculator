export default function Home() {
  return (
    <main>
      <div className="nav-bar">
        <h1>Barbell Calculator</h1>
      </div>
      <div className="barbell-display-container">
        <div className="weight-display"></div>
        <div className="barbell-display"></div>
      </div>
      <div className="calculation-and-options-container">
        <div className="enter-weight-and-input-container">
          <h3>Enter Weight</h3>
          <input></input>
        </div>
        <div className="options-container">
          <div className="units-container">
            <h3>Select Units</h3>
            <div className="units-options-container">
              <div className="weight-unit">
                <input type="checkbox"></input>
                <label>LB</label>
              </div>
              <div className="weight-unit">
                <input type="checkbox"></input>
                <label>KG</label>
              </div>
              
            </div>
          </div>
          <div className="barbell-weight-container">
            <h3>Select Barbell</h3>
            <div className="barbell-weight-options">
              <button>45 lb</button>
              <button>20 lb</button>
              <button>0 lb</button>
            </div>
          </div>
        </div>
        <div className="calculate-button-container">
          <button>Calculate plates</button>
        </div>
      </div>
    </main>
  );
}
