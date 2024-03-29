"use strict";
var theme = {
    init: function() {
        theme.progressPageLoad(),
        theme.menu(),
        theme.otpVarification(),
        theme.stickyHeader(),
        theme.counterState(),
        theme.alertJS(),
        theme.popovers(),
        theme.tooltip(),
        theme.validation(),
        theme.toast()
    },
    progressPageLoad: ()=>{
        var e = document.querySelector(".btn-scroll-top");
        if (null != e) {
            var t = document.querySelector(".btn-scroll-top path")
              , n = t.getTotalLength();
            t.style.transition = t.style.WebkitTransition = "none",
            t.style.strokeDasharray = n + " " + n,
            t.style.strokeDashoffset = n,
            t.getBoundingClientRect(),
            t.style.transition = t.style.WebkitTransition = "stroke-dashoffset 10ms linear",
            window.addEventListener("scroll", (function(o) {
                var a = document.body.scrollTop || document.documentElement.scrollTop
                  , s = document.documentElement.scrollHeight - document.documentElement.clientHeight
                  , l = n - a * n / s;
                t.style.strokeDashoffset = l,
                (document.body.scrollTop || document.documentElement.scrollTop) >= 50 ? e.classList.add("active-progress") : e.classList.remove("active-progress")
            }
            )),
            e.addEventListener("click", (function(e) {
                e.preventDefault(),
                window.scroll({
                    top: 0,
                    left: 0,
                    behavior: "smooth"
                })
            }
            ))
        }
    }
    ,
    menu: ()=>{
        document.querySelectorAll(".dropdown-menu a.dropdown-toggle").forEach((function(e) {
            e.addEventListener("click", (function(e) {
                if (!this.nextElementSibling.classList.contains("show")) {
                    this.closest(".dropdown-menu").querySelectorAll(".show").forEach((function(e) {
                        e.classList.remove("show")
                    }
                    ))
                }
                this.nextElementSibling.classList.toggle("show");
                const t = this.closest("li.nav-item.dropdown.show");
                t && t.addEventListener("hidden.bs.dropdown", (function(e) {
                    document.querySelectorAll(".dropdown-submenu .show").forEach((function(e) {
                        e.classList.remove("show")
                    }
                    ))
                }
                )),
                e.stopPropagation()
            }
            ))
        }
        ))
    }
    ,
    stickyHeader: ()=>{
        const HtmlDoc = document.querySelector("html"),
              header = document.querySelector("header"),
              eOffsetTop = parseInt(window.scrollY),
              isDarkTheme = HtmlDoc.getAttribute("data-bs-theme") == "dark" || HtmlDoc.classList.contains("bg-dark");
        if (null != header){
            const hero = document.querySelector("main").children[0],
                  scrollYP = header.offsetHeight + eOffsetTop,
                  isOffView = scrollYP >= hero.scrollHeight,
                  hasBg = header.classList.contains("header-bg");
            if(isOffView && !hasBg){header.classList.add("header-bg");}
            if(!isOffView && hasBg){header.classList.remove("header-bg");}
        }
    }
    ,
    counterState: (scrollEventUpdate='')=>{
        document.querySelectorAll(".counter").forEach((function(e) {
            let t = e.getAttribute("data-count")
                , n = parseInt(e.textContent)
                , o = 1e3 / Math.abs(t - n)
                , a = (e.getAttribute("data-count-by") !== null && e.getAttribute("data-count-by") !== undefined) ? parseFloat(e.getAttribute("data-count-by")) : (t >= n ? 1 : -1),
                v = 0,
                eHeight = parseInt(e.getBoundingClientRect().height),
                eOffsetTop = parseInt(e.getBoundingClientRect().top),
                scrolling = scrollEventUpdate === "scroll",
                scrollStopped = scrollEventUpdate === "scrollend",
                headerOffsetTop = document.querySelector("header").scrollHeight,
                inView = ((eOffsetTop + (eHeight / 1.2)) <= window.innerHeight && eOffsetTop >= headerOffsetTop);

            if(scrollStopped && inView && !e.classList.contains("counted")){
                e.classList.add("counted");
                e.textContent = 0;
                let s = setInterval((function() {
                            v += a,
                            e.textContent = parseInt(v),
                            v == t && clearInterval(s)
                        }
                    ), 
                o);
            }
            
            if(!inView && e.classList.contains("counted")){
                e.classList.remove("counted");
                e.textContent = 0;
            }
        }))
    }
    ,
    alertJS: ()=>{
        const e = document.getElementById("liveAlertPlaceholder")
          , t = document.getElementById("liveAlertBtn");
        t && t.addEventListener("click", (()=>{
            ((t,n)=>{
                const o = document.createElement("div");
                o.innerHTML = [`<div class="alert alert-${n} alert-dismissible" role="alert">`, `   <div>${t}</div>`, '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>', "</div>"].join(""),
                e.append(o)
            }
            )("Nice, you triggered this alert message!", "success")
        }
        ))
    }
    ,
    popovers: ()=>{
        [...document.querySelectorAll('[data-bs-toggle="popover"]')].map((e=>new bootstrap.Popover(e)))
    }
    ,
    tooltip: ()=>{
        [...document.querySelectorAll('[data-bs-toggle="tooltip"]')].map((e=>new bootstrap.Tooltip(e)))
    }
    ,
    validation: ()=>{
        const e = document.querySelectorAll(".needs-validation");
        Array.from(e).forEach((e=>{
            e.addEventListener("submit", (t=>{
                e.checkValidity() || (t.preventDefault(),
                t.stopPropagation()),
                e.classList.add("was-validated")
            }
            ), !1)
        }
        ))
    }
    ,
    toast: ()=>{
        const e = document.getElementById("liveToastBtn")
          , t = document.getElementById("liveToast");
        if (e) {
            const n = bootstrap.Toast.getOrCreateInstance(t);
            e.addEventListener("click", (()=>{
                n.show()
            }
            ))
        }
    }
    ,
    otpVarification: ()=>{
        document.moveToNextInput = function(e) {
            if (e.value.length === e.maxLength) {
                const t = Array.from(e.parentElement.children).indexOf(e)
                  , n = e.parentElement.children[t + 1];
                n && n.focus()
            }
        }
    }
};
theme.init();
var navbar = document.querySelector(".navbar");
const navOffCanvasBtn = document.querySelectorAll(".offcanvas-nav-btn")
  , navOffCanvas = document.querySelector(".navbar:not(.navbar-clone) .offcanvas-nav");
let bsOffCanvas;
function toggleOffCanvas() {
    bsOffCanvas && bsOffCanvas._isShown ? bsOffCanvas.hide() : bsOffCanvas && bsOffCanvas.show()
}
navOffCanvas && (bsOffCanvas = new bootstrap.Offcanvas(navOffCanvas,{
    scroll: !0
}),
navOffCanvasBtn.forEach((e=>{
    e.addEventListener("click", (e=>{
        toggleOffCanvas()
    }
    ))
}
)));


window.addEventListener("scroll", function(e){
    // console.log(e);
    const wOffsetY = window.scrollY;
    theme.stickyHeader();
});

onscrollend = (e) => {
    theme.counterState(e.type);
}

onscroll = (e) => {
    theme.counterState(e.type);
}