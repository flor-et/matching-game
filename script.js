//
//image list
//*****replace placeholder images*****
//

let cardUrl = {
  back: "https://drive.google.com/uc?id=1ZdtsjjXgLvArdlRLSiRV1MtnKnOebsgb",
  //placeholders
  cedar:
    "https://www.plantsnap.com/wp-content/uploads/2021/01/shutterstock_675610708.jpg",
  olive:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOPkRPgekii0oziWtd2IV2mmiwVjjTxHO7kA&usqp=CAU",
  seeds:
    "https://image.freepik.com/free-photo/assorted-seeds-background_23-2147669613.jpg",
  lock: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTFFWDCyK1kHTPrcXmCul4rc0ZEBfgqNdj6g&usqp=CAU",
  flower:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToRezkwDQuBcBOEME6IfuRphZf7OIZmCDjEw&usqp=CAU",
  glasses:
    "https://www.hearthsong.com/medias/sys_master/images/images/h86/h18/8799209062430/732275-HSSP18-AF6752.jpg",
  vase: "https://media.vogue.co.uk/photos/5f117eb03c1efdd3ca2b0a0a/4:3/w_832,h_624,c_limit/anissakermiche_53593536_314595042592731_5268500492999095647_n.jpg",
  key: "https://image.shutterstock.com/image-photo/old-brass-key-against-white-260nw-431648011.jpg",
};

//
$(document).ready(function () {
  $(".inner").css("background-image", `url(${cardUrl.back}`);
});

//
//create board
//

let count = 0;
let randomNo;
let numList = [];
let cardList = [
  "cedar",
  "olive",
  "seeds",
  "lock",
  "flower",
  "glasses",
  "vase",
  "cedar",
  "olive",
  "seeds",
  "lock",
  "flower",
  "glasses",
  "vase",
  "key",
];
//
for (let i = 0; i < cardList.length; i++) {
  let boxId = "box" + count;
  let imgId = "img" + count;
  randomNo = Math.ceil(Math.random() * (cardList.length - 0.1) + 0.1) - 1;
  while (numList.includes(randomNo) == true) {
    randomNo = Math.ceil(Math.random() * (cardList.length - 0.1) + 0.1) - 1;
  }
  numList.push(randomNo);
  let card = cardList[numList[i]];
  console.log(card);
  $(".outer").append(
    `<div class = 'inner ${card}' id = ${boxId}> <img class = 'innerImg' id = ${imgId} src = ${cardUrl[card]}> </div>`
  );

  count = count + 1;
}

//
//flip card
//

let matches = 0;
let cardId = [];
let classes = [];

$(".inner").click(function () {
  $(".inner").css("pointer-events", "none");
  if (matches < 7) {
    let boxId = $(this).attr("id");
    let imgId = "img" + boxId.slice(3);
    cardId.push(imgId);

    if (cardId[0] == cardId[1]) {
      alert("You clicked on the same card!");
      $(".inner").css("pointer-events", "all");
      cardId.splice(1);
    } else {
      $(`#${imgId}`).animate({ width: "100%", opacity: "100%" });
      let className = this.className;
      className = className.slice(6);
      classes.push(className);
      console.log("Class: " + className);
      checkMatch(imgId[0], imgId[1], classes[0], classes[1]);
    }
  } else if (matches == 7) {
    $(".innerImg").animate({ width: "100%", opacity: "100%" });
    setTimeout(function () {
      alert("Congratulations, it's a match!");
      matches++;
      $("h3").text("Matches: " + matches);

      setTimeout(function(){
        $(".inner").fadeOut()
      },2000)
    }, 2000);
  }
});

//
//check matches
//

function checkMatch(a, b, c, d) {
  let id0 = a;
  let id1 = b;
  let class1 = c;
  let class2 = d;
  //
  if (class1 == class2) {
    //
    matches++;
    setTimeout(function () {
      alert("Congratulations, it's a match!");
      $("h3").text("Matches: " + matches);
      $("." + class1).fadeOut();
      cardId = [];
      classes = [];
      $(".inner").css("pointer-events", "all");
    }, 400);
    //
  } else {
    //
    if (classes.length == 2) {
      setTimeout(function () {
        $(".innerImg").animate({ width: "0", opacity: "0" });
        cardId = [];
        classes = [];
        $(".inner").css("pointer-events", "all");
      }, 400);
    } else {
      setTimeout(function () {
        $(".inner").css("pointer-events", "all");
      }, 400);
    }
    //
  }
}