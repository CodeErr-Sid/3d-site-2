class peVideoPlayer {

    constructor(DOM_el, options) {

        this.DOM = {
            el: null,
            video: null,
            button: null,
            flip: null,
            widget: null
        };

        this.DOM.el = DOM_el;

        this.options = {
            controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
            clickToPlay: false,
            autopause: false,
            debug: false,
            autoplay: false,
            autopause: false,
            muted: false,
            playsinline: true,
            loop: {
                active: true
            },
            storage: {
                enabled: false
            },
            youtube: {
                modestbranding: 1,
                controls: 0,
                rel: 0,
                cc_load_policy: 0,
                iv_load_policy: 3,
                noCookie: true,
                frameborder: 0,
            },
            vimeo: {
                autopause: false,
                controls: false
            }
        }

        var parent = this.DOM.el;
        this.video = parent.querySelector('.p-video');
        this.button = parent.querySelector('.pe--large--play');
        this.parent = parent.parentNode;
        this.lbHold = this.parent.querySelector('.pe--lightbox--hold');

        //Get Attributes
        this.autoplay = (this.DOM.el.dataset.autoplay === 'true');
        this.muted = (this.DOM.el.dataset.muted === 'true');
        this.loop = (this.DOM.el.dataset.loop === 'true');
        this.controls = this.DOM.el.dataset.controls;
        this.lightbox = (this.DOM.el.dataset.lightbox === 'true');

        this.autoplay ? parent.classList.add('autoplay--running') : parent.classList.add('not-interacted');
        this.dynamicControls = parent.classList.contains('vid--controls--dynamic') ? true : false;

        // Set Player Options
        this.options.controls = this.controls.split(',');
        this.options.autoplay = this.autoplay;
        this.options.loop.active = this.loop;
        this.options.muted = this.muted;

        this.render();

    }

    render() {

        if (!this.DOM.el.classList.contains('vid--initialized')) {

            this.player = new Plyr(this.video, this.options);

            if (this.button) {

                this.button.addEventListener("click", () => {
                   
                    if (!this.DOM.el.classList.contains('vid--interracted')) {

                        this.DOM.el.classList.add('vid--interracted');

                        if (this.lightbox) {

                            let state = Flip.getState([this.DOM.el, this.DOM.el.querySelector('.plyr')]);

                            this.DOM.el.classList.add('lightbox-open');
                            this.parent.classList.add('lb-hold');
                            document.body.classList.add('lightbox--active');

                            if (ScrollSmoother.get()) { 

                                gsap.set(this.DOM.el , {
                                    top:  ScrollSmoother.get().scrollTop()
                                })

                            }

                            this.flip = Flip.from(state, {
                                duration: 1,
                                absolute: true,
                                absoluteOnLeave: true,
                                ease: 'expo.inOut',
                                onReverseComplete: () => {

                                    this.parent.classList.remove('lb-hold');
                                    this.DOM.el.classList.remove('lightbox-open');
                                    this.DOM.el.classList.remove('lightbox--started');
                                    document.body.classList.remove('lightbox--active');

                                    gsap.set(this.DOM.el, {
                                        clearProps: 'all'
                                    })

                                },
                                onComplete: () => {
                                    this.DOM.el.classList.add('lightbox--started');
                                }
                            });

                            this.DOM.el.classList.remove('autoplay--running');
                            this.DOM.el.classList.add('vid--playing');
                            this.player.muted = false;
                            this.autoplay ? this.player.restart() : this.player.play();


                        } else {

                            this.DOM.el.classList.remove('autoplay--running');
                            this.DOM.el.classList.add('vid--playing');
                            this.player.muted = false;
                            this.autoplay ? this.player.restart() : this.player.play();
                        }


                    } else {

                        this.player.play();
                        this.DOM.el.classList.add('vid--playing');
                        this.DOM.el.classList.remove('vid--paused');

                    }


                }, false);

            }

            this.player.on('pause', (event) => {

                this.DOM.el.classList.remove('vid--playing');
                this.DOM.el.classList.add('vid--paused');

            })

            this.player.on('play', (event) => {

                if (this.DOM.el.classList.contains('vid--interracted')) {

                    this.DOM.el.classList.add('vid--playing');
                    this.DOM.el.classList.remove('vid--paused');

                }

            })

            this.player.once('playing', (event) => {

                this.DOM.el.classList.add('vid--initialized');

                if (this.lbHold) {
                    gsap.set(this.lbHold, {
                        height: this.DOM.el.offsetHeight
                    })
                }

                this.ratio = this.player.ratio.split(':')[0] / this.player.ratio.split(':')[1];

                var parentRatio = this.parent.offsetWidth / this.parent.offsetHeight;

                const $iframe = this.parent.querySelector('.plyr__video-wrapper');
                const targetWidth = this.parent.offsetHeight * this.ratio;


                if (parentRatio < this.ratio) {

                    gsap.set($iframe, {
                        width: targetWidth + 10,
                        height: this.parent.offsetHeight + 10,
                        x: -1 * (targetWidth - this.parent.offsetWidth) / 2
                    })

                    gsap.set(this.parent.querySelector('.plyr__video-embed__container'), {
                        //                        paddingBottom: 0,
                        //                        y: 0,
                        //                        yPercent: 0
                    })
                }

            })

            if (this.lightbox) {

                this.DOM.el.querySelector('.pe--lightbox--close').addEventListener('click', () => {

                    this.player.pause();
                    this.DOM.el.classList.remove('lightbox--started');
                    this.flip.reverse();

                })

            }

        }


    }

}