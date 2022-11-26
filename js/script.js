$(document).ready(() => {
  // Mobile navigation
  $("#open-menu").click(() => {
    $(".navigation__list").css("width", "30rem");
    $(".navigation__list").css("padding", "0 3rem");
    $(".navigation__list").css("paddingTop", "8rem");
    setTimeout(() => {
      $(".navigation__list > *").css("visibility", "visible");
      $(".navigation__list > *").css("opacity", "0.9");
    }, 300);
  });

  $("#close-menu").click(() => {
    $(".navigation__list").css("width", 0);
    $(".navigation__list").css("padding", 0);
    $(".navigation__list > *").css("visibility", "hidden");
    $(".navigation__list > *").css("opacity", "0");
  });

  // Sticky navigation
  $(".js--section-about").waypoint(
    function (direction) {
      if (direction == "down") {
        $(".navigation").addClass("navigation--sticky");
      } else {
        $(".navigation").removeClass("navigation--sticky");
      }
    },
    {
      offset: "55px",
    }
  );

  $(".js--section-about1").waypoint(
    function (direction) {
      if (direction == "down") {
        $(".navigation").addClass("navigation--sticky");
      } else {
        $(".navigation").removeClass("navigation--sticky");
      }
    },
    {
      offset: "55px",
    }
  );

  // Scroll on buttons
  $(".js--scroll-to-reserve").click(function () {
    $("html, body").animate(
      { scrollTop: $(".js--section-reserve").offset().top },
      2000
    );
  });

  $(".js--scroll-to-start").click(function () {
    $("html, body").animate(
      { scrollTop: $(".js--section-about").offset().top },
      2000
    );
  });

  $(".js--scroll-to-about1").click(function () {
    $("html, body").animate(
      { scrollTop: $(".js--section-about1").offset().top },
      2000
    );
  });

  $(".js--scroll-to-profit").click(function () {
    $("html, body").animate(
      { scrollTop: $(".js--section-profit").offset().top },
      2000
    );
  });

  $(".js--scroll-to-footer").click(function () {
    $("html, body").animate({ scrollTop: $(".js--footer").offset().top }, 2000);
  });

  $(".js--scroll-to-organisers").click(function () {
    $("html, body").animate(
      { scrollTop: $(".js--section-organisers").offset().top },
      2000
    );
  });

  $(".js--scroll-to-about").click(function () {
    $("html, body").animate(
      { scrollTop: $(".js--section-about").offset().top },
      2000
    );
  });

  $(".js--scroll-to-clients").click(function () {
    $("html, body").animate(
      { scrollTop: $(".js--section-clients").offset().top },
      2000
    );
  });

  // Animations on scroll
  $(".js--section-about").waypoint(
    function () {
      this.element.querySelector(".heading-secondary").style.animation =
        "moveFromTop .75s ease-in forwards";
      this.element.querySelector(".section-about__features").style.animation =
        "appearance 1.5s .75s forwards";
    },
    {
      offset: "50%",
    }
  );

  $(".js--section-clients").waypoint(
    function () {
      this.element.querySelector(".section-clients__features").style.animation =
        "appearance 1.5s forwards";
    },
    {
      offset: "50%",
    }
  );

  $(".js--section-profit").waypoint(
    function () {
      this.element
        .querySelectorAll(".section-profit__item")
        .forEach(function (elem) {
          elem.style.animation = "moveFromBottom 1s forwards";
        });
    },
    {
      offset: "25%",
    }
  );

  $(".js--section-organisers").waypoint(
    function () {
      this.element.querySelector(".section-organisers__box").style.animation =
        "moveFromBottom 1s forwards";
    },
    {
      offset: "50%",
    }
  );

  quotationsVisited = false;

  // Changing quotations on scroll
  $(".js--section-quotations").waypoint(
    function () {
      if (!quotationsVisited) {
        const quotations = Array.from(
          this.element.querySelectorAll(".quote-box__quotation")
        );
        const visible = "quote-box__quotation--visible";

        let i = 0;
        quotationsVisited = true;

        const waitForAnimation = (index) => {
          return new Promise((resolve, reject) => {
            quotations[index].style.animation =
              "moveToRightScreen 1s ease-in forwards";

            setTimeout(() => {
              // waiting
              resolve();
            }, 900);
          });
        };

        setInterval(() => {
          waitForAnimation(i).then(() => {
            quotations[i].classList.remove(visible);

            i = i === 3 ? 0 : i + 1;

            quotations[i].style.animation =
              "moveFromLeftScreen 1s ease-out 1.25s backwards";
            quotations[i].classList.add(visible);
          });
        }, 3000);
      }
    },
    {
      offset: "25%",
    }
  );

  (function ($) {
    var Slider = (function () {
      function _Slider(element, settings) {
        this.defaults = {
          slideDuration: "3000",
          speed: 500,
          /*
                  ,
                  arrowRight: '.right-arrow',
                  arrowLeft: '.left-arrow'
                  */
        };

        this.settings = $.extend({}, this.defaults, settings);

        this.initials = {
          currentSlide: 0,
          $currentSlide: null,
          totalSlides: false,
          cssTransitions: false,
        };

        $.extend(this, this.initials);

        this.$el = $(element);

        this.changeSlide = $.proxy(this.changeSlide, this);

        this.init();
      }

      return _Slider;
    })();

    Slider.prototype.init = function () {
      this.cssTransitionTest();
      this.$el.addClass("slider");
      this.build();
      this.events();
      this.activate();
      this.initTimer();
    };

    Slider.prototype.cssTransitionTest = function () {
      var elem = document.createElement("modernizr");

      var props = [
        "transition",
        "WebkitTransition",
        "MozTransition",
        "OTransition",
        "msTransition",
      ];

      for (var i in props) {
        var prop = props[i];
        var result = elem.style[prop] !== undefined ? prop : false;
        if (result) {
          this.cssTransitions = result;
          break;
        }
      }
    };

    Slider.prototype.addCSSDuration = function () {
      var sliderModule = this;

      sliderModule.$el.find(".testimonial-slide").each(function () {
        this.style[sliderModule.cssTransitions + "Duration"] =
          sliderModule.settings.speed + "ms";
      });
    };

    Slider.prototype.removeCSSDuration = function () {
      var sliderModule = this;

      //here we are using 'this' but we can also write sliderModule
      //since we are refering to the same element...shorter and cleaner
      this.$el.find(".testimonial-slide").each(function () {
        this.style[sliderModule.cssTransitions + "Duration"] = "";
      });
    };

    //create indicator dots below which also have the functionality
    //as the arrows
    Slider.prototype.build = function () {
      var $indicators = this.$el
        .append("<ul class='dots-wrapper'>")
        .find(".dots-wrapper");
      this.totalSlides = this.$el.find(".testimonial-slide").length;
      for (var i = 0; i < this.totalSlides; i++) {
        $indicators.append("<li data-index=" + i + ">");
      }
    };

    Slider.prototype.activate = function () {
      this.$currentSlide = this.$el.find(".testimonial-slide").eq(0);
      this.$el.find(".dots-wrapper li").eq(0).addClass("active");
    };

    Slider.prototype.events = function () {
      $("body")
        .on(
          "click",
          this.settings.arrowRight,
          {
            direction: "right",
          },
          this.changeSlide
        )
        .on(
          "click",
          this.settings.arrowLeft,
          {
            direction: "left",
          },
          this.changeSlide
        )
        .on("click", ".dots-wrapper li", this.changeSlide);
    };

    Slider.prototype.clearTimer = function () {
      if (this.timer) {
        clearInterval(this.timer);
      }
    };

    Slider.prototype.initTimer = function () {
      this.timer = setInterval(this.changeSlide, this.settings.slideDuration);
    };

    Slider.prototype.startTimer = function () {
      this.initTimer();
      this.throttle = false;
    };

    Slider.prototype.changeSlide = function (e) {
      if (this.throttle) {
        return;
      }
      this.throttle = true;

      this.clearTimer();

      var direction = this._direction(e);

      var animate = this._next(e, direction);
      if (!animate) {
        return;
      }

      var $nextSlide = this.$el
        .find(".testimonial-slide")
        .eq(this.currentSlide)
        .addClass(direction + " active");

      if (!this.csstransitions) {
        this._jsAnimation($nextSlide, direction);
      } else {
        this._cssAnimation($nextSlide, direction);
      }
    };

    Slider.prototype._direction = function (e) {
      var direction;
      if (typeof e !== "undefined") {
        direction = typeof e.data === "undefined" ? "right" : e.data.direction;
      } else {
        direction = "right";
      }
      return direction;
    };

    Slider.prototype._next = function (e, direction) {
      var index =
        typeof e !== "undefined" ? $(e.currentTarget).data("index") : undefined;
      switch (true) {
        case typeof index !== "undefined":
          if (this.currentSlide == index) {
            this.startTimer();
            return false;
          }
          this.currentSlide = index;
          break;
        case direction == "right" && this.currentSlide < this.totalSlides - 1:
          this.currentSlide++;
          break;
        case direction == "right":
          this.currentSlide = 0;
          break;
        case direction == "left" && this.currentSlide === 0:
          this.currentSlide = this.totalSlides - 1;
          break;
        case direction == "left":
          this.currentSlide--;
          break;
      }
      return true;
    };

    Slider.prototype._cssAnimation = function ($nextSlide, direction) {
      setTimeout(
        function () {
          this.$el.addClass("transition");
          this.addDuration();
          this.$currentSlide.addClass("shift" + direction);
        }.bind(this),
        100
      );

      setTimeout(
        function () {
          this.$el.removeClass("transition");
          this.removeCSSDuration();
          this.$currentSlide.removeClass("active shift-left shift-right");
          this.$currentSlide = $nextSlide.removeClass(direction);
          this._updateIndicators();
          this.startTimer();
        }.bind(this),
        100 + this.settings.speed
      );
    };

    Slider.prototype._jsAnimation = function ($nextSlide, direction) {
      var sliderModule = this;

      if (direction == "right") {
        sliderModule.$currentSlide.addClass("js-reset-left");
      }
      var animation = {};
      animation[direction] = "0%";

      var animationPrev = {};
      animationPrev[direction] = "100%";

      this.$currentSlide.animate(animationPrev, this.settings.speed);

      $nextSlide.animate(animation, this.settings.speed, "swing", function () {
        sliderModule.$currentSlide
          .removeClass("active js-reset-left")
          .attr("style", "");
        sliderModule.$currentSlide = $nextSlide
          .removeClass(direction)
          .attr("style", "");
        sliderModule._updateIndicators();
        sliderModule.startTimer();
      });
    };

    Slider.prototype._updateIndicators = function () {
      this.$el
        .find(".dots-wrapper li")
        .removeClass("active")
        .eq(this.currentSlide)
        .addClass("active");
    };

    $.fn.Slider = function (options) {
      return this.each(function (index, el) {
        el.Slider = new Slider(el, options);
      });
    };
  })(jQuery);

  var args = {
    arrowRight: ".right-arrow",
    arrowLeft: ".left-arrow",
    speed: 500,
    slideDuration: 3000,
  };

  $(".testimonial").Slider(args);

  //poradnik

  var accordion = document.querySelector(".accordion");
  var items = accordion.querySelectorAll("li");
  var questions = accordion.querySelectorAll(".question");

  //Funtions

  function toggleAccordion() {
    var thisItem = this.parentNode;
    items.forEach((item) => {
      if (thisItem == item) {
        thisItem.classList.toggle("open");
        return;
      }
      item.classList.remove("open");
    });
  }

  //Event Listeners

  questions.forEach((question) =>
    question.addEventListener("click", toggleAccordion)
  );
});

