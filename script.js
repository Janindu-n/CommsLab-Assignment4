window.onload = function() {
    var videosContainer = document.getElementsByClassName("videos")[0];
    var menu = document.getElementsByClassName("menu")[0];
    var menuOptions = menu.getElementsByClassName("options")[0];
    var button = document.getElementById("btn");

    // Hide the button initially
    button.style.display = "none";

    // Wait 5 seconds, then show the button
    setTimeout(function() {
        button.style.display = "block";
    }, 35000);

    var playButton = document.getElementsByClassName("play")[0];
    playButton.onclick = function() {
        playButton.style.display = "none";
        playInitialMenu();
    };

    var startButton = document.getElementsByClassName("start")[0];
    startButton.onclick = function() {
        showVideos(0, videosContainer.getElementsByClassName("cat"));
    };

    var catPersonLink = document.getElementById("right-thing");
    catPersonLink.onclick = function() {
        showVideos(0, videosContainer.getElementsByClassName("cat"));
    };

    var dogPersonLink = document.getElementById("wrong-thing");
    dogPersonLink.onclick = function() {
        showVideos(0, videosContainer.getElementsByClassName("dog"));
    };

    function playInitialMenu() {
        playVideo(videosContainer.getElementsByClassName("initial")[0], loop = true);

        setTimeout(function() {
            menu.style.display = "block";
            menu.getElementsByClassName("initial")[0].style.display = "block";
            menuOptions.style.display = "block";
        }, 1000);
    };

    function playInitialMenu() {
        playVideo(videosContainer.getElementsByClassName("initial")[0], loop = true);

        setTimeout(function() {
            menu.style.display = "block";
            menu.getElementsByClassName("initial")[0].style.display = "block";
            menuOptions.style.display = "block";
        }, 1000);
    };

    function playClosingMenu() {
        playVideo(videosContainer.getElementsByClassName("closing")[0], loop = true);

        menu.getElementsByClassName("initial")[0].style.display = "none";
        menuOptions.style.display = "none";

        setTimeout(function() {
            menu.style.display = "block";
            menu.getElementsByClassName("closing")[0].style.display = "block";
            menuOptions.style.display = "block";
        }, 1000);
    };

    function playVideo(videoContainer, loop = false) {
        var lastVideoContainer = videosContainer.getElementsByClassName("active")[0];
        lastVideoContainer.classList.remove("active");
        lastVideoContainer.style.display = "none";

        videoContainer.style.display = "block";
        videoContainer.classList.add("active");

        var video = videoContainer.getElementsByTagName("video")[0];
        video.preload = "auto";
        video.load();
        video.play();
        video.loop = loop;

        return video;
    }

    function showVideos(index, videos) {
        if (index < videos.length) {
            menu.style.display = "none";

            var video = playVideo(videos[index]);

            video.addEventListener("ended", function() {
                var options = videoContainer.getElementsByClassName("options")[0];

                if (options) {
                    var optionButtons = options.getElementsByTagName("button");

                    // Hide all options initially
                    options.style.display = "none";
                    for (var i = 0; i < optionButtons.length; i++) {
                        optionButtons[i].style.display = "none";
                    }

                    // Show options for the current video and attach click event handlers
                    options.style.display = "block";
                    for (var i = 0; i < optionButtons.length; i++) {
                        var nextIndex = parseInt(optionButtons[i].getAttribute("data-next-index"));
                        if (nextIndex === index + 1) {
                            optionButtons[i].style.display = "block";
                            optionButtons[i].onclick = function() {
                                options.style.display = "none";
                                showVideos(nextIndex, videos);
                            };
                        }
                    }

                } else {
                    showVideos(index + 1, videos);
                }
            });
        } else {
            playClosingMenu();
        }
    }

};