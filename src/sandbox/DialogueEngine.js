export class DialogueEngine {

    constructor(dialogueUI) {

        this.dialogueUI = dialogueUI;

        this.nodes = {};
        this.currentNode = null;

        this.onFinish = null;

    }

    load(nodes) {

        this.nodes = nodes;

    }

    start(startNode, onFinish = null) {

        this.onFinish = onFinish;

        this.showNode(startNode);

    }

    showNode(id) {

        this.currentNode = this.nodes[id];

        if (!this.currentNode) return;

        const answers = this.currentNode.answers
            ? this.currentNode.answers.map(a => a.text)
            : [];

        this.dialogueUI.show(

            this.currentNode.speaker,

            this.currentNode.text,

            answers,

            (index) => {

                this.answer(index);

            }

        );

        this.speak(this.currentNode.text, () => {

            if (!this.currentNode.answers || this.currentNode.answers.length === 0) {

                setTimeout(() => {

                    this.dialogueUI.hide();

                    if (this.onFinish) {

                        this.onFinish();

                    }

                }, 400);

            }

        });

    }

    answer(index) {

        if (!this.currentNode.answers) return;

        const answer = this.currentNode.answers[index];

        if (!answer) return;

        this.showNode(answer.next);

    }

    speak(text, callback = null) {

        if (!("speechSynthesis" in window)) {

            if (callback) callback();

            return;

        }

        speechSynthesis.cancel();

        const speech = new SpeechSynthesisUtterance(text);

        speech.lang = "en-GB";
        speech.rate = 0.92;
        speech.pitch = 1.0;
        speech.volume = 1.0;

        speech.onend = () => {

            if (callback) callback();

        };

        speechSynthesis.speak(speech);

    }

}