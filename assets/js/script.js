var linksArr = [];
var str = document.createElement('ul');

var linkVal;
var formValid = true;
var $inputLink = $('#myInput');


$(document).ready(function () {
    // Get value on button click and show alert

    var m =0;

    $("#myBtn").click(function (e) {
          
        var inputValue = $("#myInput").val().toString();
        // alert(str);
        formValid = true;
        $("#alert").hide();
        var url = inputValue;
        var arr = new URL(url).protocol;
        var result = arr + "//rel.ink";
        var text = "";
    
        if ($inputLink.val() == '') {
            formValid = false;
            $inputLink.attr('style', 'border: 2px solid red');
        }

        if (!formValid) {
            $("#alert").show();
        }

        if (formValid == true) {
            m++;

            linksArr = [];
            linksArr.push(inputValue);
            console.log(linksArr);

            function GenUniqueLink(length) {

                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                for (var i = 0; i < length; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }

                var inputLink = document.createElement("a");
                console.log(m);
                inputLink.setAttribute('id', `anchor${m}`);
                inputLink.innerHTML = result + "/" + text;
                inputLink.setAttribute('href', url);
                inputLink.style.color = '#2FCED1';
                inputLink.style.fontWeight = '500';
                inputLink.style.textDecoration = 'none';
                inputLink.style.margin = 'auto 30px auto 30px';

                return inputLink;

            }
            

            linksArr.forEach(function (link, i) {
                var strItem = document.createElement('li');
                strItem.setAttribute('id', 'strItem');
                strItem.append(inputValue);

                var button = document.createElement("button");
                button.innerHTML = "Copy";
                console.log(m);
                button.setAttribute('data-clipboard-target', `#anchor${m}`);
                button.setAttribute('id', 'copy');

                var body = document.getElementsByTagName("body")[0];
                body.appendChild(button);

                button.addEventListener("click", function (e) {
                    e.preventDefault();
                    console.log(m);
                    var copyText = $(`#anchor${m}`).attr('href');
            
                    document.addEventListener('copy', function (e) {
                        e.clipboardData.setData('text/plain', copyText);
                        e.preventDefault();
                    }, true);

                    document.execCommand('copy');
                    console.log('copied text : ', copyText);

                    this.style.background = "#3A3053";
                    this.innerText = "Copied!";
                    console.log(link);
                    var $txt = $('<textarea />');

                    $txt.val(link)
                        .css({
                            width: "1px",
                            height: "1px"
                        })
                        .appendTo('body');

                    $txt.select();

                    if (document.execCommand('copy')) {
                        $txt.remove();
                    }
                });

                console.log(i);
                strItem.append(GenUniqueLink(6));
                str.appendChild(strItem).appendChild(button);
                linkVal = link;
                console.log(linkVal);
            });
        }
        var app = document.querySelector('#linkContainer');
        app.appendChild(str);
    });

});