    (function() {

      function getOffset(elem) {
        var offsetLeft = 0, offsetTop = 0;
        do {
          if ( !isNaN( elem.offsetLeft ) )
          {
            offsetLeft += elem.offsetLeft;
            offsetTop += elem.offsetTop;
          }
        } while( elem = elem.offsetParent );
        return {left: offsetLeft, top: offsetTop};
      }

      var targets = document.querySelectorAll( '[rel=tooltip]' ),
      target  = false,
      tooltip = false,
      title   = false,
      tip     = false;

      for(var i = 0; i < targets.length; i++) {
        targets[i].addEventListener("mouseenter", function() {
          target  = this;
          tip     = target.getAttribute("title");
          tooltip = document.createElement("div");
          tooltip.id = "tooltip";

          if(!tip || tip == "")
          return false;

          target.removeAttribute("title");
          tooltip.style.opacity = 0;
          tooltip.innerHTML = tip;
          document.body.appendChild(tooltip);

          var init_tooltip = function()
          {
            console.log(getOffset(target));
            // set width of tooltip to half of window width
            if(window.innerWidth < tooltip.offsetWidth * 1.5)
            tooltip.style.maxWidth = window.innerWidth / 2;
            else
            tooltip.style.maxWidth = 340;

            var pos_left = getOffset(target).left + (target.offsetWidth / 2) - (tooltip.offsetWidth / 2),
            pos_top  = getOffset(target).top - tooltip.offsetHeight - 10;
            console.log("top is", pos_top);
            if( pos_left < 0 )
            {
              pos_left = getOffset(target).left + target.offsetWidth / 2 - 20;
              tooltip.classList.add("left");
            }
            else
            tooltip.classList.remove("left");

            if( pos_left + tooltip.offsetWidth > window.innerWidth )
            {
              pos_left = getOffset(target).left - tooltip.offsetWidth + target.offsetWidth / 2 + 20;
              tooltip.classList.add("right");
            }
            else
            tooltip.classList.remove("right");

            if( pos_top < 0 )
            {
              var pos_top  = getOffset(target).top + target.offsetHeight + 15;
              tooltip.classList.add("top");
            }
            else
            tooltip.classList.remove("top");
            // adding "px" is very important
            tooltip.style.left = pos_left + "px";
            tooltip.style.top = pos_top + "px";
            tooltip.style.opacity  = 1;
          };

          init_tooltip();
          window.addEventListener("resize", init_tooltip);

          var remove_tooltip = function() {
            tooltip.style.opacity  = 0;
            document.querySelector("#tooltip") && document.body.removeChild(document.querySelector("#tooltip"));
            target.setAttribute("title", tip );
          };

          target.addEventListener("mouseleave", remove_tooltip );
          tooltip.addEventListener("click", remove_tooltip );
        });
      }

    })();