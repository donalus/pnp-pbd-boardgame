let deckArray = [];
let chosenCardsArray = [];
let gameTabs = [];
let chosenTabs = [];
let decisionsMade = [];

//Local Point Variables
var userTrustPoints = 25;
var devTypePoints = 25;

function saveGame() {}

function resetGame() {
  if (
    window.confirm(
      "Are you sue you want to reset game? You will lose all progress and points will be restarted"
    )
  ) {
    location.reload();
  }
}

function shuffleArray(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

function drawCard() {
  if (deckArray.length != 0) {
    shuffleArray(deckArray);
    // disableElements(obj);
    var activeCardsArray = [];
    var collected_cards = $("#collected-cards");
    var deck = $(".pycard");
    var currentDiv = $(this).parent();
    var arrow_number = $(this).attr("data-arrow-value");
    // Get the modal
    var modal = $("#myModal");
    // Get the <span> element that closes the modal
    var span = $($(".close").get(0));
    // When the user clicks the button, open the modal

    // var chosen = shuffle();
    var modal_div = $("#deck_content");
    var elem_copy = deckArray[0].cloneNode(true);
    if (!elem_copy || typeof (elem_copy == "undefined")) {
      collected_cards.append(elem_copy);
      modal_div.append(deckArray[0]);
      chosenCardsArray.push(elem_copy);
      activeCardsArray.push(elem_copy);
    } else {
      console.log("no");
    }

    cardEvent(activeCardsArray);

    modal.show();
    // When the user clicks on <span> (x), close the modal
    span.on("click", function () {
      modal.hide();
      modal_div.children().remove();
      deckArray.splice(0, arrow_number);
      openNav();
    });
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if ($(event.target).attr("id") == "myModal") {
        modal.hide();
        modal_div.children().remove();
        deckArray.splice(0, arrow_number);
        openNav();
      }
    };
  } else {
    alert("The Deck is Empty!");
  }
}

function cardDecisionModal(
  collection,
  points,
  extraPoints,
  type,
  otherType,
  msg,
  anti_msg,
  value
) {
  console.log("this");
  for (var i = 0; i < chosenTabs.length; i++) {
    console.log("where");
    var pointer_elem_att = chosenTabs[i].getAttribute("collected");
    var pointer_elem_class = chosenTabs[i].classList[2];
    if (pointer_elem_class == collection && pointer_elem_att == value) {
      alert(msg);
      addPoints(points, type);
      console.log("add point");
      break;
    } else {
      let consequence = document.getElementsByClassName(collection);
      let modal = document.getElementById("myModal");
      let parentDiv = document.getElementById("card-content");
      let choiceDiv = document.createElement("div");
      choiceDiv.style.cssFloat = "right";
      choiceDiv.setAttribute("class", "choices");
      // choice.classList.add("well");
      //Modal Elements
      let br = document.createElement("br");
      let h3 = document.createElement("h3");
      let mesg_text = document.createTextNode(anti_msg);
      h3.appendChild(mesg_text);
      choiceDiv.appendChild(h3);
      choiceDiv.appendChild(br);

      let yes_bttn = document.createElement("button");
      yes_bttn.setAttribute("data-collection", collection);
      yes_bttn.setAttribute("id", "decision_yes");
      yes_bttn.setAttribute("class", "button yes-button");
      yes_bttn.setAttribute("onclick", "cardDecisionEvent(this)");
      let yes = document.createTextNode("Yes");
      yes_bttn.appendChild(yes);
      choiceDiv.appendChild(yes_bttn);
      choiceDiv.appendChild(br);

      let no_bttn = document.createElement("button");
      no_bttn.setAttribute("data-collection", collection);
      no_bttn.setAttribute("id", "decision_no");
      no_bttn.setAttribute("class", "button no-button");
      no_bttn.setAttribute("onclick", "cardDecisionEvent(this)");
      let no = document.createTextNode("No");
      no_bttn.appendChild(no);
      choiceDiv.appendChild(no_bttn);

      parentDiv.appendChild(choiceDiv);
      if (extraPoints != 0) {
        addPoints(extraPoints, otherType);
      }
      break;
    }
  }
}

