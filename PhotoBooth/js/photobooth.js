// document.getElementById('test').addEventListener("click", function(){
//   alert("Hello");
// });
var cardSelected = "card1"
var imageIndex = 0
var imageSave
var toggled = false;

const strip1 = new Strip(1)
const strip2 = new Strip(2)

$('h4').click(function(){
  var $this = $(this);
  var $input = $('<input>', {
      value: $this.text(),
      type: 'text',
      class: 'test',
      blur: function() {
        if (this.value == "") {
          $this.text("Animal")
        } else {
        $this.text(this.value);
      }

      },
      keyup: function(e) {
         if (e.which === 13) $input.blur();
      }
  }).appendTo( $this.empty() ).focus();
})


//
// $('.list-group a').magnificPopup({
//    type:'inline',
//    fixedContentPos: false,
//    removalDelay: 200,
//    showCloseBtn: false,
//    mainClass: 'mfp-fade'
//
// });




$('#form').on('change', function (e) {
    var optionSelected = $("option:selected", this);
    var valueSelected = this.value;
    $('#' + cardSelected + ' h4').css('font-family', valueSelected);
});

$('#form1').on('change', function (e) {
    var optionSelected = $("option:selected", this);
    var valueSelected = this.value;
    $('#' + cardSelected + ' h4').css('color', valueSelected);
});

$('#form2').on('change', function (e) {
    var optionSelected = $("option:selected", this);
    var valueSelected = this.value + "rem";
    //cardSelected = 1
    $('#' + cardSelected + ' h4').css('font-size', valueSelected);
});

$('#form3').on('change', function (e) {
    var optionSelected = $("option:selected", this);
    var image = this.value
    console.log(cardSelected)
    if (image == "clear"){
      $("#" + cardSelected).css('background-image', 'none');
    } else {
      var imageURL = "../PhotoBooth/assets/imgs/" + image + ".jpg"
      $("#" + cardSelected).css('background-image', 'url(' + imageURL + ')');
    }

});
//
// $('#form4').on('change', function (e) {
//     var optionSelected = $("option:selected", this);
//     var valueSelected = this.value + "rem";
//     $('#title').css('font-size', valueSelected);
// });

$('#form5').on('change', function (e) {
    var optionSelected = $("option:selected", this);
    cardSelected = "card" + this.value
});

function green() {
  $('.sidebar').css('background', '#74cfae');
  $('#mainPane').css('background', 'rgba(0, 0, 0, 0.83)');
  $('.nav-group-title').css('color', 'black');
  $('.nav-group-item').css('color', 'black');
  $('.card').css('border', '2px solid black');
  $('div.modal-content').css('background', '#74cfae');
}

function red() {
  $('.sidebar').css('background', '#ff4343');
  $('#mainPane').css('background', '#dddddd');
  $('.nav-group-title').css('color', 'white');
  $('.nav-group-item').css('color', 'white');
  $('.card').css('border', '2px solid #ff4343');
  $('div.modal-content').css('background', '#ff4343');
}

function blue() {
  $('.sidebar').css('background', 'rgba(97, 134, 254, 0.97)');
  $('#mainPane').css('background', 'rgba(100, 94, 255, 0.19)');
  $('.nav-group-item').css('color', 'white');
  $('.nav-group-title').css('color', 'white');
  $('.card').css('border', '2px solid rgba(97, 134, 254, 0.97)');
  $('div.modal-content').css('background', 'rgba(97, 134, 254, 0.97)');
}

// This is the better way to do it
// function changeBackground(val) {
//
// }
//




$(document).on('click', '.popup-modal-dismiss', function (e) {
    e.preventDefault();
    $.magnificPopup.close();
});


// Need to create safe m
//This modifies the number of strips
function modify_qty(val) {
    var qty = document.getElementById('qty').textContent;
    var new_qty = parseInt(qty,10) + val;

    if (new_qty < 1 || new_qty > 4) {
      // console.log(new_qty);
      return new_qty
    }

    //This code should only run if the top is not true
    const defMarg = 30;
    console.log(new_qty);

    document.getElementById('qty').textContent = new_qty;
    if (new_qty==1){
      $('#card1').css('margin-left',"35%")
    } else {
      $('.card').css('margin-left',"10%")
    }

    //Gotta hide or not hide stuff
    if (new_qty > qty){ //User added
      $('#card'+ String(new_qty)).toggleClass("hide");
    } else { //User Removed
      $('#card'+ String(qty)).toggleClass("hide");
    }


    return new_qty;
}

// Need to create safe m
// This modifies the number of pictures
// This will not work well when switching between options
function modify_qty2(val) {



    var qty2 = document.getElementById('qty2').textContent;
    var new_qty2 = parseInt(qty2,10) + val;

    if (new_qty2 < 3 || new_qty2 > 5) {
      // console.log(new_qty2);
      return new_qty2
    }
    document.getElementById('qty2').textContent = new_qty2;

    // Must modify the picture height
    height = 1040/new_qty2
    $('#' + cardSelected + ' li').css('height', height + 'px')


    //End


    // $('#card1 li#spot1')
    //Gotta hide or not hide stuff
    if (new_qty2 > qty2){ //User added
      $('#'+ cardSelected + ' li#spot'+ String(new_qty2)).toggleClass("hide");
    } else { //User Removed
      $('#'+ cardSelected + ' li#spot'+ String(qty2)).toggleClass("hide");
    }





    return new_qty2;
}

function changeImage() {
  var file = document.getElementById('file').files[0];
      var reader = new FileReader();
      // it's onload event and you forgot (parameters)
      reader.onload = function(e)  {
          var image = document.createElement("img");
          // the result image data
          image.src = e.target.result;
          imageSave = image.src
          $('#modalImage').attr("src",image.src)

       }

       // you have to declare the file loading
       reader.readAsDataURL(file);
}




function updateImage(){
  var $image = $('#modalImage');



  if (toggled == true) {
    var dataURL = $image.cropper('getCroppedCanvas').toDataURL();
    $('#' + cardSelected + ' #spot' + imageIndex+ ' img').attr("src", dataURL)
  } else {
    $('#' + cardSelected + ' #spot' + imageIndex+ ' img').attr("src", imageSave)
  }


  $('#' + cardSelected + ' #spot' + imageIndex+ ' img').attr("width","100%")
  $('#' + cardSelected + ' #spot' + imageIndex+ ' img').attr("height","100%")
  toggled = false
}


/////////////////////////////
// $(function () {
//   var $image = $('#modalImage');
//   var cropBoxData;
//   var canvasData;
//
//   $('#modal').on('shown.bs.modal', function () {
//     $image.cropper({
//       autoCropArea: 0.5,
//       ready: function () {
//         $image.cropper('setCanvasData', canvasData);
//         $image.cropper('setCropBoxData', cropBoxData);
//       }
//     });
//   }).on('hidden.bs.modal', function () {
//     cropBoxData = $image.cropper('getCropBoxData');
//     canvasData = $image.cropper('getCanvasData');
//     $image.cropper('destroy');
//   });
// });

function crop() {
    toggled = true
    var $image = $('#modalImage');
    var cropBoxData;
    var canvasData;

    $image.cropper({
      autoCropArea: 0.5,
      ready: function () {
        $image.cropper('setCanvasData', canvasData);
        $image.cropper('setCropBoxData', cropBoxData);
      }
    });

    $('#modal').on('hidden.bs.modal', function () {
      cropBoxData = $image.cropper('getCropBoxData');
      canvasData = $image.cropper('getCanvasData');
      $image.cropper('destroy');
    });

 }
