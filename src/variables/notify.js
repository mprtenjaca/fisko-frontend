const notify = (place, type, notificationAlert, message) => {
    var options = {};
    
    options = {
      place: place,
      message: (
        <div>
          <div>
            {type === "success" ? "Success!" : message}
          </div>
        </div>
      ),
      type: type,
      icon: "now-ui-icons ui-1_bell-53",
      autoDismiss: 5,
    };
    notificationAlert.current.notificationAlert(options);
};

export default notify;