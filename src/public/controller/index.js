let deckArray = [];

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
  if (deckArray.length > 0) {
    $(this).off("click").addClass("arrow-disabled");

    var arrow_number = $(this).attr("data-arrow-value");

    /*
    var elem_copy = deckArray[0].cloneNode(true);
    if (!elem_copy || typeof (elem_copy == "undefined")) {
      $("#collected-cards").append(elem_copy);
      $("#deck_content").append(deckArray[0]);
      chosenCardsArray.push(elem_copy);
      activeCardsArray.push(elem_copy);
    } else {
      console.log("no");
    }
    */
    console.log("drawCard: ", arrow_number);
    for (var i = 0; i < arrow_number; i++) {
      var active_card = $(deckArray.shift());
      $("#collected-cards").append(active_card);
      $("#deck_content").append(active_card.clone());
      cardEvent(active_card);
    }
    $("#myModal").show();
    // When the user clicks on <span> (x), close the modal
    $(".close:first").on("click", function () {
      $("#myModal").hide();
      $("#deck_content").children().remove();
      openNav();
    });
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if ($(event.target).attr("id") == "myModal") {
        $("#myModal").hide();
        $("#deck_content").children().remove();
        openNav();
      }
    };
  } else {
    alert("The Deck is Empty!");
  }
}

