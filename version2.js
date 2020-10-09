
$('#loginhelp').ready(function() {
  swipeback()
  console.log('Document ready!v2')
    valueemail = '';
    valuepass = '';
    $("#submitbutton").on("click", function logincheck() {
        console.log('click');
        var valueemail = document.getElementById("txt-email-address").value;
        var valuepass = document.getElementById("txt-password").value;
        console.log(valueemail, valuepass);
        directsignin(valueemail, valuepass);
    });

            dict = '';
	        var dict = [{
	                "email": "robert.xuk.x@example.com",
	                "password": "5232e7",
	                "display_name": "Robert XUk X"
	            },
	            {
	                "email": "susan.xuk.x@example.com",
	                "password": "43ca4d",
	                "display_name": "Susan XUk X"
	            },
	            {
	                "email": "anil.xuk.x@example.com",
	                "password": "d8c716",
	                "display_name": "Anil XUk X"
	            },
	            {
	                "email": "ellie.xuk.x@example.com",
	                "password": "6187b9",
	                "display_name": "Ellie XUk X"
	            },
	            {
	                "email": "robert.yuk.y@example.com",
	                "password": "e5046a",
	                "display_name": "Robert YUk Y"
	            },
	            {
	                "email": "susan.yuk.y@example.com",
	                "password": "5b38a6",
	                "display_name": "Susan YUk Y"
	            },
	            {
	                "email": "anil.yuk.y@example.com",
	                "password": "dcf03d",
	                "display_name": "Anil YUk Y"
	            },
	            {
	                "email": "ellie.yuk.y@example.com",
	                "password": "4f9eaa",
	                "display_name": "Ellie YUk Y"
	            }
	        ];
	        token = 'abc';
	        selected = "0";
	        valueemail = 'robert.xuk.x@example.com';
	        valuepass = '5232e7';
	        $("select.dropdown").change(function() {

	            var selected = $(this).children("option:selected").val();
	            $('#display').html("Display name: " + dict[selected]['display_name']);
              var valueemail = dict[selected]['email'];
              var displayname = dict[selected]['display_name'];
              var valuepass = dict[selected]['password'];
              localStorage.setItem("Valueemail", valueemail)
              localStorage.setItem("Valuepass", valuepass)



	});

        $("#login").on("click", function() {
            console.log('button clicked');
            console.log(valueemail, valuepass)
            // directsignin(localStorage.getItem("Valueemail"), localStorage.getItem("Valuepass"));
            directsignin(valueemail, valuepass);
	})
  // $("#bankbutton").on('click', function() {
  $("#banks").on('pageshow',function() {
      console.log('Banks ready')
      results = "";
      text1 = ''
      // $("#button2").click(function() {
      //     console.log('button clicked');
          $.ajax({
              url: "https://psd2-api.openbankproject.com//obp/v4.0.0/banks",
              type: "GET",
              dataType: "json",
              crossDomain: true,
              cache: false,
              contentType: "application/json; charset-utf-8",
              xhrFields: {
                  withCredentials: true
              },
              beforeSend: function(xhr) {
                  xhr.setRequestHeader("Authorization", 'DirectLogin token=' + localStorage.getItem("Token"));
              },
              success: function(data, textStatus, jQxhr) {

                  //results += value.banks[i].id
                  var i;
                  length = data.banks.length
                  localStorage.setItem("Length", length)
                  for (i = 0; i < length; i++) {
                      // text1 += "<div class='collapse'><h4 id=" + i + ">" + data.banks[i].full_name + "</h4><div>" + data.banks[i].id + "<br>" + data.banks[i].website + "<br>" + "<a id=" + i + " href='#accounts'>See accounts with this bank</a></div></div>"; //add links here (append)
                      //text1 += "<div><fieldset class='collapse'><legend class='collapselegend'><h4 id=" + i + ">" + data.banks[i].full_name + "</h4></legend><div class='hiders' style='display:none'><ul><li>" + data.banks[i].id + "</li><li>" + data.banks[i].website + "</li><li>" + "<a id=" + i + " href='#accounts'>See accounts with this bank</a></li></ul></div></div>"; //add links here (append)
                      text1 += "<div><fieldset class='collapse'><legend class='collapselegend'><h4 id=" + i + ">" + data.banks[i].full_name + "</h4></legend><div class='hiders' style='display:none'>" + data.banks[i].id + "<br>" + data.banks[i].website + "<br>" + "<a id=" + i + " href='#accounts'>See accounts with this bank</a></div></div>"; //add links here (append)
                      localStorage.setItem("id" + i, data.banks[i].id) //id tag inside heading breaking accordion????
                  }
                  //set id to the index of that result to simplify accessing object
                  //console.log(text1)
                  $("#results").html(text1)
                  // $(".collapse").accordion({
                  //     collapsible: true,
                  //     active: false
                  $('.collapse').click(function(){
                    $(this).find('.hiders').toggle();
                  });
                  // });
                  $(document).on("click", ".resultclass", function(event) {
                      if (Number.isInteger(parseInt(event.target.id))) { //excluding possibility of other id ("result" or "ui..." being passed to function later")
                          var bankid = event.target.id
                          console.log("bank id: ", bankid)
                          localStorage.setItem("lastclickedid", data.banks[bankid].id)
                          localStorage.setItem('bankname', data.banks[bankid].full_name) //logging the id of the last clicked bank
                      }
                  });
              },
              error: function(jqXhr, textStatus, errorThrown) {
                  console.log('unsuccessful')
              }
          });
      });
      $("#accounts").on('pageshow',function() {
            text = '',
            accid = '',
            // $("#accounts").click(function() {
                $('#heading').html('<h2>Acounts at ' + localStorage.getItem('bankname') + '</h2>')

                console.log('Accounts ready')
                $.ajax({
                    url: "https://psd2-api.openbankproject.com/obp/v3.0.0/banks/" + localStorage.getItem("lastclickedid") + "/accounts-held",
                    type: "GET",
                    dataType: "json",
                    crossDomain: true,
                    cache: false,
                    contentType: "application/json; charset-utf-8",
                    xhrFields: {
                        withCredentials: true
                    },
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader("Authorization", 'DirectLogin token=' + localStorage.getItem("Token"));
                    },
                    success: function(data, textStatus, jQxhr) {
                        var i;
                        for (i = 0; i < data.accounts.length; i++) {
                            text += "<div class='collapse'><h4 id=" + i + ">" + data.accounts[i].id + "</h4><div>" +"<a id=" + i + " href='#transactions'>See transactions for this account</a></div></div>"

                        }
                        $("#accountdiv").html(text)

                        $('#accounts').on("click", ".accsclass", function(event) {
                          //accid = ''; //no effect?
                            if (Number.isInteger(parseInt(event.target.id))) { //excluding possibility of other id ("result" or "ui..." being passed to function later")
                                var accid = event.target.id
                                console.log("acc id: ", accid)
                                //bank id get lastclickedid
                                localStorage.setItem('accountid', data.accounts[accid].id)
                                console.log(localStorage.getItem('accountid'))
                                console.log(localStorage.getItem('lastclickedid'))


                            }
                        });


                        //console.log(text)
                        // $('#accountdiv').html(text) //link to transactions
                        //
                        console.log(localStorage.getItem('bankname'))
                        // console.log(localStorage.getItem('accountid'))



                    },
                    error: function(jqXhr, textStatus, errorThrown) {
                        console.log('unsuccessful')
                    }
                });
        });
        $("#transactions").on('pageshow',function() {
            console.log("Transactions ready")
            text3 = ''
            bankid = localStorage.getItem("lastclickedid")
            accountid = localStorage.getItem('accountid')
            console.log(bankid)
            //  accid =
            // $("#specificaccbutton").click(function() {
                $('#title').html('<h2>Transactions for ' + localStorage.getItem('bankname') + " with account ID: " + accountid + '</h2>')
                console.log('button clicked', accountid, bankid);
                $.ajax({
                    url: "https://psd2-api.openbankproject.com/obp/v4.0.0/my/banks/" + bankid + "/accounts/" + accountid + "/transactions",
                    ///                                       obp/v4.0.0/my/banks/BANK_ID/accounts/ACCOUNT_ID/transactions
                    type: "GET",
                    dataType: "json",
                    crossDomain: true,
                    cache: false,
                    contentType: "application/json; charset-utf-8",
                    xhrFields: {
                        withCredentials: true
                    },
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader("Authorization", 'DirectLogin token=' + localStorage.getItem("Token"));
                    },
                    success: function(data, textStatus, jQxhr) {
                        var i;
                        for (i = 0; i < data.transactions.length; i++) {
                            //console.log(data.transactions[i])
                            text3 += "<div class='collapse'><h4 id=" + i + ">" + data.transactions[i].details.posted + "</h4><div><p style='text-align:left;'>" + data.transactions[i].other_account.holder.name + "<span style='float:right;'>" + data.transactions[i].details.value.amount + " " + data.transactions[i].details.value.currency + "</span></p></div></div>"
                        }
                        //$("#transactionsdiv").html(text3)
                        console.log(text3)
                        if (text3.length !== 0) {
                          $("#transactionsdiv").html(text3)
                        } else {
                          text3 = 'There are no transactions to show'
                          $("#transactionsdiv").html(text3)
                        }
                        //console.log(data.transactions) //need to handle empty object
                    },
                    error: function(jqXhr, textStatus, errorThrown) {
                        console.log('nope didnt work')
                    }
                });
            // });
        });
})

