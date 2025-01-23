class Observer {
  private state: any = undefined;
  private reducers: any;
  private subscribers: {
    type: string;
    subscriber: (state: any) => void;
  }[] = [];
  constructor(reducers: any, state: any) {
    this.reducers = reducers;
    this.state = state;
  }

  GET_STATE = () => {
    return this.state;
  };

  GET_OBSERVER = () => {
    return this;
  };

  DISPATCH = ({ type, payload }: { type: string; payload: any }) => {
    this.state = this.reducers(this.state, {
      type,
      payload,
    });

    this.subscribers.forEach((i) => {
      if (i.type === type) {
        i.subscriber(this.state);
      }
    });
  };

  subscribe = ({ type, subscriber }: { type: string; subscriber: any }) => {
    this.subscribers.push({
      type,
      subscriber,
    });
  };

  unsubscribe = (obj: { type: string; subscriber: any }) => {
    let collection = this.subscribers.filter(
      ({ subscriber }: { type: string; subscriber: (state: any) => void }) => {
        if (subscriber != obj.subscriber) {
          return subscriber;
        }
      }
    );
    this.subscribers = collection;
  };
}

export { Observer };
