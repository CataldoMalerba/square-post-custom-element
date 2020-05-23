(function () {
  const template = document.createElement("template");
  template.innerHTML = `

  <div class="square">
  <div class="wrapper">
      <div class="squareHeader">
          <img class="squarePicture" alt="...">
          <span class="squareUsername"></span>
      </div>            
      <div class="squareBody">
          <div class="text-inner">
              
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
      return [
        "width",
        "text",
        "avatar",
        "userName",
        "backgroundColor",
        "textColor"
      ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case "avatar":
          debugger;
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
    let backgroundColor = elem.getAttribute("backgroundColor") || ""; 
    let textColor = elem.getAttribute("textColor") || ""; 
    const shadow = elem.shadowRoot;
    shadow.querySelector("style").textContent = `
    .square{
      position: relative;
      width: ${width || '100%'};
      border-style: solid;
      border-width: 1px;
      background-color: ${backgroundColor || ""};
      font-family: 'Open Sans', sans-serif;
      letter-spacing: 0.2em;
    }
    
    .square::before{
      content: '';
      display: block;
      padding-top: 100%;
    }
  
    .wrapper{
      position: absolute;
      top: 0; left:0;
      height: 100%;
      width: 100%;
    }
  
    .squareHeader,
    .squareFooter,
    .squareBody{
      position: absolute;
      width: 100%;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -ms-flex-align: center;
      -webkit-align-items: center;
      -webkit-box-align: center;
      align-items: center;
    }
    
    .squareHeader,
    .squareFooter{  
      height: 15%;
    }
  
    .squareHeader{
      top: 0;
    }
  
    .squareFooter{
      bottom: 0;
    }
  
    .squareBody{
      top: 15%;
      height: 70%;
    }
  
    .squarePicture{
      margin-left: 2.5%;
      height: 80%;
      max-width: 100%;
      border-radius: 100%;
    }
  
    .squareUsername{
      margin-left: 2.5%;
      vertical-align: middle;
      padding-left: 10px;
      font-size: 1.5rem;
    }
  
    .text-inner {
      margin-left: 2.5%;
      margin-right: 2.5%;
      overflow-wrap: break-word;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      text-align: left;
      -webkit-line-clamp: 6;
      -webkit-box-orient: vertical;
      white-space: pre-line;
      font-size: 20px;
      line-height: 1.4em;
      color: ${textColor || ""};
    }  
    `;
  }

  window.customElements.define("square-post", Square);
})();
