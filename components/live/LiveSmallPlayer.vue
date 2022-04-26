<template>
  <div class="player">
    {{ url }}
    <!-- <img src="~/assets/images/playing-now.png" alt="playing-now" /> -->

    <!-- OLD Player -->
    <object
      id="av-player"
      width="100%"
      height="100%"
      type="application/avplayer"
    ></object>
    <!-- <button class="subtitle-audio-button btn bg-dark d-none" data-toggle="modal" data-target="#subtitleAudioModal"
    id="">Press 0 For Subtitle/Audio</button>


  
  <!-- <div class="custom-controls-container" id="control-bar">
    <div class="progress-bar">
      <div id="playerPlayed" class="played"></div>
      <span id="playerPoint" class="point"></span>
    </div>

    <div class="controls-bar">
      <span class="currentTime">00:00</span>
      <div class="buttons">
        <div class="action-button previous"><i class="fas fa-backward"></i></div>
        <div class="action-button playOrPause"><i class="fas fa-pause"></i></div>
        <div class="action-button next"><i class="fas fa-forward"></i></div>
      </div>
      <span class="latTime">50:00</span>
    </div>
  </div> -->
    <div
      class="modal fade"
      id="subtitleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="subtitleModal"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-centered"
        style="margin-top: -80px"
        role="document"
      >
        <div class="modal-content text-light subtitle-audio-modal">
          <div class="modal-header">
            <h5 class="modal-title" id="subtitleModal">
              Change Subtitle Language
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span class="text-light" aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="h4 mb-3">Subtitle</div>
            <div class="languages-container" id="subtitle-track">
              <!-- <button onclick="subtitleButtonClicked('fr')" class="language">fr</button> -->
              <!-- <button onclick="" class="language active">en</button>
                        <button onclick="" class="language ">ar</button>
                        <button onclick="" class="language ">fr</button>
                        <button onclick="" class="language ">sp</button>
                        <button onclick="" class="language ">it</button> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="audioModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="audioModal"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-centered"
        style="margin-top: -80px"
        role="document"
      >
        <div class="modal-content text-light subtitle-audio-modal">
          <div class="modal-header">
            <h5 class="modal-title" id="audioModal">Change Audio Language</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span class="text-light" aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="h4 mb-3">Audio</div>
            <div class="languages-container" id="audio">
              <!-- <button onclick="audioButtonClicked('fr')" class="language">fr</button> -->
            </div>
          </div>
          <!-- <div class="modal-footer">
                    <button type="button" class="btn btn-light" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-danger">Save</button>
                </div> -->
        </div>
      </div>
    </div>
    <div class="custom-player-header bar-controller d-none">
      <p class="text-center mb-0" id="videoTitle">-----------</p>
    </div>
    <div class="custom-controls-container bar-controller d-none">
      <div class="progress-bar">
        <div id="playerPlayed" style="width: 0%" class="played"></div>
        <span id="playerPoint" class="point"></span>
      </div>
      <div
        class="w-100 d-flex flex-row justify-content-between align-items-center"
      >
        <span class="currentTime">00:00</span>

        <span class="latTime">50:00</span>
      </div>

      <div class="controls-bar w-100">
        <div class="buttons w-100 up-controls">
          <div
            class="action-button previous control-action"
            onclick="seekTo('start')"
          >
            <i class="fas fa-step-backward"></i>
          </div>
          <div
            class="action-button previous control-action forward"
            tabindex="-1"
            onclick="backwardVideo()"
          >
            <i class="fas fa-backward"></i>
          </div>
          <div
            class="action-button playOrPause control-action"
            tabindex="-1"
            onclick="playOrPause()"
          >
            <i class="fas fa-pause"></i>
          </div>
          <div
            class="action-button next control-action forward"
            tabindex="-1"
            onclick="forwardVideo()"
          >
            <i class="fas fa-forward"></i>
          </div>
          <div
            class="action-button previous control-action"
            onclick="seekTo('end')"
          >
            <i class="fas fa-step-forward"></i>
          </div>
        </div>
      </div>
      <div
        class="
          w-100
          d-flex
          flex-row
          justify-content-center
          audio-subtitle-container
          align-items-center
          down-controls
        "
      >
        <div
          data-target="#subtitleModal"
          class="
            action-button
            control-action
            w-25
            subtitleModalToggler
            text-center
          "
          onclick="handleSubtitleFocus()"
          tabindex="-1"
          data-toggle="modal"
        >
          <i class="fas fa-closed-captioning"></i>
        </div>
        <div
          class="
            action-button
            control-action
            w-25
            audioModalToggler
            text-center
          "
          data-toggle="modal"
          data-target="#audioModal"
          onclick="handleAudioFocus()"
          tabindex="-1"
        >
          <i class="fas fa-ad"></i>
        </div>
      </div>
    </div>

    <h1 hidden>Tizen Video App</h1>
    <h2 hidden>
      Video player based on Tizen webapis.avplay (without drm support)
    </h2>
    <div hidden>
      <h2>Available buttons/actions:</h2>
      <div>
        1 - Toggle UHD content playback - use before starting playback and only
        for 4K content<br />
        2 - display track info - while playback active<br />
        3 - display stream properties - while playback active
      </div>

      <div class="video-controls" hidden>
        <div class="play">PLAY</div>
        <div class="stop">STOP</div>
        <div class="pause">PAUSE</div>
        <div class="ff">FF</div>
        <div class="rew">REW</div>
        <div class="fullscreen">TOGGLE FULLSCREEN MODE</div>
      </div>
      <fieldset id="logsFieldset" hidden>
        <legend>Logs</legend>
        <div class="logs" id="logs"></div>
      </fieldset>
    </div>

    <!-- <div id="videoLoading" class="d-none" style="position: absolute;top: this.TIZEN.ZERO%;left:50%; width: 50px; height: 50px; background:url('img/loading.gif');background-position: center;background-size: cover;"></div> -->

    <div id="subtitle"></div>

    <div hidden>
      <h2>Info</h2>

      <p>
        This application demonstrates the use of AVPlay plugin as video player
      </p>

      <p>
        The application downloads video content from
        <code>http://playready.directtaps.net</code> - it will not work if this
        domain is not accessible<br />

        You can change the source for video content by modifying
        <code> url of config variable in main.js file</code>
      </p>

      <h2>Operation</h2>
      <p>
        Use mouse or remote to operate on video player.<br />
        Available keys: PLAY, PAUSE, FF, RW, STOP, ENTER (Toggle Fullscreen
        mode), RETURN
      </p>

      <fieldset hidden>
        <legend>Video info</legend>
        <div class="logs" id="info"></div>
      </fieldset>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    //   cutstom.js
    function updateTime() {
      var hours = new Date().getHours();
      if (hours > 12) {
        hours = hours - 12;
      }

      var mins = new Date().getMinutes();
      // // // console.log(mins);

      $(".header .time-date .time").html(hours + ":" + ("0" + mins).slice(-2));
    }

    setInterval(updateTime, 100);

    // Episodes Slider
    // $(".content .col-md-10").slick({
    //   prevArrow:
    //     '<button type="button" class="slick-prev"><i class="fas fa-angle-left"></i></button>',
    //   nextArrow:
    //     '<button type="button" class="slick-next"><i class="fas fa-angle-right"></i></button>',
    //   slidesToShow: 1,
    //   autoplay: false,
    //   slidesToScroll: 1,
    //   infinite: false,
    // });

    $("#btn-main").on("touchstart click", function () {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this).addClass("reverse-animation");
      } else {
        $(this).removeClass("reverse-animation");
        $(this).addClass("active");
      }

      return false;
    });

    (function () {
      "use strict";
      /**
       * Displays logging information on the screen and in the console.
       * @param {string} msg - Message to log.
       */
      function log(msg) {
        var logsEl = document.getElementById("logs");

        if (msg) {
          // Update logs
          // // console.log("[PlayerAvplay]: " + msg);
          logsEl.innerHTML += msg + "<br />";
        } else {
          // Clear logs
          logsEl.innerHTML = "";
        }

        logsEl.scrollTop = logsEl.scrollHeight;
      }

      //   var player;

      // flag to monitor UHD toggling
      var uhdStatus = false;

      /**
       * Display application version
       */
      function displayVersion() {
        var el = document.createElement("div");
        el.id = "version";
        el.innerHTML = "ver: " + tizen.application.getAppInfo().version;
      }

      /**
       * Enabling uhd manually in order to play uhd streams
       */
      function setUhd() {
        if (!uhdStatus) {
          if (webapis.productinfo.isUdPanelSupported()) {
            log("4k enabled");
            uhdStatus = true;
          } else {
            log(
              "this device does not have a panel capable of displaying 4k content"
            );
          }
        } else {
          log("4k disabled");
          uhdStatus = false;
        }
        player.setUhd(uhdStatus);
      }
      //   alert('dd');
    })();

    function displayVideoFullSize() {
      // alert('first in new subs');

      if (window.tizen === undefined) {
        log("This application needs to be run on Tizen device");
        return;
      }

      function log(msg) {
        var logsEl = document.getElementById("logs");

        if (msg) {
          // Update logs
          // // console.log("[PlayerAvplay]: " + msg);
          logsEl.innerHTML += msg + "<br />";
        } else {
          // Clear logs
          logsEl.innerHTML = "";
        }

        logsEl.scrollTop = logsEl.scrollHeight;
      }
      /**
       * Player configuration object.
       *
       * @property {String}    url                     - content url
       * @property {HTML Element} player           - application/avplayer object
       * @property {HTML Div Element} controls     - player controls
       - place to display stream info
       */
      config = {
        testUrl: this.url,
        url: sessionStorage.src,
        // url: sessionStorage.src,
        player: document.getElementById("av-player"),
        controls: document.querySelector(".video-controls"),
        info: document.getElementById("info"),
        logger: log, //Function used for logging
      };
      // // console.log("player config: ", config);
      var listener = {
        onsubtitlechange: function (
          duration,
          text,
          type,
          attriCount,
          attributes
        ) {
          document.getElementById("subtitle").innerHTML = text;
        },
        onstreamcompleted: function () {
          log("Stream Completed");
          // check if ths is episode playing by set a session to check and remove it
          var EpList = JSON.parse(sessionStorage.episodeList);
          // alert(EpList.indexOf(config.url));
          // alert(config.url);
          this.stop();
          sessionStorage.src = EpList[EpList.indexOf(config.url) + 1];
          location.reload();
          // here to write next episode after typing logic
        }.bind(this),
      };

      //Check the screen width so that the AVPlay can be scaled accordingly
      tizen.systeminfo.getPropertyValue(
        "DISPLAY",
        function (display) {
          log("The display width is " + display.resolutionWidth);
          config.resolutionWidth = display.resolutionWidth;

          // webapis.avplay.close();
          try {
            var player = VideoPlayer(config);
            // player.close();
            $("#av-player").focus();
            player.open(config.url);
            // webapis.avplay.setStreamingProperty('PREBUFFER_MODE', '1');
            // webapis.avplay.setBufferingParam("PLAYER_BUFFER_FOR_PLAY","PLAYER_BUFFER_SIZE_IN_SECOND", 5); // 5 is in seconds
            // webapis.avplay.setBufferingParam("PLAYER_BUFFER_FOR_RESUME","PLAYER_BUFFER_SIZE_IN_SECOND", 5); // 5 is in seconds

            webapis.avplay.setListener(listener);

            webapis.avplay.prepare();
            // setTimeout(()=>{

            // },10000 )
            webapis.avplay.play();

            setTimeout(() => {
              var TrackInfo = webapis.avplay.getTotalTrackInfo();
              // var TrackInfo = webapis.avplay.getCurrentStreamInfo();

              var counterAudio = 0;
              var counterText = 0;
              // alert(JSON.stringify(TrackInfo[I]));
              for (var I = 0; I < TrackInfo.length; I++) {
                // alert(JSON.stringify(TrackInfo[I].extra_info))
                if (TrackInfo[I].type == "AUDIO") {
                  $("#audio").append(
                    `
                <button onclick="changeAudio(this,${
                  TrackInfo[I].index
                })" class="language ${counterAudio == 0 ? "active" : ""}">${
                      JSON.parse(TrackInfo[I].extra_info).language
                    }</button>`
                  );
                  counterAudio++;
                }
                if (TrackInfo[I].type == "TEXT") {
                  // alert(JSON.stringify(TrackInfo[I]));

                  // changeSubtitleStart(TrackInfo[I].index)
                  $("#subtitle-track").append(
                    `
                <button onclick="changeSubtitle(this,${
                  TrackInfo[I].index
                })" class="language ${counterText == 0 ? "active" : ""} ">${
                      JSON.parse(TrackInfo[I].extra_info).track_lang != ""
                        ? JSON.parse(TrackInfo[I].extra_info).track_lang
                        : TrackInfo[I].index
                    }</button>`
                  );
                  counterText++;
                }
              }
            }, 5000);
          } catch (err) {
            // alert(err);
          }
        },
        function (error) {
          // alert(error);
          // alert("An error occurred " + error.message);
        }
      );

      // end of switch
    }

    function changeAudio(element, index) {
      $("#audio").find(".active:first").removeClass("active");

      webapis.avplay.setSelectTrack("AUDIO", index);
      $(element).addClass("active");
      $(document.activeElement).parent().parent().prev().find(".close").click();
      $(".audioModalToggler:first").focus();

      // $('#subtitleAudioModal').click();
    }

    function changeSubtitle(element, index) {
      $("#subtitle-track").find(".active:first").removeClass("active");
      webapis.avplay.setSelectTrack("TEXT", index);
      $(element).addClass("active");
      $(document.activeElement).parent().parent().prev().find(".close").click();
      $(".subtitleModalToggler:first").focus();
      // $('#subtitleAudioModal').click();
    }
    // var subtitles = [];
    // function changeSubtitleStart(index) {

    //   // $('#subtitle-track').find('.active:first').removeClass('active')
    //   webapis.avplay.setSelectTrack('TEXT', index);
    //   var counter = 500;
    //   var value = document.getElementById('subtitle').innerHTML;
    //   while(value.length < 20)
    //   {
    //     counter += 500
    //     webapis.avplay.setSubtitlePosition(counter);
    //     value = document.getElementById('subtitle');
    //   }
    //   subtitles.push({'index':index,'value':value})
    //   // $(element).addClass('active');
    //   // $(document.activeElement).parent().parent().prev().find('.close').click();
    //   // $('.subtitleModalToggler:first').focus();
    //   // $('#subtitleAudioModal').click();

    // }

    $(window).ready(() => {
      $("#videoTitle").html(sessionStorage.title);
      setTimeout(() => {
        var videoDuration = webapis.avplay.getDuration();
        var currentTimeVideo = webapis.avplay.getCurrentTime();
        // alert(msToTime(videoDuration));
        $(".latTime:first").html(msToTime(videoDuration));
        setInterval(() => {
          var currentTimeVideo = webapis.avplay.getCurrentTime();

          updatePlayerPosition(currentTimeVideo, videoDuration);
        }, 1000);
        showControlBar();
      }, 5000);
    });
    $(window).ready(() => {
      tizen.tvinputdevice.registerKey("MediaFastForward");
      var canSwitchChannels = false;
      // duration before enable switching
      const WAIT_BEFORE_SWITCHING = 1000;
      // sessionStorage.viewedFullScreen = 'true';
      // try{
      // if(webapis.avplay.getState() === 'NONE')
      // {

      //  player = new VideoPlayer(config);
      // }else{
      //   webapis.avplay.stop();
      //   player = new VideoPlayer(config)
      // }

      displayVideoFullSize();
      // }catch(er)
      // {
      //   alert(er);
      // }
      // function registerKeyHandler() {
      document.addEventListener("keydown", function (e) {
        // if(!$(document.activeElement).hasClass('modal') && !$(document.activeElement).hasClass('language'))
        // {
        //   showControlBar();
        // }

        switch (e.keyCode) {
          // case this.TIZEN.ZERO:

          //   $('.subtitle-audio-button:first').click();
          //   handleSubtitleAudio();
          //   break;

          case 415: // MediaPlay
            // player.play();
            $(".playOrPause:first").find("i").removeClass("fa-play");
            $(".playOrPause:first").find("i").addClass("fa-pause");
            // showControlBar();
            webapis.avplay.play();

            if (
              !$(document.activeElement).hasClass("modal") &&
              !$(document.activeElement).hasClass("language")
            ) {
              showControlBar();
            }
            break;
          case this.TIZEN.OK_BUTTON:
            // alert(JSON.stringify(subtitles));
            // MediaPause
            // player.pause();
            //   if($(document.activeElement).attr('id') == 'av-player')
            // {

            if (
              !$(document.activeElement).hasClass("language") &&
              $(".bar-controller:first").hasClass("d-none")
            ) {
              // alert('d');
              playOrPause();
            }
            // }
            else {
              $(document.activeElement).click();
            }
            showControlBar();

            break;
          case 19:
            $(".playOrPause:first").find("i").removeClass("fa-pause");
            $(".playOrPause:first").find("i").addClass("fa-play");
            webapis.avplay.pause();
            // if(!$(document.activeElement).hasClass('modal') && !$(document.activeElement).hasClass('language'))
            // {
            showControlBar();
            // }
            break;
          case 413: // MediaStop
            // player.stop();
            webapis.avplay.pause();
            // if(!$(document.activeElement).hasClass('modal') && !$(document.activeElement).hasClass('language'))
            // {
            showControlBar();
            // }
            break;
          case this.TIZEN.DOWN_BUTTON:
            // if ($(document.activeElement).hasClass('language')) {
            //   $(document.activeElement.closest('.movedown').nextElementSibling).find('.language:first').focus();

            // }
            // else{
            $(document.activeElement)
              .parent()
              .parent()
              .next()
              .find(".control-action:nth-child(1)")
              .focus();
            // $(document.activeElement).parent().next().find('.control-action:nth-child(1)')

            // }
            if (
              !$(document.activeElement).hasClass("modal") &&
              !$(document.activeElement).hasClass("language")
            ) {
              showControlBar();
            }
            break;
          case this.TIZEN.UP_BUTTON:
            // if ($(document.activeElement).hasClass('language')) {
            //   $(document.activeElement.closest('.movedown').previousElementSibling).find('.language:first')
            //     .focus();

            // }else{

            $(document.activeElement)
              .parent()
              .prev()
              .find(".control-action:nth-child(3)")
              .focus();
            // }
            if (
              !$(document.activeElement).hasClass("modal") &&
              !$(document.activeElement).hasClass("language")
            ) {
              showControlBar();
            }
            break;
          case this.TIZEN.RIGHT_BUTTON:
            if ($(document.activeElement).hasClass("language")) {
              // alert('in');
              $(document.activeElement).next().focus();
            } else {
              // else{
              if (
                $(".bar-controller:first").hasClass("d-none") &&
                !$(document.activeElement).hasClass("language")
              ) {
                // $(document.activeElement).click();
                // alert('dd');
                // tizen.webapis.jumpForward(1 * 6000);
                webapis.avplay.jumpForward(60000);

                // showControlBar();
              } else {
                $(document.activeElement).next().focus();
              }
              // // // console.log($(document.activeElement).next());
              // $(document.activeElement).next().focus();
              // }
              // webapis.avplay.jumpForward(1 * 60000);
              // showControlBar();
            }
            break;
          case this.TIZEN.LEFT_BUTTON:
            // $(document.activeElement).prev().focus();
            // } else {
            // if ($(document.activeElement).hasClass('language')) {

            //   $(document.activeElement).prev().focus();
            // }else{
            //   $(document.activeElement).prev().focus();

            //   if ($('.bar-controller:first').hasClass('d-none')) {
            //     if(!$(document.activeElement).hasClass('language'))
            //     {
            //       tizen.webapis.jumpBackward(1*60000);
            //       showControlBar();
            //     }
            //   }
            // }
            // webapis.avplay.jumpBackward(10000);
            // showControlBar();

            // }
            if ($(document.activeElement).hasClass("language")) {
              // alert('in');
              $(document.activeElement).prev().focus();
            } else {
              // else{
              if (
                $(".bar-controller:first").hasClass("d-none") &&
                !$(document.activeElement).hasClass("language")
              ) {
                // $(document.activeElement).click();
                // alert('dd');
                // tizen.webapis.jumpForward(1 * 6000);
                webapis.avplay.jumpBackward(60000);

                // showControlBar();
              } else {
                $(document.activeElement).prev().focus();
              }
              // // // console.log($(document.activeElement).next());
              // $(document.activeElement).next().focus();
              // }
              // webapis.avplay.jumpForward(1 * 60000);
              // showControlBar();
            }
            break;
          case 417: // MediaFastForward
            // webapis.avplay.jumpForward(5 * 60000);
            // alert('dd');
            forwardVideo();
            if (
              !$(document.activeElement).hasClass("modal") &&
              !$(document.activeElement).hasClass("language")
            ) {
              showControlBar();
            }
            // showControlBar();

            break;
          case 412: // MediaRewind
            // webapis.avplay.jumpBackward(60000);
            backwardVideo();
            if (
              !$(document.activeElement).hasClass("modal") &&
              !$(document.activeElement).hasClass("language")
            ) {
              showControlBar();
            }
            BACK_BUTTON;
            break;

          case this.TIZEN.BACK_BUTTON: // Return
            // alert(document.activeElement.classList);
            if (
              $(document.activeElement).hasClass("modal") ||
              $(document.activeElement).hasClass("language")
            ) {
              // alert('here babbe');
              $(".close:first").click();
            } else {
              // webapis.avplay.stop();
              // player.stop();
              history.back(-1);
            }
            break;
          case 457:
            showControlBar();
            break;
          default:
            log("Unhandled key");
        }
      });
      // }

      setInterval(() => {
        canSwitchChannels = true;
      }, WAIT_BEFORE_SWITCHING);
    });

    // function handleSubtitleAudio() {
    //   // check if audio children is empty focus on subtitle-track
    //   // alert('subtitle and audio handle');
    //   // $(document.activeElement).click();
    //   setTimeout(() => {
    //     if ($('#audio').children().length != 0) {
    //       $('#audio').find('.active:first').focus();

    //       // alert(document.activeElement.classList)
    //     } else {
    //       if ($('#audio').children().length == 0) {

    //         if ($('#subtitle-track').children().length != 0) {
    //           $('#subtitle-track').find('.active:first').focus();
    //         }
    //         // else{
    //         //   $('.close:first').focus();
    //         // }
    //       }
    //     }
    //     // alert('dd');
    //   }, 1500);

    //   // check if subtitle track is empty focus on close

    // }

    function handleSubtitleFocus() {
      // if ($('#subtitle-track').children().length != 0) {
      // }
      setTimeout(() => {
        $("#subtitle-track").find(".active:first").focus();
      }, 1500);
    }
    function handleAudioFocus() {
      // if ($('#audio').children().length != 0) {
      // }
      setTimeout(() => {
        $("#audio").find(".active:first").focus();
      }, 1500);
    }
    function seekTo(direction) {
      //   var StartTime = webapis.avplay.getStreamingProperty("GET_LIVE_DURATION").split('|')[0];
      //  var EndTime = webapis.avplay.getStreamingProperty("GET_LIVE_DURATION").split('|')[1];
      //  alert('start :'+);
      //  alert('start :'+webapis.avplay.getStreamingProperty("GET_LIVE_DURATION"));
      if (direction == "start") {
        webapis.avplay.seekTo(0);
      } else {
        webapis.avplay.seekTo(webapis.avplay.getDuration());
      }
      // pause()
    }
    // var timeOut = 0;
    var showBar;
    function showControlBar() {
      // timeOut = timeOut + 000;
      $(".bar-controller").removeClass("d-none");
      $(".bar-controller").addClass("animated animatedFadeInUp fadeInUp");
      $(".bar-controller").removeClass("fadeoutDown");
      $(".subtitle-audio-button:first").removeClass("d-none");
      if (!$(document.activeElement).hasClass("action-button")) {
        $(".playOrPause:first").focus();
      }

      clearTimeout(showBar);
      showBar = setTimeout(showControlBarFunction, 5000);
    }
    function showControlBarFunction() {
      $(".bar-controller").removeClass("fadeInUp");
      $(".bar-controller").addClass("d-none");

      $(".bar-controller").addClass("animated animatedFadeInUp fadeoutDown");
      $(".subtitle-audio-button:first").addClass("d-none");
      // $('#control-bar').addClass('d-none');
    }
    function playOrPause() {
      // alert('dd');
      if (webapis.avplay.getState() === "PAUSED") {
        $(".playOrPause:first").find("i").removeClass("fa-play");
        $(".playOrPause:first").find("i").addClass("fa-pause");
        webapis.avplay.play();
      } else {
        $(".playOrPause:first").find("i").removeClass("fa-pause");
        $(".playOrPause:first").find("i").addClass("fa-play");
        webapis.avplay.pause();
      }
    }

    function forwardVideo() {
      webapis.avplay.jumpForward(1 * 60000);
    }
    function backwardVideo() {
      webapis.avplay.jumpBackward(1 * 60000);
    }
    function updatePlayerPosition(currentTime, durationTime) {
      let remainingTime = durationTime - currentTime;
      let playedTime = currentTime;
      $(".currentTime:first").html(msToTime(currentTime));
      let playedPercentage = (playedTime / durationTime) * 100;
      $("#playerPlayed").attr("style", "width: " + playedPercentage + "%");
      $("#playerPoint").attr("style", "left:" + playedPercentage + "%");
    }

    function msToTime(duration) {
      var milliseconds = Math.floor((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      return hours + ":" + minutes + ":" + seconds;
    }

    function log(msg) {
      var logsEl = document.getElementById("logs");

      if (msg) {
        // Update logs
        // // console.log("[PlayerAvplay]: " + msg);
        logsEl.innerHTML += msg + "<br />";
      } else {
        // Clear logs
        logsEl.innerHTML = "";
      }

      logsEl.scrollTop = logsEl.scrollHeight;
    }
  },
  props: ["url"],
};
</script>

<style>
</style>