function cardDecisionEvent(elem) {
  var collection = elem.getAttribute("data-collection");
  var modal = document.getElementById("myModal");
  var choice = elem.id;
  console.log(choice);
  if (choice == "decision_yes") {
    for (var i = 0; i < gameTabs.length; i++) {
      if (gameTabs[i].classList[2] == collection) {
        var obj = gameTabs[i].childNodes[21];
        collected(obj);
      }
    }
    modal.style.display = "none";
  } else {
    modal.style.display = "none";
  }
}

function cardEvent(elem) {
  var extraPoints = 0;
  var points;
  var devType = "dev";
  var userType = "user";
  for (var i = 0; i < elem.length; i++) {
    points = 0;
    var selected_card;
    selected_card = elem[i].childNodes[1].id;
    switch (selected_card) {
      case "card_2":
        console.log(selected_card);
        for (var i = 0; i < chosenTabs.length; i++) {
          var pointer_elem_att = chosenTabs[i].getAttribute("collected");
          var pointer_elem_class = chosenTabs[i].classList[2];
          if (
            (pointer_elem_class == "container-two-a" &&
              pointer_elem_att == 1) ||
            (pointer_elem_class == "container-four-a" && pointer_elem_att == 1)
          ) {
            points = -3;
            addPoints(points, devType);
            break;
          }
        }
        break;
      case "card_3":
        console.log(selected_card);
        //Name of the Class of Cards affected
        var collection = "container-four-a";
        //1 = colledted 0 = not collected
        var value = 1;
        //Message if collection in question is collected
        var msg =
          "Because You Shared Contact List, You will lose 3 Developer Resources";
        //Question to Be Asked
        var anti_msg =
          "Do you want to chose to not share contact list in the future?";
        //points affected
        points = -3;
        //type of points affected
        var type = devType;

        //Conditinal params
        extraPoints = 0;
        var otherType = devType;
        cardDecisionModal(
          collection,
          points,
          extraPoints,
          type,
          otherType,
          msg,
          anti_msg,
          value
        );
        break;
      case "card_4":
        console.log(selected_card);
        points = 1;
        addPoints(points, devType);
        break;
      case "card_5":
        console.log(selected_card);
        points = 2;
        addPoints(points, devType);
        break;
      case "card_6":
        console.log(selected_card);
        points = 3;
        addPoints(points, devType);
        break;
      case "card_7":
        console.log(selected_card);
        //Name of the Class of Cards affected
        var collection = "container-two-a";
        //1 = colledted 0 = not collected
        var value = 1;
        //Message if collection in question is collected
        var msg =
          "Because You Shared Information with Other Companies, You will Gaine 2 Developer Resources";
        //Question to Be Asked
        var anti_msg =
          "Do you want to chose Sharing health information with other companies now to earns 5 developer resources?";
        //points affected
        points = 2;
        //type of points affected
        var type = devType;
        //Extra points added because of condition if applicable
        //Conditinal params
        var otherType = devType;
        extraPoints = 5;
        cardDecisionModal(
          collection,
          points,
          extraPoints,
          type,
          otherType,
          msg,
          anti_msg,
          value
        );
        break;
      case "card_8":
        console.log(selected_card);
        //Name of the Class of Cards affected
        var collection = "container-three-b";
        //1 = colledted 0 = not collected
        var value = 1;
        //Message if collection in question is collected
        var msg =
          "Because You shared purchasing information with other companies, You will Gaine 2 Developer Resources";
        //Question to Be Asked
        var anti_msg =
          "Do you want to chose shared purchasing information with other companies now to earns 7 developer resources?";
        //points affected
        points = 2;
        //type of points affected
        var type = devType;
        //Extra points added because of condition if applicable
        var otherType = devType;
        extraPoints = 7;
        cardDecisionModal(
          collection,
          points,
          extraPoints,
          type,
          otherType,
          msg,
          anti_msg,
          value
        );
        break;
      case "card_9":
        console.log(selected_card);
        //Name of the Class of Cards affected
        var collection = "container-four-a";
        //1 = colledted 0 = not collected
        var value = 1;
        //Message if collection in question is collected
        var msg =
          "Because You you shared contact lists with other companies, You will Gaine 2 Developer Resources";
        //Question to Be Asked
        var anti_msg =
          "Do you want to chose Sharing contact lists with other companies now to earns 5 developer resources?";
        //points affected
        points = 2;
        //type of points affected
        var type = devType;
        //Extra points added because of condition if applicable
        var otherType = devType;
        extraPoints = 5;
        cardDecisionModal(
          collection,
          points,
          extraPoints,
          type,
          otherType,
          msg,
          anti_msg,
          value
        );
        break;
      case "card_10":
        //Card 10 has no functionality
        break;
      case "card_11":
        console.log(selected_card);
        //Name of the Class of Cards affected
        var collection = "container-six-b";
        //1 = colledted 0 = not collected
        var value = 1;
        //Message if collection in question is collected
        var msg =
          "Because You collected location data to provide service and maintain site, You will Gaine 2 Developer Resources";
        //Question to Be Asked
        var anti_msg =
          "Do you want to collect location data to provide service and maintain site now to earns 3 developer resources?";
        //points affected
        points = 1;
        //type of points affected
        var type = devType;
        //Extra points added because of condition if applicable
        var otherType = devType;
        extraPoints = 3;
        cardDecisionModal(
          collection,
          points,
          extraPoints,
          type,
          otherType,
          msg,
          anti_msg,
          value
        );
        break;
      case "card_13":
        console.log(selected_card);
        //Name of the Class of Cards affected
        var collection = "container-five-a";
        //1 = colledted 0 = not collected
        var value = 1;
        //Message if collection in question is collected
        var msg =
          "Because You collected site activity for profiling, You will Gaine 2 Developer Resources";
        //Question to Be Asked
        var anti_msg =
          "Do you want to collected site activity for profiling now to earns 3 developer resources?";
        //points affected
        points = 2;
        //type of points affected
        var type = devType;
        //Extra points added because of condition if applicable
        var otherType = devType;
        extraPoints = 3;
        cardDecisionModal(
          collection,
          points,
          extraPoints,
          type,
          otherType,
          msg,
          anti_msg,
          value
        );
        break;
      case "card_14":
        console.log(selected_card);
        //Name of the Class of Cards affected
        var collection = "container-four-b";
        //1 = colledted 0 = not collected
        var value = 1;
        //Message if collection in question is collected
        var msg =
          "Because You collected contact lists to provide service and maintain site, You will Gaine 2 Developer Resources";
        //Question to Be Asked
        var anti_msg =
          "Do you want to collect contact lists to provide service and maintain site now to earns 3 developer resources?";
        //points affected
        points = 1;
        //type of points affected
        var type = devType;
        //Extra points added because of condition if applicable
        var otherType = devType;
        extraPoints = 2;
        cardDecisionModal(
          collection,
          points,
          extraPoints,
          type,
          otherType,
          msg,
          anti_msg,
          value
        );
        break;
      case "card_15":
        console.log(selected_card);
        for (var i = 0; i < chosenTabs.length; i++) {
          var pointer_elem_att = chosenTabs[i].getAttribute("collected");
          var pointer_elem_class = chosenTabs[i].classList[2];
          if (
            (pointer_elem_class == "container-one-a" &&
              pointer_elem_att == 1) ||
            (pointer_elem_class == "container-four-a" && pointer_elem_att == 1)
          ) {
            points = 1;
            addPoints(points, devType);
          }
        }
        break;
      case "card_17":
        console.log(selected_card);
        //Name of the Class of Cards affected
        var collection = "container-four-b";
        //1 = colledted 0 = not collected
        var value = 0;
        //Message if collection in question is collected
        var msg =
          "Because you decided not to collect contact lists for any reason, You will lose 2 Developer Resources";
        //Question to Be Asked
        var anti_msg =
          "Do you want to NOT collect contact lists site now to earns 3 developer resources?";
        //points affected
        points = 3;
        //type of points affected
        var type = userType;

        //Extra points added because of condition if applicable
        var other_type = devType;
        extraPoints = 3;
        cardDecisionModal(
          collection,
          points,
          extraPoints,
          type,
          otherType,
          msg,
          anti_msg,
          value
        );
        break;
      case "card_18":
        console.log(selected_card);
        //Name of the Class of Cards affected
        var collection = "container-five-a";
        //1 = colledted, 0 = not collected
        var value = 0;
        //Message if collection in question is collected
        var msg =
          "Because you decided you decided not to collect site activity for any reason, You will gain 3 Developer Resources";
        //Question to Be Asked
        var anti_msg =
          "Do you want to NOT collect contact lists site now to earns 3 developer resources?";
        //points affected
        points = 3;
        //type of points affected
        var type = userType;

        //Extra points added because of condition if applicable
        var other_type = userType;
        extraPoints = 3;
        cardDecisionModal(
          collection,
          points,
          extraPoints,
          type,
          otherType,
          msg,
          anti_msg,
          value
        );
        break;
      case "card_19":
        console.log(selected_card);
        for (var i = 0; i < chosenTabs.length; i++) {
          var pointer_elem_att = chosenTabs[i].getAttribute("collected");
          var pointer_elem_class = chosenTabs[i].classList[2];
          if (
            pointer_elem_class == "container-one-a" &&
            pointer_elem_att == 0
          ) {
            points = 3;
            addPoints(points, devType);
          }
        }
        break;
      case "card_20":
        // *Change Logic for this* //
        console.log(selected_card);
        for (var i = 0; i < chosenTabs.length; i++) {
          var pointer_elem_att = chosenTabs[i].getAttribute("collected");
          var pointer_elem_class = chosenTabs[i].classList[2];
          if (
            pointer_elem_class == "container-one-a" &&
            pointer_elem_att == 1
          ) {
            points = 3;
            addPoints(points, devType);
          }
        }
        break;
      case "card_21":
        console.log(selected_card);
        for (var i = 0; i < chosenTabs.length; i++) {
          var pointer_elem_att = chosenTabs[i].getAttribute("collected");
          var pointer_elem_class = chosenTabs[i].classList[2];
          if (
            (pointer_elem_class == "container-one-b" &&
              pointer_elem_att == 0) ||
            (pointer_elem_class == "container-two-a" &&
              pointer_elem_att == 0) ||
            (pointer_elem_class == "container-three-b" &&
              pointer_elem_att == 0) ||
            (pointer_elem_class == "container-four-a" &&
              pointer_elem_att == 0) ||
            (pointer_elem_class == "container-five-b" &&
              pointer_elem_att == 0) ||
            (pointer_elem_class == "container-six-a" && pointer_elem_att == 0)
          ) {
            points = 2;
            addMultiplePoints(points, points);
          }
        }
        break;
      case "card_22":
        console.log(selected_card);
        //Do Not Understand Logic surrounding this one.

        break;
      case "card_23":
        console.log(selected_card);
        //Do Not Understand Logic surrounding this one.
        break;
      case "card_24":
        console.log(selected_card);
        //Name of the Class of Cards affected
        var collection = "container-two-b";
        //1 = colledted, 0 = not collected
        var value = 0;
        //Message if collection in question is collected
        var msg =
          "Gain 3 developer resources if you did not collect health information for any reason";
        //Question to Be Asked
        var anti_msg =
          "Do you want to Not collecting health information for any reason earns 3 extra developer resources (in addition to what's written on the board)?";
        //points affected
        points = 3;
        //type of points affected
        var type = devType;

        //Extra points added because of condition if applicable
        var other_type = devType;
        extraPoints = 3;
        cardDecisionModal(
          collection,
          points,
          extraPoints,
          type,
          otherType,
          msg,
          anti_msg,
          value
        );
        break;
      case "card_25":
        console.log(selected_card);
        //Name of the Class of Cards affected
        var collection = "container-four-b";
        //1 = colledted, 0 = not collected
        var value = 0;
        //Message if collection in question is collected
        var msg =
          "Gain 1 developer resource if you did not collect contact lists for any reason";
        //Question to Be Asked
        var anti_msg =
          "Do you want to Not collecting health information for any reason earns 3 extra developer resources (in addition to what's written on the board)?";
        //points affected
        points = 1;
        //type of points affected
        var type = devType;

        //Extra points added because of condition if applicable
        var other_type = devType;
        extraPoints = 1;
        cardDecisionModal(
          collection,
          points,
          extraPoints,
          type,
          otherType,
          msg,
          anti_msg,
          value
        );
        break;
      case "card_26":
        if (checkScore(userType) > 15) {
          points = 1;
          addPoints(points, devType);
        }
        break;
      case "card_28":
        console.log(selected_card);
        //Name of the Class of Cards affected
        var collection = "container-two-a";
        //1 = colledted, 0 = not collected
        var value = 1;
        //Message if collection in question is collected
        var msg =
          "Lose 2 users trusts if you shared health information with other companies.";
        //Question to Be Asked
        var anti_msg =
          "Do you want to Share health information with other companies now costs 6 user trusts?";
        //points affected
        points = -2;
        //type of points affected
        var type = userType;

        //Extra points added because of condition if applicable
        var other_type = userType;
        extraPoints = -6;
        cardDecisionModal(
          collection,
          points,
          extraPoints,
          type,
          otherType,
          msg,
          anti_msg,
          value
        );
        break;
      case "card_29":
        console.log(selected_card);
        //Name of the Class of Cards affected
        var collection = "container-five-a";
        //1 = colledted, 0 = not collected
        var value = 1;
        //Message if collection in question is collected
        var msg =
          "Lose 2 user trusts if you shared site activity with other companies";
        //Question to Be Asked
        var anti_msg =
          "Do you want to Share health information with other companies now costs 7 user trusts?";
        //points affected
        points = -2;
        //type of points affected
        var type = userType;

        //Extra points added because of condition if applicable
        var other_type = userType;
        extraPoints = -7;
        cardDecisionModal(
          collection,
          points,
          extraPoints,
          type,
          otherType,
          msg,
          anti_msg,
          value
        );
        break;
      case "card_30":
        console.log(selected_card);
        for (var i = 0; i < chosenTabs.length; i++) {
          var pointer_elem_att = chosenTabs[i].getAttribute("collected");
          var pointer_elem_class = chosenTabs[i].classList[2];
          if (
            pointer_elem_class == "container-six-a" &&
            pointer_elem_att == 1
          ) {
            points = -2;
            addPoints(points, userType);
          }
        }
        break;
      case "card_31":
        points = 3;
        addPoints(points, userType);
        break;
      case "card_32":
        points = 2;
        addPoints(points, userType);
        break;
      case "card_33":
        points = 1;
        addPoints(points, userType);
        break;
      case "card_34":
        //Do Not Understand Logic surrounding this one.
        break;
      case "card_36":
        //Do Not Understand Logic surrounding this one.
        break;
      default:
    }
  }
}

