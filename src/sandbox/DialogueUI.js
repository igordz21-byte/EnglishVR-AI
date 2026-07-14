export class DialogueUI {

    constructor() {

        this.callback = null;

        this.createUI();

        window.addEventListener("keydown", (e) => {

            if (this.panel.style.display === "none") return;

            switch (e.code) {

                case "Digit1":
                    this.selectAnswer(0);
                    break;

                case "Digit2":
                    this.selectAnswer(1);
                    break;

                case "Digit3":
                    this.selectAnswer(2);
                    break;

            }

        });

    }

    createUI() {

        this.panel = document.createElement("div");

        this.panel.style.position = "fixed";
        this.panel.style.left = "50%";
        this.panel.style.bottom = "25px";
        this.panel.style.transform = "translateX(-50%)";

        this.panel.style.width = "900px";
        this.panel.style.maxWidth = "90%";

        this.panel.style.background = "rgba(15,15,25,0.92)";
        this.panel.style.border = "2px solid white";
        this.panel.style.borderRadius = "12px";
        this.panel.style.padding = "20px";

        this.panel.style.color = "white";
        this.panel.style.fontFamily = "Arial";

        this.panel.style.display = "none";

        this.title = document.createElement("div");

        this.title.style.fontSize = "24px";
        this.title.style.fontWeight = "bold";
        this.title.style.marginBottom = "15px";

        this.text = document.createElement("div");

        this.text.style.fontSize = "22px";
        this.text.style.lineHeight = "1.5";

        this.answers = document.createElement("div");

        this.answers.style.marginTop = "20px";

        this.panel.appendChild(this.title);
        this.panel.appendChild(this.text);
        this.panel.appendChild(this.answers);

        document.body.appendChild(this.panel);

    }

    show(title, text, answers = [], callback = null) {

        this.callback = callback;

        this.title.innerHTML = title;

        this.text.innerHTML = text;

        this.answers.innerHTML = "";

        answers.forEach((answer, index) => {

            const div = document.createElement("div");

            div.style.marginTop = "10px";
            div.style.fontSize = "20px";

            div.innerHTML =
                "<b>" + (index + 1) + ".</b> " + answer;

            this.answers.appendChild(div);

        });

        this.panel.style.display = "block";

    }

    selectAnswer(index) {

        if (!this.callback) return;

        this.callback(index);

    }

    hide() {

        this.panel.style.display = "none";

        this.callback = null;

    }

}