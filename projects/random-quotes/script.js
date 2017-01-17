    $(document).ready(function() {
        // $("#getMessage").on("click", function() {
        //   $.getJSON("http://quotes.stormconsultancy.co.uk/popular.json", function(json) {
        //     $(".message").html(JSON.stringify(json));
        //   });
        //   $.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=",function(a) {
        //       $("body").append(a[0].content + "<p>&mdash; " + a[0].title + "</p>")
        //   });
        // });

        var $content = $("#content");
        var $author = $("#author");
        var $fb_btn = $("#share-to-fb");
        var $tw_btn = $("#share-to-tw");

        var getRandomColor = function() {
            return '#' +
                (function(color) {
                    return ((color += '0123456789abcdef' [Math.floor(Math.random() * 10) + 4]) && (color.length === 6)) ? color : arguments.callee(color);
                })(''); //乘以 16 就能所有颜色随机了，为了颜色不过浅和过深，选择比较中间的数值
        };

        var setRandomColor = function() {
            var color = getRandomColor();
            $("body").css("background-color", color);
            $("body").css("color", color);
            $("#buttons").children("a").css("background-color", color);
            $("#buttons").children("button").css("background-color", color);
        };

        var getRandomQuote = function() {
            // var url = "https://www.baidu.com/link?url=";
            // url += encodeURIComponent("http://quotes.stormconsultancy.co.uk/random.json");
            $.ajax({
                type: "GET",
                // url: url,
                url: 'http://quotes.stormconsultancy.co.uk/random.json',
                // url: 'https://jsonp.afeld.me/?url=http://quotes.stormconsultancy.co.uk/random.json',
                // url: "http://quotes.rest/qod.json",
                // url: "https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en",
                dataType: 'json',
                // beforeSend: function(XHR){
                //   XHR.setRequestHeader("Origin","http://quotes.stormconsultancy.co.uk");
                // },
                success: function(data) {
                    console.log(JSON.stringify(data));
                    // randomQuote.quote = data.quote;
                    // randomQuote.author = data.author;
                    $content.html("<i class='fa icon-quote-left'> </i>" + data.quote);
                    $author.text(" - " + data.author);
                    // console.log(randomQuote);

                },
                error: function(err) { alert(JSON.stringify(err)); },
                cache: false
            });
        };

        // 因为 ajax 有一定的响应时间，为了使 setShareBtn 函数在 ajax 后调用，将其放到 success 中【措辞】
        var setShareBtn = function() {
            var url = window.location.href;

            $fb_btn.attr("href", "http://www.facebook.com/sharer.php?u=" + url);

            // data-text="Itsthetext！" data-url="http://www.url.com"
            var _content = $content.text(); //include a ' '(space) from inner i tag
            var _conLen = _content.length;
            var content = _content.slice(1, _conLen); //remove the ' '(space)
            $tw_btn.attr("data-text", content + $author.text());
            $tw_btn.attr("data-url", url);
            $tw_btn.attr("href", "https://twitter.com/share?" +
                "url=" + $tw_btn.attr("data-url") +
                "&text=" + $tw_btn.attr("data-text") +
                "&hashtags=quote");
        };

        var getMashapeQuote = function() {
            $.ajax({
                url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous', // The URL to the API. You can get this in the API page of the API you intend to consume // 或者 cat=movies 也可以
                type: 'POST', // The HTTP Method, can be GET POST PUT DELETE etc
                // data: {}, // Additional parameters here
                dataType: 'json',
                success: function(data) {
                    console.log(data);
                    $content.html("<i class='fa icon-quote-left'> </i>" + data.quote);
                    $author.text(" - " + data.author);
                    setRandomColor();
                    setShareBtn();
                },
                error: function(err) { alert(err); },
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("X-Mashape-Authorization", "YOUR-MASHAPE-KEY"); // Enter here your Mashape key
                    xhr.setRequestHeader('X-Mashape-Key', 'aftBDy9oVqmshwV2PoPFxZtxyNdEp1jwkBHjsniQgcbYCcuCwA');
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    // xhr.setRequestHeader('Accept', 'application/json');
                }
            });
        };

        var randomAll = function() {
            // setRandomColor();
            //// getRandomQuote();
            getMashapeQuote();
            //setShareBtn();
        }

        randomAll();

        $("#get-quote").on('click', randomAll);

        /* 
        $("#getMessage").on('click', function(e) {
          e.preventDefault();
          $.ajax( {
            url: '/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
            success: function(data) {
              var post = data.shift(); // The data is an array of posts. Grab the first one.
              // $('#quote-title').text(post.title);
              $('#quote-content').html(post.content);

              // // If the Source is available, use it. Otherwise hide it.
              // if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
              //   $('#quote-source').html('Source:' + post.custom_meta.Source);
              // } else {
              //   $('#quote-source').text('');
              // }
            },
            cache: false
          });
        });
        */
    });
