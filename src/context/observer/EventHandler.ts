class EventHandler extends EventTarget {
  constructor() {
    super();
  }

  triggerEvent(eventName: string) {
    const event = new CustomEvent(eventName);
    this.dispatchEvent(event);
  }
}

export { EventHandler };
