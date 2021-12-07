const messagePhone = `<span data-sm-show-media-selection-on="mouseover">Contact Us!</span>`;
const messagePhoneLink = `<a data-sm-show-media-selection-on="click" href="javascript:void(0);">Contact Us!</a>`;
const messageContactAny = `<a data-sm-show-media-selection-on="click" href="javascript:void(0);">Contact Us!</a>`;
const phoneArr = Array.from(document.body.querySelectorAll(".phone-number"));
const phoneLinkArr = Array.from(document.body.querySelectorAll(".phone-number-link"));
const contactAnyArr = Array.from(document.body.querySelectorAll(".contact-any"));

sm.getApi({version: 'v1'}).then((glia) => {
  //
  const onQueueStateUpdate = (queueState) => {
    // Some of the numbers are replaced when there is a queue available regardless of media type.
    // The phone numbers are changed back when no queue is available.
    if (queueState.state === queueState.QUEUE_STATES.CAN_QUEUE) {
      // replace phone numbers with Contact Us text
      contactAnyArr.forEach((elem) => {
        elem.innerHTML = messageContactAny;
      });
    } else if (queueState.state === queueState.QUEUE_STATES.CANNOT_QUEUE) {
      // replace Contact Us text with the initial phone number
      contactAnyArr.forEach((elem) => {
        elem.innerHTML = elem.getAttribute("glia-phone-orig");
      });
    }
    // Other phone numbers are replaced when a queue with audio or phone ability is available.
    // The phone numbers are changed back when no 
    if (queueState.state === queueState.QUEUE_STATES.CAN_QUEUE &&
        (queueState.medias.indexOf('audio') >= 0 || queueState.medias.indexOf('phone') >= 0)) {
      // replace phone numbers with Contact Us text
      phoneArr.forEach((elem) => {
        elem.innerHTML = messagePhone;
      });
      phoneLinkArr.forEach((elem) => {
        elem.innerHTML = messagePhoneLink;
      });
    } else if (queueState.state === queueState.QUEUE_STATES.CANNOT_QUEUE) {
//    || (queueState.medias.indexOf('audio') === -1 && queueState.medias.indexOf('phone') === -1) ) {
      // replace Contact Us text with phone numbers
      phoneArr.forEach((elem) => {
        elem.innerHTML = elem.getAttribute("glia-phone-orig");
      });
      phoneLinkArr.forEach((elem) => {
        elem.innerHTML = elem.getAttribute("glia-phone-orig");
      });
    }
  }
  // Store the initial situation so it can be replaced back and forth
  phoneArr.forEach((elem) => {
    elem.setAttribute("glia-phone-orig", elem.innerHTML);
  });
  phoneLinkArr.forEach((elem) => {
    elem.setAttribute("glia-phone-orig", elem.innerHTML);
  });
  contactAnyArr.forEach((elem) => {
    elem.setAttribute("glia-phone-orig", elem.innerHTML);
  });
  // Add listener to act in case any queue state is changed
  glia.addEventListener(glia.EVENTS.QUEUE_STATE_UPDATE, onQueueStateUpdate);
});


// // Act based on availability of a queue with audio or phone ability
// sm.getApi({version: 'v1'}).then(function(glia) {
//   function onQueueStateUpdate(queueState) {
//     if (queueState.state === queueState.QUEUE_STATES.CAN_QUEUE &&
//         (queueState.medias.indexOf('audio') >= 0 || queueState.medias.indexOf('phone') >= 0)) {
//       // replace phone numbers with Contact Us text
//       phoneArr.forEach((elem) => {
//         elem.innerHTML = message;
//       });
//     } else {
//       // replace Contact Us text with phone numbers
//       phoneArr.forEach((elem) => {
//         elem.innerHTML = elem.getAttribute("glia-phone-orig");
//       });
//     };
//   }
  
//   glia.addEventListener(glia.EVENTS.QUEUE_STATE_UPDATE, onQueueStateUpdate);
// });