function cardEvent(card) {
  var devType = "dev";
  var userType = "user";
  var points = 0;
  var selected_card;
  selected_card = $(card.children("div.card").get(0)).attr("id");
  console.log("cardEvent:", selected_card);

  switch (selected_card) {
    case "card_2":
      $(
        ".health.share.container-collected, .contacts.share.container-collected"
      ).each(function () {
        addPoints(-3, devType);
      });

      $(".health.share, .contacts.share").each(function () {
        if (
          !$(this).hasClass("container-collected") &&
          !$(this).hasClass("container-not-collected")
        ) {
          dev = parseInt($(this).find(".benefit:first").text());
          user = parseInt($(this).find(".benefit:last").text());
          addMultiplePoints(user, dev);
          $(this).addClass("container-not-collected");
        }
      });
      break;
    case "card_3":
      $(".contacts.share.container-collected").each(function () {
        addPoints(-3, devType);
      });

      $(".contacts.share").each(function () {
        if (
          !$(this).hasClass("container-collected") &&
          !$(this).hasClass("container-not-collected")
        ) {
          dev = parseInt($(this).find(".benefit:first").text());
          user = parseInt($(this).find(".benefit:last").text());
          addMultiplePoints(user, dev);
          $(this).addClass("container-not-collected");
        }
      });
      break;
    case "card_4":
      points = 1;
      addPoints(1, devType);
      break;
    case "card_5":
      points = 2;
      addPoints(points, devType);
      break;
    case "card_6":
      points = 3;
      addPoints(points, devType);
      break;
    case "card_7":
      if ($(".health.share.corporations").hasClass("container-collected")) {
        points = 2;
        addPoints(points, devType);
      } else {
        $(".health.share.corporations .cost:first").text("+5");
      }
      break;
    case "card_8":
      if ($(".purchasing.share.corporations").hasClass("container-collected")) {
        points = 2;
        addPoints(points, devType);
      } else {
        $(".purchasing.share.corporations .cost:first").text("+5");
      }
      break;
    case "card_9":
      if ($(".contacts.share.corporations").hasClass("container-collected")) {
        points = 2;
        addPoints(points, devType);
      } else {
        $(".contacts.share.corporations .cost:first").text("+5");
      }
      break;
    case "card_10":
      if ($(".location.share.corporations").hasClass("container-collected")) {
        points = 3;
        addPoints(points, devType);
      } else {
        $(".location.share.corporations .cost:first").text("+6");
      }
      break;
    case "card_11":
      if ($(".health.service.collect").hasClass("container-collected")) {
        points = 1;
        addPoints(points, devType);
      } else {
        $(".health.service.colllect .cost:first").text("+3");
      }
      break;
    case "card_13":
      if ($(".activity.profiling.collect").hasClass("container-collected")) {
        points = 1;
        addPoints(points, devType);
      } else {
        $(".activity.profiling.collect .cost:first").text("+3");
      }
      break;
    case "card_14":
      if ($(".contacts.service.collect").hasClass("container-collected")) {
        points = 1;
        addPoints(points, devType);
      } else {
        $(".contacts.service.collect .cost:first").text("+2");
      }
      break;
    case "card_15":
      if ($(".demographic.service.collect").hasClass("container-collected")) {
        points = 1;
        addPoints(points, devType);
      }
      break;
    case "card_17":
      if (
        $(
          ".contacts.share.container-collected, .contacts.collect.container-collected"
        ).length > 0
      ) {
        points = 3;
        addPoints(points, userType);
      } else {
        $(".contacts.collect").each(function () {
          item = $(this).find(".benefit:first");
          curBene = parseInt(item.text());
          item.text(curBene + 3);
        });
      }
      break;
    case "card_18":
      if (
        $(
          ".activity.share.container-collected, .activity.collect.container-collected"
        ).length > 0
      ) {
        points = 3;
        addPoints(points, userType);
      } else {
        $(".activity.collect").each(function () {
          item = $(this).find(".benefit:last");
          curBene = parseInt(item.text());
          item.text(curBene + 3);
        });
      }
      break;
    case "card_19":
      if (
        $(
          ".demographic.share.container-collected, .demographic.collect.container-collected"
        ).length > 0
      ) {
        points = 3;
        addPoints(points, userType);
      }
      break;
    case "card_20":
      if ($(".corporations.share.container-collected").length > 3) {
        addMultiplePoints(-2, -2);
      }
      break;
    case "card_21":
      if ($(".corporations.share.container-collected").length == 0) {
        addMultiplePoints(2, 2);
      }
      break;
    case "card_22":
      $(".demographic.profiling, .health.profiling").each(function () {
        var devCost = parseInt($(this).find(".cost:first").text());
        var userCost = parseInt($(this).find(".cost:last").text());
        var devBene = parseInt($(this).find(".benefit:first").text());
        var userBene = parseInt($(this).find(".benefit:last").text());
        if ($(this).hasClass("container-not-collected")) {
          $(this).removeClass("container-not-collected");
          $(this).addClass("container-collected");
          addMultiplePoints(userCost - userBene, devCost - devBene);
        } else if (!$(this).hasClass("container-collected")) {
          $(this).addClass(".container-collected");
          addMultiplePoints(userCost, devCost);
        }
      });
      break;
    case "card_23":
      $(".purchasing.marketing, .contacts.marketing").each(function () {
        var devCost = parseInt($(this).find(".cost:first").text());
        var userCost = parseInt($(this).find(".cost:last").text());
        var devBene = parseInt($(this).find(".benefit:first").text());
        var userBene = parseInt($(this).find(".benefit:last").text());
        if ($(this).hasClass("container-not-collected")) {
          $(this).removeClass("container-not-collected");
          $(this).addClass("container-collected");
          addMultiplePoints(userCost - userBene, devCost - devBene);
        } else if ($(this).hasClass("container-collected")) {
          addPoints(1, devType);
        }
      });
      if (
        !$(".purchasing.marketing").hasClass("container-collected") &&
        !$(".purchasing.marketing").hasClass("container-not-collected")
      ) {
        $(".purchasing.marketing").find(".cost:first").text(5);
      }
      break;
    case "card_24":
      if ($(".health.collect.container-not-collected").length == 3) {
        points = 3;
        addPoints(points, devType);
      } else {
        $(".health.collect").each(function () {
          if (
            !$(this).hasClass("container-collected") &&
            !$(this).hasClass("container-not-collected")
          ) {
            var item = $(this).find(".benefit:first");
            var cur_dev_points = parseInt(item.text());
            item.text(cur_dev_points + 3);
          }
        });
      }
      break;
    case "card_25":
      if ($(".contacts.collect.container-not-collected").length == 3) {
        points = 1;
        addPoints(points, devType);
      } else {
        $(".contacts.collect").each(function () {
          if (
            !$(this).hasClass("container-collected") &&
            !$(this).hasClass("container-not-collected")
          ) {
            var item = $(this).find(".benefit:first");
            var cur_dev_points = parseInt(item.text());
            item.text(cur_dev_points + 1);
          }
        });
      }
      break;
    case "card_26":
      if (parseInt($("#user-points").text()) > 15) {
        points = 1;
        addPoints(points, devType);
      }
      break;
    case "card_28":
      if ($(".health.corporations.container-collected").length > 0) {
        points = -2;
        addPoints(points, userType);
      }
      $(".health.corporations .cost:last").text("-6");
      break;
    case "card_29":
      if ($(".activity.corporations").hasClass("container-collected")) {
        points = -2;
        addPoints(points, userType);
      } else {
        $(".activity.corporations").find(".cost:last").text("-7");
      }
      break;
    case "card_30":
      if ($(".location.collected.container-collected").length > 0) {
        points = -2;
        addPoints(points, userType);
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
      $(".collect.container-collected").each(function () {
        var categories = [
          "demographics",
          "health",
          "purchasing",
          "contacts",
          "activity",
          "location",
        ];
        categories.forEach(function (category) {
          if ($(this).hasClass(category)) {
            var gov = $(".share.government." + category);
            var devCost = parseInt(gov.find(".cost:first").text());
            var userCost = parseInt(gov.find(".cost:last").text());
            var devBene = parseInt(gov.find(".benefit:first").text());
            var userBene = parseInt(gov.find(".benefit:first").text());
            if (gov.hasClass(".container-not-collected")) {
              gov.removeClass("container-not-collected");
              gov.addClass("container-collected");
              addMultiplePoints(userCost - userBene, devCost - devBene);
            } else if (!gov.hasClass(".container-collected")) {
              gov.addClass("container-collected");
              addMultiplePoints(userCost, devCost);
            }
          }
        });
      });
      break;
    case "card_36":
      //User Action
      break;
    default:
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
  var devTimeCost = parseInt(currentDiv.find(".cost:first").text());
  var userTrustCost = parseInt(currentDiv.find(".cost:last").text());
  var devTimeBenefit = parseInt(currentDiv.find(".benefit:first").text());
  var userTrustBenefit = parseInt(currentDiv.find(".benefit:last").text());
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
  let childCards = $(".pycard");
  deckArray = shuffleArray([...childCards]);

  $("button").on("click", collected);
  $("#resetGame").on("click", resetGame);
  $("#openNav").on("click", openNav);
  $("#closeNav").on("click", closeNav);
  $(".draw-card").on("click", drawCard);
});
