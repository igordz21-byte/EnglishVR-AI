import { DialogueEngine } from "./DialogueEngine.js";

export class LessonManager {

    constructor(dialogueUI, hud = null) {

        this.dialogueUI = dialogueUI;
        this.hud = hud;

        this.engine = new DialogueEngine(dialogueUI);

    }

    startCheckInLesson() {

        this.engine.load({

            start: {

                speaker: "Airport Staff",

                text: "Good morning. May I see your passport?",

                answers: [

                    {
                        text: "Sure, here it is.",
                        next: "success"
                    },

                    {
                        text: "Sorry, I forgot it.",
                        next: "failure"
                    },

                    {
                        text: "Could you repeat that?",
                        next: "repeat"
                    }

                ]

            },

            repeat: {

                speaker: "Airport Staff",

                text: "Certainly. May I see your passport?",

                answers: [

                    {
                        text: "Sure, here it is.",
                        next: "success"
                    },

                    {
                        text: "Sorry, I forgot it.",
                        next: "failure"
                    },

                    {
                        text: "Could you repeat that?",
                        next: "repeat"
                    }

                ]

            },

            success: {

                speaker: "Airport Staff",

                text: "Excellent. Thank you very much. Here is your boarding pass.",

                answers: []

            },

            failure: {

                speaker: "Airport Staff",

                text: "I'm sorry. You cannot travel without your passport.",

                answers: []

            }

        });

        this.engine.start("start", () => {

            this.close();

        });

    }

    close() {

        if (this.hud) {

            this.hud.show(

                "✔ Check-in completed<br><br><b>New objective:</b><br>Go to Security Check"

            );

            setTimeout(() => {

                this.hud.hide();

            }, 3000);

        }

    }

}