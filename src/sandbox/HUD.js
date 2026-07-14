export class HUD {

    constructor() {

        this.panel = document.createElement("div");

        this.panel.style.position = "fixed";
        this.panel.style.left = "50%";
        this.panel.style.bottom = "30px";
        this.panel.style.transform = "translateX(-50%)";

        this.panel.style.padding = "14px 28px";

        this.panel.style.background = "rgba(0,0,0,0.70)";
        this.panel.style.border = "2px solid white";
        this.panel.style.borderRadius = "10px";

        this.panel.style.color = "white";
        this.panel.style.fontFamily = "Arial";
        this.panel.style.fontSize = "22px";

        this.panel.style.display = "none";

        document.body.appendChild(this.panel);

    }

    show(text) {

        this.panel.innerHTML = text;

        this.panel.style.display = "block";

    }

    hide() {

        this.panel.style.display = "none";

    }

}