class StoreService {
  private state: any = undefined;
  private reducer: any = undefined;
  constructor(store: any) {
    this.state = store.state;
    this.reducer = store.reducer;
    console.log('STATE', this.state);
  }

  DISPATCH = ({ type, payload }: { type: string; payload: any }) => {
    // console.log('type', type);
    // console.log('payload', payload);
    this.state = this.reducer(this.state, { type, payload });
    console.log('STATE', this.state);
  };

  GET_ALL = () => {
    return this.state;
  };

  GET_STATE = () => {
    return this.state;
  };
}

export { StoreService };
