import Button from "react-bootstrap/Button";

import "assets/css/fisco-custom.css";

function Dialog({ message, onDialog }) {
    return (
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          backgroundColor: "rgba(0,0,0,0.5)"
        }}
        onClick={() => onDialog(false)}
      >
        <div
        className="customDialog"
          onClick={(e) => e.stopPropagation()}
        >
          <h4 stlye={{fontSize: "14px" }}>{message}</h4>
          {/* <h5 style={{fontSize: "24px" }}>{nameProduct}</h5> */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              onClick={(e) => onDialog(true, e)}
              type="button" 
              variant="danger"
            >
              Yes
            </Button>
            <Button
              onClick={(e) => onDialog(false, e)}
              type="button" 
              variant="success"
            >
              No
            </Button>
          </div>
        </div>
      </div>
    );
  }
  export default Dialog;
  