let slide_left_btn = document.getElementById("slide-left");
let slide_right_btn = document.getElementById("slide-right");

let left_slider = document.getElementById("left_slider");
let right_slider = document.getElementById("right_slider");

let num_of_slides = right_slider.querySelectorAll(".slide").length;
let current_slide = 1;

slide_left_btn.addEventListener("click", function (e) {
  slide_left();
});

slide_right_btn.addEventListener("click", function (e) {
  slide_right();
});

function slide_left() {
  if (current_slide === 1) {
    current_slide = 6;
  } else {
    current_slide--;
  }

  document.querySelectorAll(".slide").forEach(function (slide) {
    slide.style.transform = `translateX(-${(current_slide - 1) * 100}%)`;
  });
}

function slide_right() {
  if (current_slide === num_of_slides) {
    current_slide = 1;
  } else {
    current_slide++;
  }

  document.querySelectorAll(".slide").forEach(function (slide) {
    slide.style.transform = `translateX(-${(current_slide - 1) * 100}%)`;
  });
}

let auto = setInterval(function () {
  slide_right();
}, 5000);

//slider
var slideShow = function (container, time) {
  container = document.getElementById(container);
  this.images = [];
  this.curImage = 0;
  for (i = 0; i < container.childElementCount; i++) {
    this.images.push(container.children[i]);
    this.images[i].style.opacity = 0;
  }

  // Handle going to to the next slide
  var nextSlide = function () {
    for (var i = 0; i < this.images.length; i++) {
      if (i != this.curImage) this.images[i].style.opacity = 0;
    }
    this.images[this.curImage].style.opacity = 1;
    this.curImage++;
    if (this.curImage >= this.images.length) this.curImage = 0;
    window.setTimeout(nextSlide.bind(document.getElementById(this)), time);
    // old code: window.setTimeout(nextSlide.bind(this), time);
  };

  nextSlide.call(this);
};
slideShow("slideshow", 7000);
// old code: slideShow(document.getElementById("slideshow"), 1000);