function disableElements(elem) {
  var elem_id = elem.id;

  if (elem_id == "arrow_one") {
    var row = document.getElementsByClassName("row-one-a");
    for (var i = 0; i < row.length; i++) {
      row[i].setAttribute("style", "opacity: 0.4; pointer-events: none");
    }
  } else if (elem_id == "arrow_two") {
    var row = document.getElementsByClassName("row-one-b");
    for (var i = 0; i < row.length; i++) {
      row[i].setAttribute("style", "opacity: 0.4; pointer-events: none");
    }
    // row.style.opacity = "0.4";
    // row.stlye.pointerEvents = "none";
  } else if (elem_id == "arrow_three") {
  } else if (elem_id == "arrow_four") {
  } else if (elem_id == "arrow_five") {
  } else if (elem_id == "arrow_six") {
  } else if (elem_id == "arrow_seven") {
  } else if (elem_id == "arrow_eight") {
  } else if (elem_id == "arrow_nine") {
  } else if (elem_id == "arrow_ten") {
  } else if (elem_id == "arrow_eleven") {
  }
}

function addPoints(points, type) {
  $("#loadingModal").show();

  if (type == "dev") {
    var cur_dev_points = parseInt($("#dev-points").text());

    $("#dev-points").html(cur_dev_points + parseInt(points));
  } else if (type == "user") {
    var cur_user_points = parseInt($("#user-points").text());

    $("#user-points").html(cur_user_points + parseInt(points));
  } else {
    console.log("no type sent to addPoints");
  }

  setTimeout(function () {
    $("#loadingModal").hide();
    openNav();
    setTimeout(function () {
      closeNav();
    }, 1000);
  }, 100);
}

