import { observable } from "mobx";

class ChatState {
    @observable messages;
    @observable members;

    constructor(conversation) {
        this.members = conversation.members;
        this.messages = conversation.messages;
    }
}

export default ChatState;