function elem(element, parent) {
    if (parent) {
        return parent.querySelector(element);
    } else {
        return document.querySelector(element);
    }
}

function SCarousel(prefs) {
    this.element = elem(prefs.element);
    this.sliderScroller = elem(".carousel-view", this.element);
    this.slider = elem(".carousel-images", this.element);
    this.cimgno = this.slider.children.length;
    this.cprev = elem("#cprev", this.element);
    this.cnext = elem("#cnext", this.element);
    this.cwidth = elem(".carousel-view", this.element).clientWidth;
    this.currentIndex = 0;
    this.anims = {
        simple: " .4s ease-in-out",
        elastic: ".4s cubic-bezier(0.6, -0.28, 0.74, 0.05)"
    }
    var toMove = 0,
        that = this;
    this.init = function() {
        that.slider.style.width = (that.cwidth * that.cimgno) + "px";
        var anim = that.anims[prefs.animation];
        if (anim) {
            that.slider.style.transition = anim;
        }
        var arr = that.slider.children;
        var src = "";
        for (var i = arr.length - 1; i >= 0; i--) {
            arr[i].style.width = that.cwidth + "px";
            src = arr[i].dataset.isrc;
            if (src) {
                arr[i].style.background = 'url(' + src + ')';
            }
        }
    }
    this.next = function() {
        if (that.currentIndex < that.cimgno - 1) {
            that.currentIndex += 1;
            toMove += that.cwidth;
        } else {
            toMove = 0;
            that.currentIndex = 0;
        }
        that.slider.style.transform = "translateX(-" + toMove + "px)";
    }
    this.prev = function() {
        if (that.currentIndex != 0) {
            that.currentIndex -= 1;
            toMove -= that.cwidth;
        }
        that.slider.style.transform = "translateX(-" + toMove + "px)";
    }
    this.cnext.addEventListener("click", function() {
        that.next();
    });
    this.cprev.addEventListener("click", function() {
        that.prev();
    });
    //Sliding through arrow keys
    document.addEventListener('keydown', function() {
        var keyno = event.keyCode;
        if (keyno == 39) {
            // key = "Right";
            that.next();
        }
        if (keyno == 37) {
            // key = "Left";
            that.prev();
        }
    });
    this.getIndex = function() {
        return that.currentIndex;
    }
    this.init();
}