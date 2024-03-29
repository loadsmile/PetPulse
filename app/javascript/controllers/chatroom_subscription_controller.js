import { Controller } from "@hotwired/stimulus"
import { createConsumer } from "@rails/actioncable"


// Connects to data-controller="chatroom-subscription"
export default class extends Controller {
  static values = { chatpetId: Number }
  static targets = ["messages"]
  connect() {
    console.log("Hello");
    console.log(this.chatpetIdValue);

    this.channel = createConsumer().subscriptions.create(
      { channel: "ChatpetChannel", id: this.chatpetIdValue },

        { received: data => this.#insertMessageAndScrollDown(data) }
    )
    console.log(`Subscribed to the chatpet with the id ${this.chatpetIdValue}.`)
    console.log(this.chatTarget)
  }

  resetForm(event) {
    event.target.reset()
  }

  #insertMessageAndScrollDown(data) {
    this.messagesTarget.insertAdjacentHTML("beforeend", data)
    this.messagesTarget.scrollTo(0, this.messagesTarget.scrollHeight)
  }
}
