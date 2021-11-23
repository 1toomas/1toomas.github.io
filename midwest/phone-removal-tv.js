const message = `<span data-sm-show-media-selection-on="mouseover">Contact Us!</span>`;
const phoneArr = Array.from(document.body.querySelectorAll(".phone-number"));

// Act based on queue availability
sm.getApi({version: 'v1'}).then((glia) => {
  //
  const onQueueStateUpdate = (queueState) => {
    if (queueState.state === queueState.QUEUE_STATES.CAN_QUEUE) {
      phoneArr.forEach((elem) => {
        elem.innerHTML = message;
      });
    } else if (queueState.state === queueState.QUEUE_STATES.CANNOT_QUEUE) {
      phoneArr.forEach((elem) => {
        elem.innerHTML = elem.getAttribute("glia-phone-orig");
      });
    }
  }
  //
  phoneArr.forEach((elem) => {
    elem.setAttribute("glia-phone-orig", elem.innerHTML);
  });
  // 
  glia.addEventListener(glia.EVENTS.QUEUE_STATE_UPDATE, onQueueStateUpdate);
});