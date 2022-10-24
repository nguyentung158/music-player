/**
*@type {HTMLElement}
**/
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playlist = $('.playlist')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const audio = $('#audio')
const player = $('.player')
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");

const app = {
    isPlaying : false,
    isRandom: false,
    isRepeat: false,
    currentIndex: 0,
    songs : [
        {
            name: "Mình là gì của nhau",
            singer: "Lou Hoàng",
            path: "mp3/Minh-La-Gi-Cua-Nhau-Lou-Hoang.mp3",
            image: "https://data.chiasenhac.com/data/cover/64/63313.jpg"
        },
        {
            name: "Buông đôi tay nhau ra",
            singer: "Sơn Tùng MTP",
            path: "mp3/Buong Doi Tay Nhau Ra - Thanh Loi.mp3",
            image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBISFBgSEhUYGRgYGBgaGBgaGBgZGBgYGBgaGRgYGRocIS4lHB4rHxgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHxISHzQrJSs3NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAKsBJwMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAAAAQMEBQYCBwj/xAA7EAABAwIEAwUHAgUEAwEAAAABAAIRAyEEEjFBBVFhBiJxgZETMqGxwdHwQlIUI3Lh8RZigpIVosIH/8QAGQEBAAMBAQAAAAAAAAAAAAAAAAECAwQF/8QAJREAAgICAgICAgMBAAAAAAAAAAECEQMhEjEEQRNRQmEjMnEU/9oADAMBAAIRAxEAPwCwvQSXpeCbghCaASE0IBJoQgBCaEAkJoQAEFNCA8ppqN9Ro1KA9IVU8RpgwXAeYUb+LUQCc+ivwl9AvFec4XP4vjLYJb/c/Zc/X4+7QGNrfErSOCUizjXZ9BCa4/A8YqCCTIPPfzXS4DHsqCxvuFSeJwIcaLaE0LMgSSaEAJJoQCQmkgBCEIAQhCARSTQgEEJhCAQTSCaAaEIQDQhCAEIQgGhJNACEIQDQhUeKYo02d33jp05n85hTFW6QIuJcWZSlou/kNvFcjiuJ1KjjLiLG0/ZGJqyHQToTO5J3VGizv36fb6r0MWKMV+w0efbuc10k2Ij0P2VZjqlQhrGucTpAMlW8NRuWuFp/PqvonYPBU8r3WzyPHJFo6TPorZMigro0x4+T7OC/09j8s+ydB6ifnZZeJ4TiGe/SeP8Aifov0C+kFSr4dpOiwXlNekbvxov2z4pw6tHcMgftM2PMDZbGGxBYQQY1+Gq7bjXCKT2lxaJF5hcDXaWy3kben91eORZPRSeJwXdna8OxYqMDhruri4fs9xE03hrj3TY9Oq7cGVy5sfGX6OcaEkLIDQkhACEIQAhCEAJJpIASTSQAEICEABNIJhANCEIATSTQAhCEAIQhACaEIBrmuNYgPOUHUkf8WkyfUH4Loqz8rS7kCfguCxdVxff9ABPjr9VvgjbstEheJLvGPT/CicyH5esfBSPqAOb5n0v917c4Oc13X5Eyuyy9Imw1MvfpfN8Vst4g7CPDmHvRJb9D0K9cNwZzOBGokdSNL8ltjs9TLfaVJc9+o+EDlaFzTyRvZ1QxtR12ecN2mxdUS2k0WGoffqCtHA8UqvdlqsgzEiY8bqpgMKMO053gN2BO+8FaeAxdOo6GkHZYya9LRrGNLY+KAFpZpIv0G/rovlvGcQ3OcosD+FfUe1OEccO99OZAuBuBr8F83w3DmVGGpUdDSYAF3Ej6LXBStsxzXKkjGovi42Pw/JX0Hg9Y1KLHncfIx9FweJwvszImCPPkuo7IYwOY6kdWGR/S7+/zWvkR5RtejiapnRIQhcJAIQhACEIQAkmkgGkmkgEhBSQDCEghAMJpBNANCEIATSQgGhCEAIQhANCSaAq8UP8AJf8A0ketvquExpkkj9TifKYHy+C7zHtmm8f7T8Lrg8S9oMuOnwXX4/TLIoYiqS93QZR9VcwD5c0H85LIxFcF0A236rU4EJrMJFszZ9QuqaqJMHcz6pgMGB3ovkA8/wA+av47C1HMy03Fh/dAJHhKt4Rgj0V0QvMq9nouVM+f4zsWHvZUdVe4gtLg4zmc0630np8FvcE4K2i4uAufQeAW69sryyxVpSk1TZCpbSLAbaOi+X9rOygbWz0y5tJ+rR7rH84izTJ8F3PGOPUsLlDsznvdlaxjS57vBouuX7Qdo2tcKVw5xFiDMWJEbbarbG2mqMpxTTbMH/S9a4JhpFpuNNRGizezDnMxGUgg95rhyIkH4gLtuEcSbGRxttO3TwWfTwTP4upVaIDmtPTNJDo8gPVaSk1FqRzTiqtGshCFwmQIQhACEIQCQhCAaSEIBJJleSgGEJBCA9JryF6QDQhCAE0k0AIQhACEIQAhCEB4qiWkdF8542z2ZLTrAnpN4X0h0xaJ66Lhe0+BLS03JcXFxjqD9V0+NKpUDsewvCGDDsqtLe+ySMjCXOvOZxBMA2gEQAouI8OpVHO9i1rchIJa3KC4CZHMX+Cpdg+OMp0jharoylzmD94dcs/qmSOcxsuuo4cMZ37uc6bbZuv5oq5XJTbPSxcXBEvCcSXsaekHyWqwrDwX8t5bsbj1v9PVa7HLAu0TIyIao8XUc1pLRJiw5nkrIqQYkUqU1HFrS62Y6noNz4Bcvxj+COV1UsD81jBk3kZoGmmqlxHCqtZ3tsU8tP6GMNmN2E7nnCweI8MwxJzOqz+4SY9RdawS5LZaULg9k+JwHs+/TMtOnResLiYqMZs9jj4Fpb9yq2BD2MgvztuBYggA2kHeFewOHl3tDsMo8zJ/+fRa5WuLs8+X9TQQhC4zIEIQgBJNJACEIQAhCSASRTKSAAhAQgGF6CSYQDQhCAE0k0AIQhACEIQAhNomwueSv0OE1HXcMo/3a+itGEpdIFBVOIYZtRj2ndputt3DCNX/APr/AHUf/jcwjPryF/mrrFNO6B8mFIAlpFwU6/E8UwAtr1C0ajOT87wuz4/2SaxrqtN7pF8uUXjZcLiIcCNpXeqfZe2lo+l9nMG5uHbWzl2fK+NQ0Eag89JXQ0cRIWP2MY5uDotcZBYC09DPd8jI8grOPpvpjMwSOS87InzaPRg7ijZZUUrXyuNp9pWtMVA5viFo0e0dE/rCjjJehcX7N3EU8wWVXwTYMqOr2lotHvtPmuex3acukU/VWjCT6RDmorbPPEKYa/KNBstHDU8rAN9/EqhgMI4H2lZwzahsgweZ+y02vadCD4EK2S6pHBOak9DQmhYmYkIQgEhNJACEJIBpFCCgPKE4SQAEICEA0wvIXoIQNNJCEjQkhANCEIAWtw7hge0VKmh0Gk9SvHDcGI9pUEt/S3n1PRXK/EhsDbwXVhw/lIU2aGHwtOn7jQJ339VO5hWNTx9TX2L4591WGcTDrCQ7kbH0XSml0TxouOYIgrLxLHU3ZgMzCb829T0V1+KtJXinic1jFwjZKRVxFM1GEREg/JcP2c4Fh31ajKwJcCS1s2EEgwu5xGamC5slu7eXMt+y5zh1LNiHVGfpeZt+lxv81HplvZ1dPBtp02spgAMFgNhyCr1NFebaCNFTxYyujncfULkzR1yR14Z/izMr4Jjz3mg+IWDxjgDNafcPIe6fLbyXSvfCp4nENymdgsYSkno3lFPs+dPpPa7K4X+CkbDbqzi6oe+RsvDGBzHtIk5HOHSLg/BeljttWedkpXR6eC5udh/qHLqOiqU8a5h1uoMBjHU3gfhU3E6WaKjQBOsLpo4zoMBxsHuuudjr6q3U4g4XtHmuLwzyJha1LEOIjUFZvFC7pFrf2dhwtrq4kaDV3Xl1KnxGFcyTYgakbeI2WhwjB+ypMa3UjM7qSJ+w8l7ee+5p2g+IPPouWeKMnpUa00tmIheqsZjGkn5rwuJqnQBCElAGkShIoQEpShCgAChAQpJGF6AXt7IuF6YwyBBXZj8SUnUtGbyJK0RwhXnYV0RF1Wq0nN1Cpm8Z41adotFt+iJCkZSc73RKl/hHRKxjjlLpF0m+isrGCoe0dB0Fz9B5rzUwrmtDyLFaXB6YyzuXH4AR81eGN8qkhVdk9R7j3B08PLorOFwYF3XU9JjWnqphcSu6rJuuiMgRAUVTDtIuJ+fkrJadvkvD2u5KriTyMyvQeLtMjkqbK+U2sdwtqpmA92fBZHFMLnFrO2P0PMKNj/DSY8ObO2qxqlAYasag9x/vDken5r4qbhby1mUmSLHmDuPDqrtZrajO9eZClSXQZbw1RpAIMtOhXnFYQVGETB1a7XK7Y/25WWRgKzqbxSee673StapWFMS9waOZIHxKSgiYy9nMPxRDnMqDK9phzeXIg7tIuCsLjeIlpDTrvK0O2uLpPyVqNRhqM7rgCDnYTvHI/MrlH1va6G+4WCwqMr9HT83KNezxTXnhdfPWqcg0M8oP1JXjESwHmtb/APOeHMqPrmo0khrHNBBi5dmPWxZ/2XVB0mzkmr0YVfDlpnkVpYel7Rmhg28Cu3wPAKTC6o8ZnScoPut5W3PitHh9Nt+6AHHl81Z5kuikcTfZ8qZhyx8FbmA4VUe9oaw5SRJgwBNyu6qcBwxd7QsGYGRrB8tFeeGtAEfnkqyy30WjjrsKIgWWTxuq6m5tQbtc3z1H1W2xsBZfaGjnoOO7CHf9TJ+ErKD2XmtEeFwbcoc8TInW17qR3DWHUFusQbRsb6KThVSaTCeVuomxVypISSjJ7RTjowKuBqNPuyOYvPlqqxEWK6OZsVBj6IeyBFjqRf1GyxngVXENGGvJVith3suRbmLhVyuZprTKghCSqSMIQEKQaDSb+zyPixggkeI2U7DU3gHZZ+G4V7Ek0nnvGXTBzHl0HxW3hiDBI+C9j5H7OiOCl+j2zBktku7x0jmomYKreXMgbXkrWaWxoqlSuG2nVZSm6NY409EGHwpF7AclczgNyxKibVkWUVCZIOnNQpN0X+JRTFWAe4MduLQvOFZ7Nxa2D3jpy09Vj43EOqVTkMMYIzczvCu4HEtaJnT1KKrNMnj1FS910bNNm/qrAFoFlWw9XM2Yjop2PvdWTPOkny2SeCahLiXJVX9VFkUGJmO6YKpPLj+0+JXqu9xIDRKkpYPd9zy2ROw1RlYvCvb/ADabSSLOaL5m7gdRqFcw1Rj2AtMg/hHitUtEXA8FXcxoByMAkyYGpO56qHEhNmLxLBsrsNN1nC7Hbtdsfv4r55jRVbWy1nOc9pykvcXGOhOy+nVMG91xPnoue7WcFc9nt2iXsHeAvmYL+rdfCeivH6ZD+zBwLA/EUgCIa9pM6QzvEfCF1fafD0/4V9VjGB4LYqZGh0ioGuvE8wuf7GVqYrOa5mZzpDXQXATqCNBI3W523r5MO2mABne0QLANb3rDxDVElcki0XSbMrhOGwtWk5z2jOPfn9sXy/taf8la3ZSizv1BTyBxDA3PnAaBMNAsGydCJEDaFwmGxj6boYepEwHAd7KTsCQPiuy4FxCm2hDGOZkJc5tjEGInnDdrclE4uPRMZctm1jH5ARvsFLw5hynMoOImHsIuCQfsrZfss30WXZ7p1A6RyP5dN7xoV4w7QD1+iiqvY5zmscC5sZgDcTzCqWLoeI1UVdrXNLToQQR9FAD3YUT8S1oiZUphoi4E/uvpnVjoH9O3381ol2bTyOy5rE4xtNzntmXRPlZGF7R7EKXd2iOOjoqp/TCjdSdodFBh+LU32zQVca8O0PmrX9lWmQFjgIi3qqWIwAddgynl+n+y0TI1Kjc92ouklGSpleLMKph3t1CjawnRdE9pcIIHmqtTBsA1ynmPsVg/HV6ehFK9mczDjcoVbFUX0jZ2YH9XXlCFp8Mfo7o4MbVpnSVsIcpym6r4aqZLHnwK1RAbdYGLwzi/O12hstE7IhJPTNVkxGYeC8MxLfdN7rPqZz0nkpqdOAJM9VnkbirNFKMVsttY1ghtkn0szC3NE6woMy9ZrLk+d3ozeaRl4jhVR5DWvDWjYbr2cCacAGw1J1KvsfBVbHkvhrTE7rXFmvsv/wBU7SZocOxQJyFaD3iYCweH4UUiS52YyL7eXqtqm7MZXSpqWkcuRR5WiYtIFtU20TuvTHJyr0jG2AAGnqvOYNFyvNY2UFaqCIKi/o0jjtWN2JkhrQSTurEQFFTpACR7xXumwuknZBKH0MsB966qmiwm0+tlXx2MNOyrYbHEm6xl5MYy4leBrUqNOmIpsa3wACg4hgaWIbkqNDh11Hgdl7L5EqDH4oU2F06ardSvZVxOZxHYbDuDmMe8B0awYIDgCN7ZitPCcDbSpmnnLp94kC/59Vo4Op7RgeN7pVakmNh81DmmrJjDdIrU5DWMc0HIxrZmJyiJiLKY140AUb38lGSsOVm/FImdinRAgeCoUWCmXOb7zveOpMKR71Wqv6qyIo91a55qq+qAJJVTE4trSBN1R4rUhs5lYi0Wn4mnUMSqGKwjwc1O45LFbi4Kss4l1VkU5KXRP7V7dWlT0ONVKejiOihZxDmvFavTfYgeKkk67gnH21jkqGHfNdGTAsF8efmpOBBtsV2HZ/tGXxTqOvoCoqiOzpn035pEqKo94sRIPRS5z+7VGc8/8IiGiINbyjpFkl6e8k2dHQ6eqFcqW65dCpOYZUlZ55oparm5UdD0eXsJtspCWgQVJUUNRY5Jt6I5No8Bm6ZcAvJ0WfVeeaw4pC7NAPaq1QwVSpvM6qepojfoqyU4klXsLjQNVijVWWaJjm4ysqzoXYkBmebLPZxe5keCp4qoe4JtGi9UqYMWXrR3G2RWzV/iRUAyG/JMxMKuLC1l5BXn+R5DhKom0XSLeGqEZp528FDXxTwO66CoXPPNQ1tVnHyZOaNE7kQYp+Yydd1UdUDbhN5kFZ9c2WWVfyMpk02auE4pLssrK7V8RzZaDDdxAd4SsbhtQ+2N91HXM4oTe4XZi5QTTZzyej6BgzkY1o5Bei4KsTYeA+SiLzzXnLJJPs2LboUD3qLOeaKui1xzbdlXp2QuqLG4xxH2Y1utemuX7UjvD85r0IO3RXJOkZ1HFlzszrnZRYuvUee9ovfDhJVnGMHJamUYuS2yjQpAnvLawvAGVdZb1WJw0TWa3adPNfRmMAaLbLDyMjxql7LRijCwfZmmwy9xd0WhX4NQdoIVt2ijYV508uS+zVRRVZwikwEOvbfZcli8I+m9z2juzZdnV3WfjNAPzVdOHyJflsq1Ru9n8QKlBr6hg/RaTalN05bkLlKdQjK0GByXQtEMtZejF2kyrCrVymzPOShOmcw710KxU//Z"
        },
        {
            name: "Ghé qua",
            singer: "Dick; Tofu",
            path: "mp3/Ghe Qua - Dick x PC x Tofu.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2021/06/10/e/7/c/a/1623318282232_640.jpg"
        },
        {
            name: "Another love",
            singer: "Tom Odell",
            path: "mp3/Another Love - Tom Odell.mp3",
            image: "data:image/jpeg;base64,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"
        },
        {
            name: "I love you so",
            singer: "The Walters",
            path: "mp3/I Love You So - The Walters.mp3",
            image: "data:image/jpeg;base64,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"
        },
        {
            name: "Ngã tư không đèn",
            singer: "Trang",
            path: "mp3/NgaTuKhongDenSpeedUp-Trang-7771517.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/mv/2022/07/23/3/5/f/0/1658561438835_268.jpg"
        },
        {
            name: "Ngã tư không đèn",
            singer: "Trang",
            path: "mp3/NgaTuKhongDenSpeedUp-Trang-7771517.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/mv/2022/07/23/3/5/f/0/1658561438835_268.jpg"
        },
        {
            name: "Ngã tư không đèn",
            singer: "Trang",
            path: "mp3/NgaTuKhongDenSpeedUp-Trang-7771517.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/mv/2022/07/23/3/5/f/0/1658561438835_268.jpg"
        },
        {
            name: "Ngã tư không đèn",
            singer: "Trang",
            path: "mp3/NgaTuKhongDenSpeedUp-Trang-7771517.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/mv/2022/07/23/3/5/f/0/1658561438835_268.jpg"
        },
        
    ],
    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
          get: function () {
            return this.songs[this.currentIndex];
          }
        });
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },
    render : function() {
        const _this = this
        const htmls = this.songs.map(function(song, index) {
            return  `
            <div class="song ${
              index=== _this.currentIndex ? "active" : ""
            }" data-index="${index} ">
                <div class="thumb"
                    style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
        `;
        })
        playlist.innerHTML = htmls.join("");
    },
    renderCurrentSong : function() {
        const songs = $$('.song')
        const pastSong = $('.song.active')
        songs[this.currentIndex].classList.add('active')
        pastSong.classList.remove('active')
      },
    handleEvent: function() {
        const _this = this
        const cdWidth = cd.offsetWidth

        //xu ly xoay CD
        const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
            duration: 10000, // 10 seconds
            iterations: Infinity
          });
          cdThumbAnimate.pause()

        // Xu li phong to thu nho CD khi scroll
        document.onscroll = function() {
            const scrollTop = document.documentElement.scrollTop || window.scrollY
            const newCDWidth = cdWidth - scrollTop
            cd.style.width = newCDWidth > 0 ? newCDWidth + "px" : 0 
        }

        //XU li khi an nut play music
        playBtn.onclick = function() {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        //khi song duoc play
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }

        //khi song duoc pause
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        // When the song progress changes
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(
                    (audio.currentTime / audio.duration) * 100
                );
                progress.value = progressPercent;
            }
        };

        // Handling when seek
        progress.onchange = function (e) {
            const seekTime = (audio.duration / 100) * e.target.value;
            audio.currentTime = seekTime;
        };

        nextBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.renderCurrentSong()
            _this.scrollToActiveSong()
        }

        prevBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
            _this.renderCurrentSong()
            _this.scrollToActiveSong()
        }

        //xu lo nut random
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle("active", _this.isRandom);
        }

        // Single-parallel repeat processing
        repeatBtn.onclick = function (e) {
            _this.isRepeat = !_this.isRepeat;
            repeatBtn.classList.toggle("active", _this.isRepeat);
        };

        // Handle next song when audio ended
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
        };

        // Lắng nghe hành vi click vào playlist
    // Listen to playlist clicks
        playlist.onclick = function (e) {
            const songNode = e.target.closest(".song:not(.active)");
  
            if (songNode || e.target.closest(".option")) {
              // Xử lý khi click vào song
              // Handle when clicking on the song
              if (songNode) {
                _this.currentIndex = Number(songNode.dataset.index);
                _this.loadCurrentSong();
                _this.renderCurrentSong();
                audio.play();
              }
              
              // Xử lý khi click vào song option
              // Handle when clicking on the song option
              if (e.target.closest(".option")) {
              }
            }
        }
    },
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
          this.currentIndex = 0;
        }
        this.loadCurrentSong();
      },
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
          this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
        
    },
    playRandomSong: function () {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex);
    
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    scrollToActiveSong: function () {
        setTimeout(() => {
          $(".song.active").scrollIntoView({
            behavior: "smooth",
            block: this.currentIndex < 2 ? "end" : "center",
          });
        }, 300);
      },
    start : function() {
        this.defineProperties()
        this.handleEvent()
        this.loadCurrentSong()
        this.render()
    },
}

app.start()