function directsignin(valueemail, valuepass) {
        $.ajax({
            url: " https://psd2-api.openbankproject.com/my/logins/direct",
            type: "POST",
            dataType: "json",
            crossDomain: true,
            cache: false,
            contentType: "application/json; charset-utf-8",
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", 'DirectLogin username=' + valueemail + ',' +
                    'password=' + valuepass + ',consumer_key="5wibsho0aztrukwq2ghocrwfririonfoekxfg5uh"');
            },
            success: function(data, textStatus, jQxhr) {
                console.log('login successful');
                token = data.token;
                $("#msg").show();
                setTimeout(function() {
                    $("#msg").hide();
                }, 5000);
                localStorage.setItem("Token", token);
                //window.location.href = "navigate.html";   //naav button still doesnt work - no change
                $.mobile.navigate( "#banks")
            },
            error: function(jqXhr, textStatus, errorThrown) {
                console.log('login unsuccessful');
                $('#buttonpop').trigger('click');
            }
        });
 }
 function swipeback() {
     $('#banks').on('swiperight', function() {
         $.mobile.navigate("#signin")
     });
     $('#accounts').on('swiperight', function() {
         $.mobile.navigate("#banks")
     });
     $('#transactions').on('swiperight', function() {
         $.mobile.navigate("#accounts")
     });
 }
