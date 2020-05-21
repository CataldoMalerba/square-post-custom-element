(function () {
  const template = document.createElement("template");
  template.innerHTML = `
<div class="square">               
  <div class="content">
    <div class="squareHeader">
        <img class="squarePicture" alt="...">
        <span class="squareUsername"></span>                   
    </div>
    <div class="squareBody">
      <div class="content">
        <span class="text-inner"></span>
      </div>
    </div>
    <div class="squareFooter">          
    </div>
  </div>
</div>`;

  class Square extends HTMLElement {
    constructor() {
      super();

      const shadow = this.attachShadow({ mode: "open" });
      shadow.appendChild(template.content.cloneNode(true));
      const style = document.createElement("style");

      shadow.appendChild(style);
    }

    connectedCallback() {
      console.info("connected");
      updateStyle(this);
    }

    static get observedAttributes() {
      return ["width", "text", "avatar", "userName"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case "avatar":
          updateAvatar(this);
        case "userName":
            updateUserName(this);
        case "text":
          updateText(this);
          break;
        default:
          updateStyle(this);
          break;
      }
    }

    get text() {
      return this.getAttribute("text");
    }

    set text(newValue) {
      this.setAttribute("text", newValue);
    }

    get avatar() {
      return this.getAttribute("avatar");
    }

    set avatar(newValue) {
      this.setAttribute("avatar", newValue);
    }

    get userName() {
      return this.getAttribute("userName");
    }

    set userName(newValue) {
      this.setAttribute("userName", newValue);
    }
  }

  function updateText(elem) {
    const shadow = elem.shadowRoot;
    shadow.querySelector(".text-inner").textContent = elem.text;
  }

  function updateUserName(elem) {
    const shadow = elem.shadowRoot;
    shadow.querySelector(".squareUsername").textContent = elem.userName;
  }

  function updateAvatar(elem) {
    const shadow = elem.shadowRoot;
    shadow.querySelector(".squarePicture").src = elem.avatar;
  }

  function updateStyle(elem) {
    let width = elem.getAttribute("width") || "100%";
    const shadow = elem.shadowRoot;
    shadow.querySelector("style").textContent = `
    .square{
        position: relative;
        width: ${width};
        border-style: solid;
        border-width: 1px;
        background-color: teal;
        padding: 50px:
      }
      
      .square::before{
        content: '';
        display: block;
        padding-top: 100%;
      }
      
      .squareHeader,
      .squareFooter {
          display: inline-block;
          position: relative;
          height: 15%;
      }

      /* Fake (pseudo) element, that enables vertical-align */
      .squareHeader:before {
        content: "";
        display: inline-block;
        vertical-align: middle;
        height: 100%;
      }
      
      .squarePicture{
        vertical-align: middle;
        height: 80%;
        max-width: 100%;
        border-radius: 100%;
        padding-left: 10px
      }

      .squareUsername{
        vertical-align: middle;
        padding-left: 20px;
        font-size: 1.5em;
      }
      
      .squareBody {
          position: relative;
          height: 70%;
      }
      
      .content{
        position: absolute;
        top: 0; left:0;
        height: 100%;
        width: 100%;
      }

      .text-inner {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        overflow-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        text-align: left;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
        white-space: pre-line;
        font-family: sans-serif;
        font-size: 1.5em;
      }
      
      .text-inner-footer {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
      }
    `;
  }

  window.customElements.define("square-post", Square);
})();
