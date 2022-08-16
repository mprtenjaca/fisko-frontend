const notify = (place, type, notificationAlert) => {
    var options = {};
    
    options = {
      place: place,
      message: (
        <div>
          <div>
            {type === "success" ? "Success!" : "Error!"}
          </div>
        </div>
      ),
      type: type,
      icon: "now-ui-icons ui-1_bell-53",
      autoDismiss: 7,
    };
    notificationAlert.current.notificationAlert(options);
};

export default notify;