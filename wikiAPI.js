(function () {
    //create XMLHttpObject
    var req, timeStamp;/*
    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
        console.log("HttpRequest object is created");
    } else if (window.ActiveXObject) {
        req = new ActiveXObject(Microsoft.XMLHTTP);
    }*/
    var $search = $("#searchBtn");
    var $luckyTerm = $("#searchLucky");
    var $targetMsg = $("#searchText");
    var $output = $("#searchContainer");
    $search.on("click", searchAction);
    $targetMsg.on("focus", changeStyle);
    /*move to the left top corner*/
    function changeStyle() {
        $("#mainContainer").addClass("contentsDisplay");
        $(".wikiLogo").addClass("smallSizeLogo");
    }
    /*enter key has the same purpose with search*/
    $targetMsg.on("keypress", function (event) {
        if (event.keyCode == 13)
            $search.click();
    });
    /*Getting the wiki media url, getting the data and display*/
    function searchAction() {
        var URL = ""; var searchString = ""; $output.text("");
        URL = "https://en.wikipedia.org/w/api.php?"; timeStamp = "";
        searchString = $targetMsg.val();
        URL = URL + '&action=opensearch&search=' + searchString + '&format=json' + "&callback=?";
        timeStamp = ((/\?/).test(URL) ? "&" : "?") + (new Date()).getTime();
        URL += timeStamp;
        var jqXHR = $.ajax({
            type: "GET",
            url: URL,/*headers: {   'Client-ID': 'axjhfp777tflhy0yjb5sftsil' },*/
            dataType: "json",
            success: function (data, status, jqXHR) {
                console.log("success!!!");
            }
        })
        .done(function (data) {

            for (var i = 1; i < 10; i++) {
                var title = data[1][i];
                var dfn = data[2][i];
                var link = data[3][i];
                var content = "<h4>" + title + "</h4><div>" + dfn + "</div><myLink>" + link + "</myLink>";
                if (title == undefined || title == "") {
                    title = searchString; dfn = searchString + " not available in wikipedia";
                    link = "try it in www.google.com";
                }
                $output.append(content);
            }


        })
        .fail(function (error, status, jqXHR) {
            console.log("Error: " + error + " Status: " + status + " jqXHR: " + jqXHR);

        })
        .always(function () {
            console.log("success!!!");
        });
        jqXHR.always(function () {
            console.log(URL);
        });
    }

}());