function addMultiplePoints(user_points, dev_points) {
  $("#loadingModal").show();
  var cur_user_points = parseInt($("#user-points").text());
  var cur_dev_points = parseInt($("#dev-points").text());

  $("#user-points").html(cur_user_points + parseInt(user_points));
  $("#dev-points").html(cur_dev_points + parseInt(dev_points));

  setTimeout(function () {
    $("#loadingModal").hide();
    openNav();
    setTimeout(function () {
      closeNav();
    }, 1000);
  }, 100);
}

function collected() {
  var theButton = $(this);
  var currentDiv = theButton.parent();
  var devTimeCost = parseInt($(currentDiv.find(".cost").get(0)).html());
  var userTrustCost = parseInt($(currentDiv.find(".cost").get(1)).html());
  var devTimeBenefit = parseInt($(currentDiv.find(".benefit").get(0)).html());
  var userTrustBenefit = parseInt($(currentDiv.find(".benefit").get(1)).html());
  var devTimeDelta;
  var userTrustDelta;
  var devTime = 0;
  var userTrust = 0;

  var collected;

  if (currentDiv.attr("collected") == 0) {
    devTimeDelta = devTimeBenefit;
    userTrustDelta = userTrustBenefit;
  } else if (currentDiv.attr("collected") == 1) {
    devTimeDelta = devTimeCost;
    userTrustDelta = userTrustCost;
  } else {
    devTimeDelta = 0;
    userTrustDelta = 0;
  }

  if (
    theButton.hasClass("collect-button") ||
    theButton.hasClass("collect-button")
  ) {
    collected = 1;
    
    devTime = devTimeCost - devTimeDelta;
    userTrust = userTrustCost - userTrustDelta;

    currentDiv.removeClass("container-not-collected");
    currentDiv.addClass("container-collected");
  } else {
    collected = 0;
    
    devTime = devTimeBenefit - devTimeDelta;
    userTrust = userTrustBenefit - userTrustDelta;

    currentDiv.addClass("container-not-collected");
    currentDiv.removeClass("container-collected");
  }
  currentDiv.attr("collected", collected);

  chosenTabs.push(currentDiv);
  addMultiplePoints(userTrust, devTime);
}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
  $("#mySidenav").css("width", "300px");
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  $("#mySidenav").css("width", "0");
}

jQuery(function () {
  let parentDeck = $("#deck");
  let childCards = $(".pycard");
  deckArray = [...childCards];

  //Add Tabs to deckArray
  let tabs = $(".tabs");
  gameTabs = [...tabs];

  $("button").on("click", collected);
  $("#resetGame").on("click", resetGame);
  $("#openNav").on("click", openNav);
  $("#closeNav").on("click", closeNav);
  $(".draw-card").on("click", drawCard);
});
